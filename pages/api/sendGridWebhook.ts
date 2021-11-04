import { NextApiRequest, NextApiResponse } from 'next'

const sendGridWebhook = async (
  req: NextApiRequest,
  res: NextApiResponse,
): Promise<void> => {
  try {
    console.log(req.body)
    console.log(req.body[0].event)

    // grab req.body[0].sg_message_id, we'll be storing that to the database
    // split req.body[0].sg_message_id on period and take first element
    // use that in a db query the split variable matches a user x-message-id stored in the database
    // update expungement status based on event. i.e. 'delivered' or 'open'
    // use favored communication methods to update client, text or email. tell them to expect a call in whatever days
    // a user will also see their expungement status when they open their info in the app

    res.end()
  } catch (error) {
    console.error(error)
  }
}

export default sendGridWebhook
