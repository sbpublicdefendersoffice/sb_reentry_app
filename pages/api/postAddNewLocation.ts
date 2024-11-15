import { NextApiRequest, NextApiResponse } from 'next'
import { sendEmail } from '../../helpers/sendEmail'
import initDb from '../../helpers/sequelize'
const postAddNewLocation = async (
  req: NextApiRequest,
  res: NextApiResponse,
): Promise<void> => {
  try {
    const body = JSON.parse(req.body)
    let {
      name,
      address,
      address_2,
      city,
      state,
      zip,
      phone,
      email,
      notes,
      website,
      latitude,
      longitude,
      orgName,
      id,
    } = body
    const { locObj, locOrgObj } = initDb()
    const maxId: number = await locObj.max('id')
    const addLocation = await locObj.create({
      id: maxId + 1,
      name: name,
      address: address,
      address_2: address_2,
      city: city,
      state: state,
      zip: zip,
      phone: phone,
      email: email,
      website: website,
      notes: notes,
      latitude: latitude,
      longitude: longitude,
    })
    res.json(addLocation)
    await locOrgObj.create({
      locations_id: addLocation.id,
      organizations_id: id,
    })
    try {
      //@ts-ignore
      await sendEmail({
        to: 'victorasauceda@gmail.com',
        from: 'verification@thrivesbc.com',
        subject: `${orgName} added a location in their dashboard`,
        text: `
    Here is the info:
    ID${id}
    Name: ${name}
    Address: ${address}
    Address 2: ${address_2}
    City: ${city}
    State: ${state}
    Zip: ${zip}
    Phone: ${phone}
    Email: ${email}
    Website: ${website}
    Notes: ${notes}
    Latitude: ${latitude}
    Longitude: ${longitude}
             `,
      })
    } catch (err) {
      console.error(err)
      res.status(500).json({ error: 'An error has occurred.' })
    }
  } catch (err) {
    const error: string = err.message
    console.error(error)
    res.json({ error: 'An error has occurred.' })
  }
}
export default postAddNewLocation
