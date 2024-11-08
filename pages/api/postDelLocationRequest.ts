import { NextApiRequest, NextApiResponse } from 'next'
import sendGrid, { MailDataRequired } from '@sendgrid/mail'

const postDelLocationRequest = async (
  req: NextApiRequest,
  res: NextApiResponse,
): Promise<void> => {
  const {
    name,
    address,
    address_2,
    city,
    state,
    zip,
    email,
    website,
    phone,
    notes,
    orgName,
    id,
    latitude,
    longitude,
    hours,
    orgId,
  } = JSON.parse(req.body)

  const renderText = (): string => {
    return `User request: Delete location\n
      Location ID: ${id} \n
      Location Name: ${name} \n
      Location Address: ${address} \n
      Location Address_2: ${address_2} \n
      Location City: ${city}\n
      Location State: ${state}\n
      Location Zipcode: ${zip}\n
      Location Latitude: ${latitude}\n
      Location longitude: ${longitude}\n
      Location Email: ${email}\n
      Location Website: ${website}\n
      Location Phone: ${phone}\n
      Location Notes: ${notes}\n
      Location Hours: ${hours}\n
      Location Associated Organization Id: ${orgId}\n
      Location Associated Organization Name: ${orgName}\n`
    location
  }

  const renderHtml = (): string => {
    return `<h1>User request: Delete location</h1>
    <p>
      <strong>Location ID: </strong>${id}<br>
      <strong>Location Name: </strong>${name}<br>
      <strong>Location Address: </strong>${address}<br>
      <strong>Location Address_2: </strong>${address_2}<br>
      <strong>Location City: </strong>${city}<br>
      <strong>Location State: </strong>${state}<br>
      <strong>Location Zipcode: </strong>${zip}<br>
      <strong>Location Latitude: </strong>${latitude}<br>
      <strong>Location longitude: </strong>${longitude}<br>
      <strong>Location Email: </strong>${email}<br>
      <strong>Location Website: </strong>${website}<br>
      <strong>Location Phone: </strong>${phone}<br>
      <strong>Location Notes: </strong>${notes}<br>
      <strong>Location Hours: </strong>${hours}<br>
      <strong>Location Associated Organization Name: </strong>${orgName}<br>
      <strong>Location Associated Organization Id: </strong>${id}<br>
    </p>`
  }

  sendGrid.setApiKey(process.env.SENDGRID_API_KEY)

  const message: MailDataRequired = {
    to: process.env.SBPD_THRIVE_EMAIL,
    from: process.env.SENDGRID_RECORDS_IS_THIS_USEFUL_EMAIL,
    subject: 'Delete Location Request',
    text: `${renderText()}`,
    html: `${renderHtml()}`,
  }

  await sendGrid
    .send(message)
    .then(response => {
      res.json(response)
    })
    .catch(err => {
      res.json({ error: 'An error has occurred.' })
    })
}

export default postDelLocationRequest
