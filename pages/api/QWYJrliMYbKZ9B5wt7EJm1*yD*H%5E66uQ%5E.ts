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
    const texter = twilio(secretId, authToken)

    //back that git up
    const text = await texter.messages.create({
      to: '+number',
      from: process.env.NEXT_PUBLIC_FROM_NUMBER,
      body: message as string,
    })

    const response = await text.toJSON()
    console.log(response)
  }

  res.json({ date: Date.now() })
}

export default text
