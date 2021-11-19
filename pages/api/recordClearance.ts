import { NextApiRequest, NextApiResponse } from 'next'
import sendGrid, { MailDataRequired } from '@sendgrid/mail'
import { PDFDocument } from 'pdf-lib'
import { readFileSync } from 'fs'
import { sign } from 'jsonwebtoken'

import { fillOutPDFForm } from '../../helpers'
import initDb from '../../helpers/sequelize'
import { validations, oneWeekInSeconds } from '../../constants'
import { Validation, ExpungeFormInfo } from '../../types'

const [type, disposition, financialFormPath, applicationPath]: string[] = [
  'application/pdf',
  'attachment',
  'documents/Financial_Declaration.pdf',
  'documents/Expungements_Intake.pdf',
]

//gotta change communication preferences if they are different

const recordClearance = async (
  req: NextApiRequest,
  res: NextApiResponse,
): Promise<void> => {
  try {
    const { clientObj } = initDb()

    const body: ExpungeFormInfo = JSON.parse(req.body)
    const { language, clientId, additionalInfo, Email, Phone, Text } = body
    const name: string = body['Full Name']

    validations.forEach((v: Validation): void => {
      const { error, field, id } = v
      if (!body[field]) throw new Error(`${error[language]}&&#${id}`)
    })

    const filledOutApp = await fillOutPDFForm(
      readFileSync(applicationPath),
      body,
    )

    const filledOutFinance = await fillOutPDFForm(
      readFileSync(financialFormPath),
      body,
    )

    const attachments = [
      {
        content: filledOutFinance,
        filename: `${name} Financial Declaration.pdf`,
        type,
        disposition,
      },
      {
        content: filledOutApp,
        filename: `${name} Expungement Application.pdf`,
        type,
        disposition,
      },
    ]

    if (additionalInfo) {
      const infoDoc = await PDFDocument.create()
      const page = infoDoc.addPage()

      const { height } = page.getSize()

      page.drawText(additionalInfo, {
        x: 25,
        y: height - 20,
        size: 14,
      })

      const finalInfoPdf: string = await infoDoc.saveAsBase64()

      const infoDocAttachment = {
        content: finalInfoPdf,
        filename: `${name} Additional Info.pdf`,
        type,
        disposition,
      }

      attachments.push(infoDocAttachment)
    }

    const text: string = `${name} has applied for criminal record expungement via ThriveSBC`

    sendGrid.setApiKey(process.env.SENDGRID_API_KEY)

    const message: MailDataRequired = {
      to: process.env.SBPD_RECORDS_EXPUNGEMENT_EMAIL,
      from: process.env.SENDGRID_RECORDS_EXPUNGEMENT_EMAIL,
      subject: `${name} ThriveSBC Record Expungement`,
      text,
      html: `<span>${text}</span>`,
      attachments,
    }

    const sendMsg = await sendGrid.send(message)
    const sgResponse = sendMsg[0]

    if (sgResponse.statusCode === 202) {
      const expungementXMessageId = sgResponse.headers['x-message-id']

      const commPrefs: string[] = []

      if (Email) commPrefs.push('commByEmail')
      if (Phone) commPrefs.push('commByPhone')
      if (Text) commPrefs.push('commByText')

      const expungementEmail = body['Email Address']

      await clientObj.update(
        {
          expungementXMessageId,
          hasAppliedForExpungement: true,
          commPrefs,
          expungementEmail: expungementEmail || null,
        },
        { where: { id: clientId } },
      )

      res.setHeader(
        'Set-Cookie',
        `Auth-Token=${sign(
          {
            id: clientId,
            hasAppliedForExpungement: true,
            isVerified: true,
            type: 'client',
          },
          process.env.JWT_SIGNATURE,
          {
            expiresIn: '7d',
          },
        )}; Max-Age=${oneWeekInSeconds}; Path=/; HttpOnly; Secure; SameSite=Strict`,
      )
    }

    res.json({ ...sendMsg })
  } catch (error) {
    console.error(error)
    res.json({ error: error.message })
  }
}

export default recordClearance
