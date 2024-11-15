import { NextApiRequest, NextApiResponse } from 'next'
import { reservationsUrl } from 'twilio/lib/jwt/taskrouter/util'
import initDb from '../../helpers/sequelize'

const postUpdateLocation = async (
  req: NextApiRequest,
  res: NextApiResponse,
): Promise<void> => {
  const { locObj } = initDb()
  const {
    id,
    name,
    zip,
    city,
    website,
    address,
    address_2,
    state,
    email,
    phone,
    notes,
  } = JSON.parse(req.body)

  await locObj
    .update(
      {
        zip: zip,
        city: city,
        name: name,
        website: website,
        address: address,
        address2: address_2,
        state: state,
        phone: phone,
        email: email,
        notes: notes,
      },
      { where: { id: id } },
    )
    .then(response => {
      res.json(response)
    })
    .catch(err => {
      const error: string = err.message
      res.json({ error: 'An error has occurred.' })
    })
}
export default postUpdateLocation
