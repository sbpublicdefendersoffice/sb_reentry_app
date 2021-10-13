import { NextApiRequest, NextApiResponse } from 'next'
import sendGrid, { MailDataRequired } from '@sendgrid/mail'
import { PDFDocument, StandardFonts } from 'pdf-lib'
import { readFileSync } from 'fs'

import { ENGLISH } from '../../constants'

interface FieldInfo {
  box_width: number
  x: number
  y: number
}

interface Fields {
  [field_name: string]: {
    english: FieldInfo
    spanish: FieldInfo
  }
}

const pageInfo: Fields = {
  name: {
    english: { box_width: 195, x: 25, y: 667 },
    spanish: { box_width: 190, x: 30, y: 660 },
  },
  dob: {
    english: { box_width: 180, x: 230, y: 667 },
    spanish: { box_width: 170, x: 230, y: 660 },
  },
  ssn: {
    english: { box_width: 160, x: 420, y: 667 },
    spanish: { box_width: 170, x: 410, y: 660 },
  },
  address: {
    english: { box_width: 200, x: 95, y: 642 },
    spanish: { box_width: 135, x: 150, y: 630 },
  },
  city: {
    english: { box_width: 110, x: 325, y: 642 },
    spanish: { box_width: 70, x: 330, y: 630 },
  },
  state_and_zip: {
    english: { box_width: 75, x: 505, y: 642 },
    spanish: { box_width: 65, x: 515, y: 630 },
  },
}

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

    const fields = Object.entries(req.body)

    fields.forEach(([key, val]) => {
      if (pageInfo[key]) {
        const { box_width, x, y } = pageInfo[key][language]

        const txt: string = val as string

        let sizeOfText: number = 12
        let widthOfText: number = font.widthOfTextAtSize(txt, sizeOfText)

        while (widthOfText > box_width)
          widthOfText = font.widthOfTextAtSize(txt, --sizeOfText)

        page.drawText(txt, { x, y, size: sizeOfText })
      }
    })

    const content = await pdfDoc.saveAsBase64()

    sendGrid.setApiKey(process.env.SENDGRID_API_KEY)

    const message: MailDataRequired = {
      to,
      from,
      subject,
      text,
      attachments: [
        {
          content,
          filename: `${name}_SBPD_EXPUNGEMENT_FINANCIAL_DECLARATION_Updated_10_20_19_${language}.pdf`,
          type: 'application/pdf',
          disposition: 'attachment',
        },
      ],
    }

    const sendMsg = await sendGrid.send(message)

    res.json(sendMsg)
  } catch (error) {
    console.error(error.response.body)
    res.json({ error: error.message })
  }
}

export default recordClearance
