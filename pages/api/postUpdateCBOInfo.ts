import { NextApiRequest, NextApiResponse } from 'next'
import initDb from '../../helpers/sequelize'
const updateCBOInfoRoute = async (
  req: NextApiRequest,
  res: NextApiResponse,
): Promise<void> => {
  try {
    const { orgObj, locObj, schObj, servObj } = initDb()
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
      categories_english,
      categories_spanish,
    } = JSON.parse(req.body)

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
        categories_english: categories_english,
        categories_spanish: categories_spanish,
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
        latitude,
        longitude,
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
          latitude: latitude,
          longitude: longitude,
        },
        { where: { id: id } },
      )
    })

    res.status(200)
    res.send(updateCBOInfoRoute)
  } catch (err) {
    const error: string = err.message
    console.error(error)
    res.json({ error: 'An error has occurred.' })
    res.status(500)
  }
}
export default updateCBOInfoRoute
