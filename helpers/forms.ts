import { NextApiRequest } from 'next'
import { PDFDocument, StandardFonts } from 'pdf-lib'

import { Fields } from '../types'
import { ENGLISH, SPANISH } from '../constants'

export const fillOutPDFForm = async (
  form: Buffer,
  req: NextApiRequest,
  fieldInfo: Fields,
  language: string,
  multiPage?: boolean,
  txtSize?: number,
): Promise<string | Uint8Array> => {
  const pdf = await PDFDocument.load(form)
  const font = await pdf.embedFont(StandardFonts.Helvetica)
  const page = pdf.getPage(language === SPANISH && multiPage ? 1 : 0) // good way to get only one page for others

  Object.entries(req.body).forEach(([key, val]) => {
    if (fieldInfo?.[key]) {
      const { box_width, x, y } =
        fieldInfo?.[key]?.[language] || fieldInfo?.[key]?.[ENGLISH]
      let sizeOfText: number = txtSize || 10

      if (box_width) {
        const txt: string = val as string

        let widthOfText: number = font.widthOfTextAtSize(txt, sizeOfText)

        while (widthOfText > box_width)
          widthOfText = font.widthOfTextAtSize(txt, (sizeOfText -= 0.1))

        page.drawText(txt, { x, y, size: sizeOfText })
      } else {
        const { x, y } =
          fieldInfo?.[key]?.[language]?.radioOrBooleanVals?.[val] ||
          //@ts-ignore
          fieldInfo?.[key]?.[ENGLISH]?.radioOrBooleanVals?.[val]
        page.drawText('X', { x, y, size: sizeOfText })
      }
    }
  })

  // const finalPdf: string = await pdf.saveAsBase64()
  const finalPdf: Uint8Array = await pdf.save()

  return finalPdf
}
