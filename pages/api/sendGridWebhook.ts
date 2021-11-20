import { NextApiRequest, NextApiResponse } from 'next'
import sendGrid, { MailDataRequired } from '@sendgrid/mail'

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
      })

      if (
        client &&
        client.commPrefs?.includes('commByEmail') &&
        !client.hasBeenNotifiedOfExpungement
      ) {
        const { email, expungementEmail } = client

        sendGrid.setApiKey(process.env.SENDGRID_API_KEY)

        const textEng: string =
          "The Santa Barbara Public Defender's Office has recieved your FreshStart expungement application and will begin processing it shortly. If you have not heard from the SBPD in 5-7 days, please contact them directly at (805) 568-3470"

        const textSpan: string =
          'La Oficina del Defensor Público de Santa Bárbara ha recibido su solicitud de eliminación de antecedentes penales FreshStart y comenzará a procesarla en breve. Si no ha tenido noticias del SBPD en 5-7 días, comuníquese con ellos directamente al (805) 568-3470'

        const message: MailDataRequired = {
          to: expungementEmail || email,
          from: process.env.SENDGRID_RECORDS_EXPUNGEMENT_EMAIL,
          subject: 'ThriveSBC FreshStart Record Expungement Confirmation',
          text: `${textEng}\n${textSpan}`,
          html: `<p style="color:black!important;">${textEng}</p><p style="color:black!important;">${textSpan}</p>`,
        }

        await sendGrid.send(message)
        await client.update({ hasBeenNotifiedOfExpungement: true })
      }
    }
    res.end()

    // update expungement status based on event. i.e. 'delivered' or 'open'
    // use favored communication methods to update client, text or email. tell them to expect a call in whatever days
    // a user should also see their expungement status when they open their info in the app
  } catch (error) {
    console.error(error)
  }
}

export default sendGridWebhook
