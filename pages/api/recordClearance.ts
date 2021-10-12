import { NextApiRequest, NextApiResponse } from 'next'
import sendGrid, { MailDataRequired } from '@sendgrid/mail'
import fs from 'fs'

const recordClearance = async (
  req: NextApiRequest,
  res: NextApiResponse,
): Promise<void> => {
  try {
    //below will be a JSON.parse when testing is done
    const { to, from, subject, text } = req.body

    sendGrid.setApiKey(process.env.SENDGRID_API_KEY)
    const content = fs
      .readFileSync(
        `${__dirname}/../../../../documents/Program_Chart_Nov_27_2019.pdf`,
      )
      .toString('base64')

    const message: MailDataRequired = {
      to,
      from,
      subject,
      text,
      attachments: [
        {
          content,
          filename: 'Program_Chart.pdf',
          type: 'application/pdf',
          disposition: 'attachment',
        },
      ],
    }

    const sendMsg = await sendGrid.send(message)

    res.json(sendMsg)
  } catch (error) {
    res.json({ error: error.message })
  }
}

export default recordClearance
