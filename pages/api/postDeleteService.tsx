import { NextApiRequest, NextApiResponse } from 'next'
import { sendEmail } from '../../helpers/sendEmail'
import initDb from '../../helpers/sequelize'

const postDeleteScheduleLocation = async (
  req: NextApiRequest,
  res: NextApiResponse,
): Promise<void> => {
  try {
    const body = JSON.parse(req.body)
    let { info, location_id, org_name } = body

    const { id, name_english, name_spanish } = info
    const { servObj, servLocObj } = initDb()
    try {
      //@ts-ignore
      await sendEmail({
        to: 'victorasauceda@gmail.com',
        from: 'verification@thrivesbc.com',
        subject: `${org_name} deleted a service in their dashboard`,
        text: `
            ${org_name} deleted the following info:
            Id: ${id}
            Service Name English: ${name_english}
            Service Name Spanish: ${name_spanish}

             `,
      })
    } catch (err) {
      console.error(err)
      res.status(500)
    }
    const deleteService = await servObj.destroy({
      where: { id: id },
    })
    await servLocObj.destroy({
      where: {
        locations_id: location_id,
        services_id: id,
      },
    })
    res.json(deleteService)
  } catch (err) {
    const error: string = err.message
    console.error(error)
    res.json({ error: 'An error has occurred.' })
  }
}
export default postDeleteScheduleLocation
