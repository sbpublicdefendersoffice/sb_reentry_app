import { NextApiRequest } from 'next'
import { PDFDocument, StandardFonts } from 'pdf-lib'

import { Fields } from '../types'
import { ENGLISH } from '../constants'

export const fillOutPDFForm = async (
  form: Buffer,
  req: NextApiRequest,
  fieldInfo: Fields,
  language: string,
  txtSize?: number,
): Promise<string> => {
  const pdf = await PDFDocument.load(form)
  const font = await pdf.embedFont(StandardFonts.Helvetica)
  const page = pdf.getPage(language === ENGLISH ? 0 : 1)

  Object.entries(req.body).forEach(([key, val]) => {
    if (fieldInfo[key]) {
      const { box_width, x, y } = fieldInfo[key][language]
      let sizeOfText: number = txtSize || 10

      if (box_width) {
        const txt: string = val as string

        let widthOfText: number = font.widthOfTextAtSize(txt, sizeOfText)

        while (widthOfText > box_width)
          widthOfText = font.widthOfTextAtSize(txt, (sizeOfText -= 0.1))

        page.drawText(txt, { x, y, size: sizeOfText })
      } else page.drawText('X', { x, y, size: sizeOfText })
    }
  })

  const finalPdf: string = await pdf.saveAsBase64()

  return finalPdf
}
