import { NextApiRequest, NextApiResponse } from 'next'
import sendGrid, { MailDataRequired } from '@sendgrid/mail'
import { readFileSync } from 'fs'

import { financeFormFields, applicationFormFields } from '../../constants'
import { fillOutPDFForm } from '../../helpers'

const [type, disposition, financialFormPath, applicationPath]: string[] = [
  'application/pdf',
  'attachment',
  'documents/SBPD_EXPUNGEMENT_FINANCIAL_DECLARATION_Updated_10_20_19.pdf',
  'documents/SBPD_EXPUNGEMENT_Application.pdf',
]

const recordClearance = async (
  req: NextApiRequest,
  res: NextApiResponse,
): Promise<void> => {
  try {
    //below will be a JSON.parse when testing is done
    const { to, from, subject, text, name, language } = req.body

    const applicationAttachment = await fillOutPDFForm(
      readFileSync(applicationPath),
      req,
      applicationFormFields,
      language,
    )

    const financeFormAttachment = await fillOutPDFForm(
      readFileSync(financialFormPath),
      req,
      financeFormFields,
      language,
    )

    sendGrid.setApiKey(process.env.SENDGRID_API_KEY)

    const message: MailDataRequired = {
      to,
      from,
      subject,
      text,
      attachments: [
        {
          content: financeFormAttachment,
          filename: `${name}_SBPD_EXPUNGEMENT_FINANCIAL_DECLARATION_Updated_10_20_19_${language}.pdf`,
          type,
          disposition,
        },
        {
          content: applicationAttachment,
          filename: `${name}_SBPD_EXPUNGEMENT_APPLICATION_${language}.pdf`,
          type,
          disposition,
        },
      ],
    }

    const sendMsg = await sendGrid.send(message)

    res.json(sendMsg)
  } catch (error) {
    console.error(error)
    res.json({ error: error.message })
  }
}

export default recordClearance
