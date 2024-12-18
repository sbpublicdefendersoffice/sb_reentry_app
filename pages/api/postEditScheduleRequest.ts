import { NextApiRequest, NextApiResponse } from 'next'
import sendGrid, { MailDataRequired } from '@sendgrid/mail'

const postEditScheduleRequest = async (
  req: NextApiRequest,
  res: NextApiResponse,
): Promise<void> => {
  // disabled because API is not secure.
  // If re-enabling you must authenticate and authorize user
  return res.status(501).json({ error: 'Not implemented.' })

  const {
    monday,
    tuesday,
    wednesday,
    thursday,
    friday,
    saturday,
    sunday,
    location,
  } = JSON.parse(req.body)

  const listToText = (): string => {
    return `Location Schedule Change Request \n
    Location Id: ${location.id} \n
    Monday = open ${monday.open}, close ${monday.close}\n
    Tuesday = open ${tuesday.open}, close ${tuesday.close}\nv
    Wednesday = open ${wednesday.open}, close ${wednesday.close}\n
    Thursday = open ${thursday.open}, close ${thursday.close}\n
    Friday = open ${friday.open}, close ${friday.close}\n
    Saturday = open ${saturday.open}, close ${saturday.close}\n
    Sunday = open ${sunday.open}, close ${sunday.close}\n`
  }

  const renderHtml = (): string => {
    return `<h1>Location Schedule Change Request</h1>
    <p>
    <strong>Location Id: </strong>${location.id}<br>
    <strong>Monday:</strong> open ${monday.open}, close ${monday.close}<br>
    <strong>Tuesday:</strong> open ${tuesday.open}, close ${tuesday.close}<br>
    <strong>Wednesday:</strong> open ${wednesday.open}, close ${wednesday.close}<br>
    <strong>Thursday:</strong> open ${thursday.open}, close ${thursday.close}<br>
    <strong>Friday:</strong> open ${friday.open}, close ${friday.close}<br>
    <strong>Saturday:</strong> open ${saturday.open}, close ${saturday.close}<br>
    <strong>Sunday:</strong> open ${sunday.open}, close ${sunday.close}<br>
    </p>`
  }

  sendGrid.setApiKey(process.env.SENDGRID_API_KEY)

  const message: MailDataRequired = {
    to: process.env.SBPD_THRIVE_EMAIL,
    from: process.env.SENDGRID_RECORDS_IS_THIS_USEFUL_EMAIL,
    subject: 'Update Location Schedule Request',
    text: `${listToText()}`,
    html: `${renderHtml()}`,
  }

  await sendGrid
    .send(message)
    .then(response => {
      res.json({})
    })
    .catch(err => {
      res.json({ error: 'An error has occurred.' })
    })
}

export default postEditScheduleRequest
