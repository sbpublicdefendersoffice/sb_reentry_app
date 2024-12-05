import { NextApiRequest, NextApiResponse } from 'next'
import sendGrid, { MailDataRequired } from '@sendgrid/mail'
import initDb from '../../helpers/sequelize'

const postFeedback = async (
  req: NextApiRequest,
  res: NextApiResponse,
): Promise<void> => {
  try {
    const { is_useful, route, language, comment } = JSON.parse(req.body)
    if ((is_useful === 0 || is_useful === 1) && route && language) {
      const { useObj } = initDb()

      const addFeedback = await useObj.create({
        created_at: new Date(Date.now()),
        is_useful,
        route,
        language,
        comment: comment || null,
      })

      sendGrid.setApiKey(process.env.SENDGRID_API_KEY)

      const useful: string = `A ThriveSBC user found the content at thrivesbc.com${route} ${
        is_useful ? 'to be useful' : 'not useful'
      }`

      const commentCopy: string = comment
        ? `They left the following comment in ${language[0].toUpperCase()}${language.slice(
            1,
          )}:`
        : ''

      const text: string = `${useful}\n${commentCopy}\n${comment || ''}`

      const message: MailDataRequired = {
        to: process.env.SBPD_THRIVE_EMAIL,
        from: process.env.SENDGRID_RECORDS_IS_THIS_USEFUL_EMAIL,
        subject: 'ThriveSBC User Feedback',
        text,
        html: `<h4>${useful}</h4><p>${commentCopy}</p><p>${comment || ''}</p>`,
      }

      await sendGrid.send(message)
      res.json({})
    }
  } catch (err) {
    const error: string = err.message
    console.error(error)
    res.json({ error: 'An error has occurred.' })
  }
}

export default postFeedback
