import { NextApiRequest, NextApiResponse } from 'next'
import { sendEmail } from '../../helpers'
import initDb from '../../helpers/sequelize'

const postDeleteScheduleLocation = async (
  req: NextApiRequest,
  res: NextApiResponse,
): Promise<void> => {
  try {
    const body = JSON.parse(req.body)
    let { info, schOrService, location_id, org_name } = body
    if (schOrService == 'schedules') {
      const { id, open_time, close_time, days, notes } = info
      const { schObj, pureLocSchObj } = initDb()
      try {
        //@ts-ignore
        await sendEmail({
          to: 'victorasauceda@gmail.com',
          from: 'verification@thrivesbc.com',
          subject: `${org_name} deleted a schedule in their dashboard`,
          text: `
            ${org_name} deleted the following info:
            Id: ${id}
            Open Time: ${open_time}
            Close Time: ${close_time}
            Days: ${days}
         Notes: ${notes}
             `,
        })
      } catch (err) {
        console.error(err)
        res.status(500)
      }
      const deleteSchedule = await schObj.destroy({
        where: { id: id },
      })
      await pureLocSchObj.destroy({
        where: {
          locations_id: location_id,
          schedules_id: id,
        },
      })
      res.json(deleteSchedule)
    } else {
      const { id, name_english, name_spanish } = info
      const { servObj, pureLocServObj } = initDb()
      try {
        //@ts-ignore
        await sendEmail({
          to: 'victorasauceda@gmail.com',
          from: 'verification@thrivesbc.com',
          subject: `${org_name} deleted a service in their dashboard`,
          text: `
          ${org_name} deleted the following service:
          Id: ${id}
          Name in English: ${name_english}
          Name in Spanish: ${name_spanish}
           `,
        })
      } catch (err) {
        console.error(err)
        res.status(500)
      }
      const deleteService = await servObj.destroy({
        where: { id: id },
      })
      await pureLocServObj.destroy({
        where: {
          locations_id: location_id,
          services_id: id,
        },
      })
      res.json(deleteService)
    }
  } catch (err) {
    const error: string = err.message
    console.error(error)
    res.json({ error })
  }
}
export default postDeleteScheduleLocation
