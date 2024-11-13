import { NextApiRequest, NextApiResponse } from 'next'
import twilio from 'twilio'

import {
  validatePhoneNumber,
  INVALID_NUMBER,
  validateRequest,
  POST,
  ValidationError,
} from '../../helpers/validators'

const secretId: string = process.env.TWILIO_SID
const authToken: string = process.env.TWILIO_AUTH_TOKEN
const from: string = process.env.TWILIO_FROM_NUMBER

const text = async (
  req: NextApiRequest,
  res: NextApiResponse,
): Promise<void> => {
  if (validateRequest(req, POST)) {
    try {
      const { to, message } = JSON.parse(req.body)

      const validPhoneNumber = validatePhoneNumber(to)
      if (!validPhoneNumber) throw new ValidationError(INVALID_NUMBER)

      const texter = twilio(secretId, authToken)
      const text = await texter.messages.create({
        to: `+1${to}`,
        from,
        body: message,
      })

      const response = await text.toJSON()
      if (!response.errorCode) res.json(response)
      else throw new ValidationError('Error sending text message.')
      // else throw new Error(response.errorCode)
    } catch (error) {
      console.log(error)
      if (error instanceof ValidationError) {
        res.json({ error: error.message })
      } else {
        res.json({ error: 'An error has occurred.' })
      }
    }
  } else
    res.json({
      error:
        'Your request is from an invalid source, or is sending an incorrect request',
    })
}

export default text
