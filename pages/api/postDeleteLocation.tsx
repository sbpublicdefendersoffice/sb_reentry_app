import { NextApiRequest, NextApiResponse } from 'next'
import { sendEmail } from '../../helpers/sendEmail'
import initDb from '../../helpers/sequelize'
const postDeleteLocation = async (
  req: NextApiRequest,
  res: NextApiResponse,
): Promise<void> => {
  // disabled because API is not in use.
  // If re-enabling check that only relevant info is returned in
  // response instead of entire sequelize database object
  return res.status(501).json({ error: 'Not implemented.' })
  try {
    const body = JSON.parse(req.body)
    let { locationInfo, org_id, org_name } = body
    const {
      id,
      name,
      address,
      address_2,
      city,
      state,
      zip,
      phone,
      email,
      notes,
    } = locationInfo
    const { locObj, locOrgObj } = initDb()
    try {
      //@ts-ignore
      await sendEmail({
        to: 'victorasauceda@gmail.com',
        from: 'verification@thrivesbc.com',
        subject: `${org_name} deleted a location in their dashboard`,
        text: `
            ${org_name} deleted a location containing the following info:
            Id: ${id}
            Name: ${name}
            Address: ${address}
            Address_2: ${address_2}
            City: ${city}
            State: ${state}
            Zip: ${zip}
            Phone: ${phone}
            Email: ${email}
            Notes: ${notes}
             `,
      })
    } catch (err) {
      console.error(err)
      res.status(500)
    }
    const deleteLocation = await locObj.destroy({
      where: { id: id },
    })
    await locOrgObj.destroy({
      where: {
        locations_id: id,
        organizations_id: org_id,
      },
    })
    res.json(deleteLocation)
  } catch (err) {
    const error: string = err.message
    console.error(error)
    res.json({ error: 'An error has occurred.' })
  }
}
export default postDeleteLocation
