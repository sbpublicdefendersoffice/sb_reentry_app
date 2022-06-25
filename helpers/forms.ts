import { css } from '@emotion/react'
import { PDFDocument, PDFPage } from 'pdf-lib'
import { ExpungeFormInfo } from '../types'

const dateTitles = new Set<string>([
  'Date',
  'Date of Birth',
  'Discharge Date',
  'Ciudad',
  'Fecha de alta',
  'Fecha',
])

export const fillOutPDFForm = async (
  formBytes: Buffer,
  body: ExpungeFormInfo,
): Promise<string> => {
  const pdf = await PDFDocument.load(formBytes)
  const title = pdf.getTitle()
  const form = pdf.getForm()
  const fields = form.getFields()

  console.log('\n\n' + 'title: ' + title + '\n\n')

  fields.forEach(field => {
    let fieldName = field.getName()
    let data = body[fieldName]

    console.log('\n\n' + fieldName + ': ' + data + '\n\n')

    if (data) {
      if (typeof data === 'boolean') data = String(data)
      const type = field.constructor.name

      if (type === 'PDFTextField') {
        if (dateTitles.has(fieldName)) {
          let tmp = data.slice(2).replace(/-/g, '')

          console.log('\nin the pdftexfield\n')
          if (title === 'Expungement')
            data = `${tmp.slice(2)}${tmp.slice(0, 2)}`
          else data = `${tmp.slice(2, 4)}${tmp.slice(4, 6)}${tmp.slice(0, 2)}`
        }
        if (fieldName === 'Other-1' && body.immigration)
          data = `Immigration, ${data}`

        console.log(data)

        form.getTextField(fieldName).setText(data)
      } else if (type === 'PDFCheckBox' && data === 'true')
        form.getCheckBox(fieldName).check()
      else if (type === 'PDFRadioGroup')
        form.getRadioGroup(fieldName).select(data)
    }
  })

  const { additionalInfo } = body
  if (additionalInfo && title === 'Financial English') {
    const page2: PDFPage = pdf.getPage(1)

    page2.drawText(`Additional Information:\n${additionalInfo}`, {
      x: 20,
      y: 275,
      maxWidth: 580,
      size: 14,
    })
  }

  const finalPdf: string = await pdf.saveAsBase64()

  return finalPdf
}

// export const fillOutPDFForm = async (
//   form: Buffer,
//   req: NextApiRequest,
//   fieldInfo: Fields,
//   language: string,
//   multiPage?: boolean,
//   txtSize?: number,
// ): Promise<string | Uint8Array> => {
//   const pdf = await PDFDocument.load(form)
//   const font = await pdf.embedFont(StandardFonts.Helvetica)
//   const page = pdf.getPage(language === SPANISH && multiPage ? 1 : 0)

//   Object.entries(req.body).forEach(([key, val]) => {
//     if (fieldInfo?.[key]) {
//       const { box_width, x, y } =
//         fieldInfo?.[key]?.[language] || fieldInfo?.[key]?.[ENGLISH]
//       let sizeOfText: number = txtSize || 10

//       if (box_width) {
//         const txt: string = val as string

//         let widthOfText: number = font.widthOfTextAtSize(txt, sizeOfText)

//         while (widthOfText > box_width)
//           widthOfText = font.widthOfTextAtSize(txt, (sizeOfText -= 0.1))

//         page.drawText(txt, { x, y, size: sizeOfText })
//       } else {
//         const { x, y } =
//           fieldInfo?.[key]?.[language]?.radioOrBooleanVals?.[val] ||
//           //@ts-ignore
//           fieldInfo?.[key]?.[ENGLISH]?.radioOrBooleanVals?.[val]
//         page.drawText('X', { x, y, size: sizeOfText })
//       }
//     }
//   })

//   // const finalPdf: string = await pdf.saveAsBase64()
//   const finalPdf: Uint8Array = await pdf.save()

//   return finalPdf
// }
