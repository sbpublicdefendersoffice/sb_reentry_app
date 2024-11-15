import { NextApiRequest, NextApiResponse } from 'next'
import { sendEmail } from '../../helpers/sendEmail'
import initDb from '../../helpers/sequelize'
const postAddNewInfo = async (
  req: NextApiRequest,
  res: NextApiResponse,
): Promise<void> => {
  try {
    const body = JSON.parse(req.body)
    const { org_name, locationID, name_english, name_spanish } = body
    const { servObj, servLocObj } = initDb()

    const maxId: number = await servObj.max('id')
    const addService = await servObj.create({
      id: maxId + 1,
      name_english: name_english,
      name_spanish: name_spanish,
    })

    res.json(addService)
    await servLocObj.create({
      services_id: addService.id,
      locations_id: locationID,
    })

    try {
      //@ts-ignore
      await sendEmail({
        to: 'victorasauceda@gmail.com',
        from: 'verification@thrivesbc.com',
        subject: `${org_name} added a Services to their dashboard`,
        text: `
  Here is the info:
  Name English: ${name_english}
  Name Spanish: ${name_spanish}
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
export default postAddNewInfo
