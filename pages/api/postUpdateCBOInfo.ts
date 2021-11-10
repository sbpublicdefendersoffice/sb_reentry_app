import { NextApiRequest, NextApiResponse } from 'next'
import initDb from '../../helpers/sequelize'
const updateCBOInfoRoute = async (
  req: NextApiRequest,
  res: NextApiResponse,
): Promise<void> => {
  try {
    const { orgObj, locObj, schObj, servObj } = initDb()
    // const { authorization } = req.headers

    const {
      id,
      name_english,
      name_spanish,
      website,
      languages_spoken_english,
      languages_spoken_spanish,
      customers_served_english,
      customers_served_spanish,
      notes_english,
      notes_spanish,
      locations,
    } = JSON.parse(req.body)

    // if (!authorization) {
    //   return res.status(401).json({ message: 'No authorization header sent' })
    // }

    // const token = authorization.split(' ')[1]

    // jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
    //   if (err) {
    //     return res.status(401).json({ message: 'Unable to verify token' })
    //   }
    //   const { isVerified, email } = decoded

    //   if (decoded.id !== id) {
    //     return res.status(403).json({ message: 'Not allowed to update data' })
    //   }
    //   if (!isVerified) {
    //     return res.status(403).json({
    //       message:
    //         'You need to verify your email before you can update your data',
    //     })
    //   }
    await orgObj.update(
      {
        name_english: name_english,
        name_spanish: name_spanish,
        website: website,
        languages_spoken_english: languages_spoken_english,
        languages_spoken_spanish: languages_spoken_spanish,
        customers_served_english: customers_served_english,
        customers_served_spanish: customers_served_spanish,
        notes_english: notes_english,
        notes_spanish: notes_spanish,
      },
      { where: { id: id } },
    )
    locations.map(location => {
      const {
        id,
        zip,
        city,
        name,
        website,
        address,
        address_2,
        state,
        phone,
        email,
        notes,
        schedules,
        services,
      } = location
      schedules.map(schedule => {
        const { id, open_time, close_time, days, notes } = schedule
        schObj.update(
          {
            open_time: open_time,
            close_time: close_time,
            days: days,
            notes: notes,
          },
          { where: { id: id } },
        )
      })
      services.map(service => {
        const { id, name_english, name_spanish } = service
        servObj.update(
          {
            name_english: name_english,
            name_spanish: name_spanish,
          },
          { where: { id: id } },
        )
      })

      locObj.update(
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
    })

    res.status(200)
    res.send(updateCBOInfoRoute)
  } catch (err) {
    const error: string = err.message
    console.error(error)
    res.json({ error })
  }
}
export default updateCBOInfoRoute
