import { NextApiRequest, NextApiResponse } from 'next'

import initDb from '../../helpers/sequelize'

const postAddNewInfo = async (
  req: NextApiRequest,
  res: NextApiResponse,
): Promise<void> => {
  try {
    const body = JSON.parse(req.body)
    console.log('🚀 ~ file: postAddNewInfo.ts ~ line 18 ~ body', body)

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

    const { locObj, pureLocOrgObj } = initDb()

    const addLocation = await locObj.create({
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
    // await pureLocOrgObj.create({
    //   locations_id: addLocation.id,
    //   organizations_id: id,
    // })

    //     try {
    //       //@ts-ignore
    //       await sendEmail({
    //         to: 'victorasauceda@gmail.com',
    //         from: 'verification@thrivesbc.com',
    //         subject: `${orgName} added a location in their dashboard`,
    //         text: `
    // Here is the info:
    // Name: ${name}

    //          `,
    //       })
    //     } catch (err) {
    //       console.error(err)
    //       res.status(500)
    //     }
  } catch (err) {
    const error: string = err.message
    console.error(error, 'didnt make the first one🚨')
    res.json({ error })
  }
}
export default postAddNewInfo
