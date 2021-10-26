import { NextApiRequest } from 'next'
import { PDFDocument, StandardFonts } from 'pdf-lib'

import { Fields } from '../types'
import { ENGLISH, SPANISH } from '../constants'

const dateTitles = new Set<string>([
  'Date',
  'Date of Birth',
  'Discharge Date',
  'Fecha de alta',
])

export const nativeFillOutApplication = async (
  formBytes: Buffer,
  body: any,
): Promise<string | Uint8Array> => {
  const pdf = await PDFDocument.load(formBytes)
  const title = pdf.getTitle()
  const form = pdf.getForm()
  const fields = form.getFields()

  fields.forEach(field => {
    let name = field.getName()
    let data = body[name]

    if (data) {
      const type = field.constructor.name

      if (type === 'PDFTextField') {
        if (dateTitles.has(name)) {
          let tmp = data.slice(2).replace(/-/g, '')

          if (title === 'Expungements')
            data = `${tmp.slice(2)}${tmp.slice(0, 2)}`
          else data = `${tmp.slice(2, 4)}/${tmp.slice(4, 6)}/${tmp.slice(0, 2)}`
        }

        form.getTextField(name).setText(data)
      } else if (type === 'PDFCheckBox' && data === 'true')
        form.getCheckBox(name).check()
      else if (type === 'PDFRadioGroup') form.getRadioGroup(name).select(data)
    }
  })

  // const finalPdf: string = await pdf.saveAsBase64()
  const finalPdf: Uint8Array = await pdf.save()

  return finalPdf
}

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
  const page = pdf.getPage(language === SPANISH && multiPage ? 1 : 0)

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
