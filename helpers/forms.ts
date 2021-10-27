import { NextApiRequest } from 'next'
import { PDFDocument, StandardFonts } from 'pdf-lib'

import { Fields } from '../types'
import { ENGLISH, SPANISH } from '../constants'

// before anyone barks at me, I know these english to spanish translations are not correct. that's how they are on the form and i can't go back and change them right now. needs are as needs must
const spanishFields: { [englishName: string]: string } = {
  'Full Name': 'Domicilio',
  'Date of Birth': 'Ciudad',
  'Social Security No': 'Estado y Codigo Postal',
  'Mailing Address': 'Textfield-17',
  'Phone Number': 'Telefono primario',
  'Alternate Number': 'Telefono Alternativo',
  'Email Address': 'El correo electronico',
  'If yes which branch': 'En que rama militar sirvio',
  'Discharge Date': 'Fecha de alta',
  'Number of Dependents': 'Cuantos dependientes',
  'Relationship and Ages': 'y edad',
  'Employer Name': 'Empleador',
  'Address-0': 'Domicilio-0',
  'Length of Time': 'Duracion en el empleo',
  Supervisor: 'Supervisor-1',
  'Take Home Pay': 'Salario neto',
  'No Amount': 'No-1',
  'Employer Name-0': 'Empleador-0',
  'Address-1': 'Domicilio-1',
  'Length of Time-0': 'Duracion en el empleo-0',
  'Supervisor-0': 'Supervisor-2',
  'Weekly Take Home Pay-0': 'Salario neto-0',
  'No Amount-0': 'No-3',
  Textfield: 'Textfield-18',
  'Textfield-1': 'Textfield-20',
  'Textfield-3': 'Textfield-22',
  'Textfield-5': 'Textfield-23',
  'Textfield-7': 'Textfield-25',
  'Vehicle LoansPayment Monthly': 'Textfield-27',
  'Textfield-10': 'Textfield-28',
  'Textfield-13': 'Textfield-30',
  'Textfield-14': 'Textfield-31',
  'Textfield-0': 'Textfield-19',
  'Textfield-2': 'Textfield-21',
  'Textfield-4': 'Pagos recibidos de Seguro Social',
  'Textfield-6': 'Textfield-24',
  'Textfield-8': 'Textfield-26',
  'Textfield-9': 'No-5',
  'Textfield-11': 'Textfield-29',
  'Textfield-15': 'Textfield-32',
  'Other income or assets valued at': 'Textfield-34',
  Date: 'Fecha',
  Signature: 'Firma',
}

const dateTitles = new Set<string>([
  'Date',
  'Date of Birth',
  'Discharge Date',
  'Ciudad',
  'Fecha de alta',
  'Fecha',
])

export const nativeFillOutApplication = async (
  formBytes: Buffer,
  body: any,
): Promise<string | Uint8Array> => {
  const pdf = await PDFDocument.load(formBytes)
  const title = pdf.getTitle()
  const form = pdf.getForm()
  const fields = form.getFields()

  if (body?.language === SPANISH)
    Object.entries(body).forEach(([key, val]): void => {
      if (spanishFields[key]) {
        body[spanishFields[key]] = val
        delete body[key]
      }
    })

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
