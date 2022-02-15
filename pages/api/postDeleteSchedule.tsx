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

    const { id, open_time, close_time, days, notes } = info
    const { schObj, schLocObj } = initDb()
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
    await schLocObj.destroy({
      where: {
        locations_id: location_id,
        schedules_id: id,
      },
    })
    res.json(deleteSchedule)
  } catch (err) {
    const error: string = err.message
    console.error(error)
    res.json({ error })
  }
}
export default postDeleteScheduleLocation
