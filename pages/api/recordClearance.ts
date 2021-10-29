import { NextApiRequest, NextApiResponse } from 'next'
import sendGrid, { MailDataRequired } from '@sendgrid/mail'
import { readFileSync } from 'fs'

import { fillOutPDFForm } from '../../helpers'

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
    const body = JSON.parse(req.body)
    const name: string = body['Full Name']

    const filledOutApp = await fillOutPDFForm(
      readFileSync(applicationPath),
      body,
    )

    const filledOutFinance = await fillOutPDFForm(
      readFileSync(financialFormPath),
      body,
    )

    sendGrid.setApiKey(process.env.SENDGRID_API_KEY)

    const message: MailDataRequired = {
      to: process.env.SBPD_RECORDS_EXPUNGMENT_EMAIL,
      from: process.env.SENDGRID_RECORDS_EXPUNGEMENT_EMAIL,
      subject: `Expungment forms for ${name}`,
      text: `Here's the forms for ${name}`,
      attachments: [
        {
          content: filledOutFinance,
          filename: `${name} Financial Declaration.pdf`,
          type,
          disposition,
        },
        {
          content: filledOutApp,
          filename: `${name} Expungment Application.pdf`,
          type,
          disposition,
        },
      ],
    }

    const sendMsg = await sendGrid.send(message)

    res.json({ sendMsg })
  } catch (error) {
    console.error(error)
    res.json({ error: error.message })
  }
}

export default recordClearance
