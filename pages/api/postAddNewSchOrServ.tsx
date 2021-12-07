import { NextApiRequest, NextApiResponse } from 'next'

import { sendEmail } from '../../helpers'
import initDb from '../../helpers/sequelize'

const postAddNewInfo = async (
  req: NextApiRequest,
  res: NextApiResponse,
): Promise<void> => {
  try {
    const body = JSON.parse(req.body)
    console.log('🚀 ~ file: postAddNewInfo.ts ~ line 18 ~ body', body)

    let { open_time } = body
    console.log('😇', body.open_time, open_time)
    const { servObj, schObj } = initDb()

    const addSchedule = await schObj.create({
      open_time: body.open_time,
      close_time: body.close_time,
      days: body.days,
      notes: body.notes,
    })
    res.json(addSchedule)

    // await pureLocOrgObj.create({
    //   locations_id: addLocation.id,
    //   organizations_id: id,
    // })

    try {
      //@ts-ignore
      await sendEmail({
        to: 'victorasauceda@gmail.com',
        from: 'verification@thrivesbc.com',
        subject: `Someone added a Schedule in their dashboard`,
        text: `
    Here is the info:
    Open_time: ${open_time}

             `,
      })
    } catch (err) {
      console.error(err)
      res.status(500)
    }
  } catch (err) {
    const error: string = err.message
    console.error(error, 'didnt make the first one🚨')
    res.json({ error })
  }
}
export default postAddNewInfo
