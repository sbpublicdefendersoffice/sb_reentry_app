import { NextApiRequest, NextApiResponse } from 'next'
import { sendEmail } from '../../helpers/sendEmail'
import initDb from '../../helpers/sequelize'
const postAddNewInfo = async (
  req: NextApiRequest,
  res: NextApiResponse,
): Promise<void> => {
  // disabled because API is not in use.
  // If re-enabling check that only relevant info is returned in
  // response instead of entire sequelize database object
  return res.status(501).json({ error: 'Not implemented.' })
  try {
    const body = JSON.parse(req.body)
    const { open_time, close_time, days, notes, org_name, locationID } = body
    const { schObj, schLocObj } = initDb()

    const maxId: number = await schObj.max('id')
    const addSchedule = await schObj.create({
      id: maxId + 1,
      open_time: open_time,
      close_time: close_time,
      days: days,
      notes: notes,
    })
    res.json(addSchedule)
    await schLocObj.create({
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
      res.status(500).json({ error: 'An error has occurred.' })
    }
  } catch (err) {
    const error: string = err.message
    console.error(error)
    res.json({ error: 'An error has occurred.' })
  }
}
export default postAddNewInfo
