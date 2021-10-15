import { NextApiRequest, NextApiResponse } from 'next'
import sendGrid, { MailDataRequired } from '@sendgrid/mail'
import { PDFDocument, StandardFonts } from 'pdf-lib'
import { readFileSync, writeFileSync } from 'fs'

import {
  ENGLISH,
  financeFormFields,
  applicationFormFields,
  pageHeightInPixels,
  pageWidthInPixels,
} from '../../constants'
import { FieldInfo } from '../../types'

const [type, disposition, financialFormPath, applicationPath]: string[] = [
  'application/pdf',
  'attachment',
  'documents/SBPD_EXPUNGEMENT_FINANCIAL_DECLARATION_Updated_10_20_19.pdf',
  'documents/#_SBPD_EXPUNGEMENT_APPLICATION.pdf',
]

const recordClearance = async (
  req: NextApiRequest,
  res: NextApiResponse,
): Promise<void> => {
  try {
    //below will be a JSON.parse when testing is done
    const { to, from, subject, text, name, language } = req.body

    // split up application info from finance info, where there are duplicated information, copy them to each

    //#region application

    const clearanceApplication = await PDFDocument.create()
    let currentPage = clearanceApplication.addPage([
      pageWidthInPixels,
      pageHeightInPixels,
    ])

    for (let i = 1; i <= 1; ++i) {
      const curPath: string = applicationPath.replace('#', `${i}`)
      //if there is not application path -1_XXXX_no, load current path
      // execute in another loop all of the fields associated with the current file
      // something like object(appFileds).filter => startsWith(i)

      const openedFile = await PDFDocument.load(readFileSync(curPath))
      const font = await openedFile.embedFont(StandardFonts.Helvetica)
      const openedPage = openedFile.getPage(0)

      Object.entries(req.body).forEach(async ([key, val]) => {
        const field: FieldInfo =
          applicationFormFields[`${i}_${key}`]?.[language]
        let sizeOfText: number = 12

        if (field) {
          const { box_width, x, y } = field

          const txt: string = val as string

          if (box_width) {
            let widthOfText: number = font.widthOfTextAtSize(txt, sizeOfText)

            while (widthOfText > box_width)
              widthOfText = font.widthOfTextAtSize(txt, (sizeOfText -= 0.1))

            openedPage.drawText(txt, { x, y, size: sizeOfText })
          } else openedPage.drawText('X', { x, y, size: sizeOfText })
        }
        const finalOpenedFile = await openedFile.save()
        const embeddedPages = await clearanceApplication.embedPdf(
          finalOpenedFile,
        )

        // currentPage.setSize(openedPage.getWidth(), openedPage.getHeight())
        currentPage.drawPage(embeddedPages[embeddedPages.length - 1])
      })

      // remember to expand each page to 720px down and then to add 1/2" margin on top and bottom when done with each page

      // const newForm = await openedFile.save()
    }
    const finalDoc = await clearanceApplication.save()

    writeFileSync('1.pdf', finalDoc)
    res.json({ howdy: 'hello' })
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
