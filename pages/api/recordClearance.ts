import { NextApiRequest, NextApiResponse } from 'next'
import sendGrid, { MailDataRequired } from '@sendgrid/mail'
import { readFileSync } from 'fs'
import { sign } from 'jsonwebtoken'

import { fillOutPDFForm } from '../../helpers'
import initDb from '../../helpers/sequelize'
import { validations, oneWeekInSeconds } from '../../constants'
import { Validation, ExpungeFormInfo } from '../../types'

const [type, disposition, applicationPath]: string[] = [
  'application/pdf',
  'attachment',
  'documents/FreshStartIntakeForm.pdf',
]

const recordClearance = async (
  req: NextApiRequest,
  res: NextApiResponse,
): Promise<void> => {
  try {
    const { clientObj } = initDb()

    const body: ExpungeFormInfo = JSON.parse(req.body)
    const { language, clientId, Email, Phone, Text } = body
    const name: string = body['Full Name']

    validations.forEach((v: Validation): void => {
      const { error, field, id, inputId } = v
      if (!body[field])
        throw new Error(`${error[language]}&&#${id}&&${inputId}`)
    })

    const filledOutApp = await fillOutPDFForm(
      readFileSync(applicationPath),
      body,
    )

    const attachments = [
      {
        content: filledOutApp,
        filename: `${name} Expungement Application.pdf`,
        type,
        disposition,
      },
    ]

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
          phone: body['Phone Number'] || null,
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
