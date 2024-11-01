import { NextApiRequest, NextApiResponse } from 'next'
import sendGrid, { MailDataRequired } from '@sendgrid/mail'
import twilio from 'twilio'

import initDb from '../../helpers/sequelize'

const sendGridWebhook = async (
  req: NextApiRequest,
  res: NextApiResponse,
): Promise<void> => {
  try {
    const event: string = req.body[0].event
    if (event === 'open') {
      const { clientObj } = initDb()

      const expungementXMessageId: string = String(
        req.body[0].sg_message_id,
      ).split('.')[0]

      const client = await clientObj.findOne({
        where: { expungementXMessageId },
        attributes: [
          'id',
          'email',
          'hasBeenNotifiedOfExpungement',
          'expungementEmail',
          'phone',
          'commPrefs',
        ],
      })

      if (client && !client.hasBeenNotifiedOfExpungement) {
        const { email, expungementEmail, phone, commPrefs } = client
        const textEng: string =
          "The Santa Barbara Public Defender's Office has recieved your FreshStart expungement application and will begin processing it shortly. If you have not heard from the SBPD in 6 weeks, please contact them directly at (805) 568-3470"

        const textSpan: string =
          'La Oficina del Defensor Público de Santa Bárbara ha recibido su solicitud de eliminación de antecedentes penales FreshStart y comenzará a procesarla en breve. Si no ha tenido noticias del SBPD en 6 semanas, comuníquese con ellos directamente al (805) 568-3470'

        const text: string = `${textEng}\n\n${textSpan}`

        if (commPrefs?.includes('commByEmail')) {
          sendGrid.setApiKey(process.env.SENDGRID_API_KEY)

          const message: MailDataRequired = {
            to: expungementEmail || email,
            from: process.env.SENDGRID_RECORDS_EXPUNGEMENT_EMAIL,
            subject: 'ThriveSBC FreshStart Record Expungement Confirmation',
            text,
            html: `<p style="color:black!important;">${textEng}</p><p style="color:black!important;">${textSpan}</p>`,
          }

          await sendGrid.send(message)
        }

        if (phone && commPrefs?.includes('commByText')) {
          const texter = twilio(
            process.env.TWILIO_SID,
            process.env.TWILIO_AUTH_TOKEN,
          )

          const cleanedNumber: string = phone.replace(/[^0-9]/g, '')

          const to: string = cleanedNumber.startsWith('1')
            ? `+${phone}`
            : `+1${phone}`

          await texter.messages.create({
            to,
            from: process.env.TWILIO_FROM_NUMBER,
            body: text,
          })
        }

        await clientObj.update(
          { hasBeenNotifiedOfExpungement: true },
          { where: { id: client.id } },
        )
      }
    }
    res.json({})
    // a user should see their expungement status when they open their info in the app
  } catch (error) {
    console.error(error)
    res.json({ error: 'An error has occurred.' })
    res.status(500)
  }
}

export default sendGridWebhook
