import { NextApiRequest, NextApiResponse } from 'next'
import sendGrid, { MailDataRequired } from '@sendgrid/mail'

const postAddLocationRequest = async (
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
  } = JSON.parse(req.body)

  const renderText = (): string => {
    return `New Location to add\n
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
      Location Associated Organization: ${orgName}\n
      Location Associated Organization Id: ${id}\n`
  }

  const renderHtml = (): string => {
    return `<h1>New Location to add</h1>
    <p>
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
    <strong>Location Associated Organization: </strong>${orgName}<br>
    <strong>Location Associated Organization Id: </strong>${id}<br>
    </p>`
  }

  sendGrid.setApiKey(process.env.SENDGRID_API_KEY)

  const message: MailDataRequired = {
    to: process.env.SBPD_THRIVE_EMAIL,
    from: process.env.SENDGRID_RECORDS_IS_THIS_USEFUL_EMAIL,
    subject: 'Add a New Location Request',
    text: `${renderText()}`,
    html: `${renderHtml()}`,
  }

  await sendGrid
    .send(message)
    .then(response => {
      res.json(response)
    })
    .catch(err => {
      res.json(err)
    })
}

export default postAddLocationRequest
