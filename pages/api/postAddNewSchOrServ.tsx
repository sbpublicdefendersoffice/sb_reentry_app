import { NextApiRequest, NextApiResponse } from 'next'
import { sendEmail } from '../../helpers'
import initDb from '../../helpers/sequelize'
const postAddNewInfo = async (
  req: NextApiRequest,
  res: NextApiResponse,
): Promise<void> => {
  try {
    const body = JSON.parse(req.body)
    const {
      open_time,
      close_time,
      schOrService,
      days,
      notes,
      org_name,
      locationID,
      name_english,
      name_spanish,
    } = body
    const { servObj, schObj, pureLocSchObj, pureLocServObj } = initDb()
    if (schOrService == 'schedules') {
      const addSchedule = await schObj.create({
        id: 5561,
        open_time: open_time,
        close_time: close_time,
        days: days,
        notes: notes,
      })
      res.json(addSchedule)
      await pureLocSchObj.create({
        schedules_id: addSchedule.id,
        locations_id: locationID,
      })
      try {
        //@ts-ignore
        await sendEmail({
          to: 'victorasauceda@gmail.com',
          from: 'verification@thrivesbc.com',
          subject: `${org_name} added a Schedule to  their dashboard`,
          text: `
    Here is the info:
    Open Time: ${open_time}
    Close Time: ${close_time}
    Day: ${days}
    Notes: ${notes}
             `,
        })
      } catch (err) {
        console.error(err)
        res.status(500)
      }
    }
    const addService = await servObj.create({
      id: 4456,
      name_english: name_english,
      name_spanish: name_spanish,
    })
    console.log(
      '🚀 ~ file: postAddNewSchOrServ.tsx ~ line 70 ~ addService',
      addService,
    )
    res.json(addService)
    const addPure = await pureLocServObj.create({
      services_id: addService.id,
      locations_id: locationID,
    })
    console.log(
      '🚀 ~ file: postAddNewSchOrServ.tsx ~ line 80 ~ pureLocServObj',
      addPure,
    )
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
      res.status(500)
    }
  } catch (err) {
    const error: string = err
    console.error(error, 'didnt make the first one🚨')
    res.json({ error })
  }
}
export default postAddNewInfo
