import { NextApiRequest, NextApiResponse } from 'next'
import twilio from 'twilio'

import { validatePhoneNumber, INVALID_NUMBER } from '../../helpers/validators'

const secretId: string = process.env.TWILIO_SID
const authToken: string = process.env.TWILIO_AUTH_TOKEN
const from: string = process.env.TWILIO_FROM_NUMBER

const local: string = 'localhost:3000'
const deployed: string = 'santabarbarareentry.netlify.app'

const text = async (
  req: NextApiRequest,
  res: NextApiResponse,
): Promise<void> => {
  const { host } = req.headers

  const correctHost: boolean = host === local || host.endsWith(deployed)
  const correctAuth: boolean = true

  if (correctHost && correctAuth) {
    try {
      const { to, message } = JSON.parse(req.body)

      const validPhoneNumber = validatePhoneNumber(to)
      if (!validPhoneNumber) throw new Error(INVALID_NUMBER)

      const texter = twilio(secretId, authToken)
      const text = await texter.messages.create({
        to: `+1${to}`,
        from,
        body: message,
      })

      const response = await text.toJSON()
      if (!response.errorCode) res.json(response)
      else throw new Error(response.errorCode)
    } catch (error) {
      res.json({ error: error.message })
    }
  } else res.json({ forbidden: 'you are not authorized to access this route' })
}

export default text
