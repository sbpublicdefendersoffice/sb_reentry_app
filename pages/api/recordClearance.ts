import { NextApiRequest, NextApiResponse } from 'next'
import sendGrid, { MailDataRequired } from '@sendgrid/mail'
import { PDFDocument, StandardFonts } from 'pdf-lib'
import { readFileSync, writeFileSync } from 'fs'

import {
  ENGLISH,
  financeFormFields,
  applicationFormFields,
} from '../../constants'
import { FieldInfo } from '../../types'

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

    //#region application second stab
    // when abstracted to form filler function params=== PDFDocument,language,formFields

    const application = await PDFDocument.load(readFileSync(applicationPath))
    const font = await application.embedFont(StandardFonts.Helvetica)
    const page = application.getPage(language === ENGLISH ? 0 : 1)

    Object.entries(req.body).forEach(([key, val]) => {
      if (applicationFormFields[key]) {
        // console.log(key)
        // console.log(key, applicationFormFields[key][language])
        const { box_width, x, y } = applicationFormFields[key][language]
        let sizeOfText: number = 10

        if (box_width) {
          const txt: string = val as string

          let widthOfText: number = font.widthOfTextAtSize(txt, sizeOfText)

          while (widthOfText > box_width)
            widthOfText = font.widthOfTextAtSize(txt, (sizeOfText -= 0.1))

          page.drawText(txt, { x, y, size: sizeOfText })
        } else page.drawText('X', { x, y, size: sizeOfText })
      }
    })

    const finalApplication: Uint8Array = await application.save()

    writeFileSync('temp.pdf', finalApplication)
    res.json({ saved: 'successfully' })

    //#endregion

    //#region finance form

    // const pdfDoc = await PDFDocument.load(readFileSync(financialFormPath))
    // const font = await pdfDoc.embedFont(StandardFonts.Helvetica)
    // const page = pdfDoc.getPage(language === ENGLISH ? 0 : 1)

    // Object.entries(req.body).forEach(([key, val]) => {
    //   if (financeFormFields[key]) {
    //     const { box_width, x, y } = financeFormFields[key][language]
    //     let sizeOfText: number = 10

    //     if (box_width) {
    //       const txt: string = val as string

    //       let widthOfText: number = font.widthOfTextAtSize(txt, sizeOfText)

    //       while (widthOfText > box_width)
    //         widthOfText = font.widthOfTextAtSize(txt, (sizeOfText -= 0.1))

    //       page.drawText(txt, { x, y, size: sizeOfText })
    //     } else page.drawText('X', { x, y, size: sizeOfText })
    //   }
    // })
    //#endregion

    //#region send email

    // const financeFormAttachment: string = await pdfDoc.saveAsBase64()

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
    //   ],
    // }

    // const sendMsg = await sendGrid.send(message)

    // res.json(sendMsg)

    //#endregion
  } catch (error) {
    console.error(error)
    res.json({ error: error.message })
  }
}

export default recordClearance
