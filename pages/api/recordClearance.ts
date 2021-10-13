import { NextApiRequest, NextApiResponse } from 'next'
import sendGrid, { MailDataRequired } from '@sendgrid/mail'
import { PDFDocument, StandardFonts } from 'pdf-lib'
import { readFileSync } from 'fs'

import { ENGLISH, financeFormFields } from '../../constants'

const financialFormPath: string =
  'documents/SBPD_EXPUNGEMENT_FINANCIAL_DECLARATION_Updated_10_20_19.pdf'

const recordClearance = async (
  req: NextApiRequest,
  res: NextApiResponse,
): Promise<void> => {
  try {
    //below will be a JSON.parse when testing is done
    const { to, from, subject, text, name, language } = req.body

    const pdfDoc = await PDFDocument.load(readFileSync(financialFormPath))
    const font = await pdfDoc.embedFont(StandardFonts.Helvetica)
    const page = pdfDoc.getPage(language === ENGLISH ? 0 : 1)

    Object.entries(req.body).forEach(([key, val]) => {
      if (financeFormFields[key]) {
        const { box_width, x, y } = financeFormFields[key][language]
        let sizeOfText: number = 12

        if (box_width) {
          const txt: string = val as string

          let widthOfText: number = font.widthOfTextAtSize(txt, sizeOfText)

          while (widthOfText > box_width)
            widthOfText = font.widthOfTextAtSize(txt, sizeOfText - 0.1)

          page.drawText(txt, { x, y, size: sizeOfText })
        } else page.drawText('X', { x, y, size: sizeOfText })
      }
    })

    const financeFormAttachment = await pdfDoc.saveAsBase64()

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
          type: 'application/pdf',
          disposition: 'attachment',
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
