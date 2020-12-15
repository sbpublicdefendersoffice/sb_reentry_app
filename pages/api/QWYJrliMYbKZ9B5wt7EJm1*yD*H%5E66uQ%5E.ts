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
  const { host, authorization } = req.headers

  const correctHost: boolean = host === local || host.endsWith(deployed)
  const correctAuth: boolean =
    process.env.NEXT_PUBLIC_SECRET_TEXT_KEY === authorization

  if (correctHost && correctAuth) {
    try {
      const { to, message } = JSON.parse(req.body)

      const texter = twilio(secretId, authToken)

      const text = await texter.messages.create({
        to: `+1${to}`,
        from: process.env.NEXT_PUBLIC_FROM_NUMBER,
        body: message,
      })

      const response = await text.toJSON()
      if (!response.errorCode) res.json(response)
      else throw new Error('Error posting message')
    } catch (error) {
      res.json(error)
    }
  } else res.json({ forbidden: 'you are not authorized to access this route' })
}

export default text
