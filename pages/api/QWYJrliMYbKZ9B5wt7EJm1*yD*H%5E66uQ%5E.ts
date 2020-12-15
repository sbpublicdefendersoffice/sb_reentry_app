import { NextApiRequest, NextApiResponse } from 'next'
import twilio from 'twilio'

const secretId: string = process.env.NEXT_PUBLIC_TWILIO_SID
const authToken: string = process.env.NEXT_PUBLIC_AUTH_TOKEN

const local: string = 'localhost:3000'
const deployed: string = 'santabarbarareentry.netlify.app'

const text = async (
  req: NextApiRequest,
  res: NextApiResponse,
): Promise<void> => {
  const { query } = req
  const { message, authorization } = query

  const {
    host,
    // authorization
  } = req.headers

  const correctHost: boolean = host === local || host.endsWith(deployed)
  const correctAuth: boolean =
    process.env.NEXT_PUBLIC_SECRET_TEXT_KEY === authorization

  // TODO: put in a try catch block and trigger from the front end, and add more error handling too

  if (correctHost && correctAuth) {
    try {
      const texter = twilio(secretId, authToken)

      const text = await texter.messages.create({
        to: '+1',
        from: process.env.NEXT_PUBLIC_FROM_NUMBER,
        body: message as string,
      })

      const response = await text.toJSON()
      res.json(response)
    } catch (error) {
      res.json(error)
    }
  } else res.json('you are not authorized to access this route')
}

export default text
