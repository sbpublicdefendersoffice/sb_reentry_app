import { NextApiRequest, NextApiResponse } from 'next'
import sendGrid, { MailDataRequired } from '@sendgrid/mail'
import { readFileSync, writeFileSync } from 'fs'

import { financeFormFields, applicationFormFields } from '../../constants'
import { fillOutPDFForm, nativeFillOutApplication } from '../../helpers'

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
    // const { to, from, subject, text, name, language } = body

    // await nativeFillOutApplication(readFileSync(financialFormPath), req)

    const filledOutApp = await nativeFillOutApplication(
      readFileSync(applicationPath),
      body,
    )

    const filledOutFinance = await nativeFillOutApplication(
      readFileSync(financialFormPath),
      body,
    )

    writeFileSync('./application.pdf', filledOutApp)
    writeFileSync('./finance.pdf', filledOutFinance)

    // const applicationAttachment = await fillOutPDFForm(
    //   readFileSync(applicationPath),
    //   req,
    //   applicationFormFields,
    //   language,
    // )

    // const financeFormAttachment = await fillOutPDFForm(
    //   readFileSync(financialFormPath),
    //   req,
    //   financeFormFields,
    //   language,
    //   true,
    // )

    // writeFileSync('./application.pdf', applicationAttachment)
    // writeFileSync('./finance.pdf', financeFormAttachment)

    // sendGrid.setApiKey(process.env.SENDGRID_API_KEY)

    // const message: MailDataRequired = {
    //   to,
    //   from,
    //   subject,
    //   text,
    //   attachments: [
    //     {
    //       content: financeFormAttachment,
    //       filename: `${name}_SBPD_EXPUNGEMENT_FINANCIAL_DECLARATION_Updated_10_20_19_${language}.pdf`,
    //       type,
    //       disposition,
    //     },
    //     {
    //       content: applicationAttachment,
    //       filename: `${name}_SBPD_EXPUNGEMENT_APPLICATION_${language}.pdf`,
    //       type,
    //       disposition,
    //     },
    //   ],
    // }

    // const sendMsg = await sendGrid.send(message)

    res.json({ test: 'successful' })
  } catch (error) {
    console.error(error)
    res.json({ error: error.message })
  }
}

export default recordClearance
