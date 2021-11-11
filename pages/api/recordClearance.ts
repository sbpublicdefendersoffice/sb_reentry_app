import { NextApiRequest, NextApiResponse } from 'next'
import sendGrid, { MailDataRequired } from '@sendgrid/mail'
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

const recordClearance = async (
  req: NextApiRequest,
  res: NextApiResponse,
): Promise<void> => {
  try {
    const { clientObj } = initDb()

    const body: ExpungeFormInfo = JSON.parse(req.body)
    const { language, clientId } = body
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

    sendGrid.setApiKey(process.env.SENDGRID_API_KEY)

    const text: string = `${name} has applied for criminal record expungement via ThriveSBC`

    const message: MailDataRequired = {
      to: 'fabikar@codeforamerica.org',
      from: process.env.SENDGRID_RECORDS_EXPUNGEMENT_EMAIL,
      subject: `${name} ThriveSBC Record Expungement`,
      text,
      html: `<span>${text}</span>`,
      attachments: [
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
      ],
    }

    const sendMsg = await sendGrid.send(message)
    const sgResponse = sendMsg[0]

    if (sgResponse.statusCode === 202) {
      const xMessageId = sgResponse.headers['x-message-id']

      await clientObj.update(
        {
          xMessageId,
          hasAppliedForExpungement: true,
        },
        { where: { id: clientId } },
      )

      res.setHeader(
        'Set-Cookie',
        `Auth-Token=${sign(
          { id: clientId, hasAppliedForExpungement: true, isVerified: true },
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
