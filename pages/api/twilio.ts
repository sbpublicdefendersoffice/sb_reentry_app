import { NextApiRequest, NextApiResponse } from 'next'
import twilio from 'twilio'

import {
  validatePhoneNumber,
  INVALID_NUMBER,
  validateRequest,
  POST,
} from '../../helpers/validators'

const secretId: string = process.env.TWILIO_SID
const authToken: string = process.env.TWILIO_AUTH_TOKEN
const from: string = process.env.TWILIO_FROM_NUMBER

const text = async (
  req: NextApiRequest,
  res: NextApiResponse,
): Promise<void> => {
  // temporarily disable this API. Not in use and not secure.
  return res.status(501).json({ error: 'Not implemented.' })

  // *************************
  // DO NOT USE THE FOLLOWING. It should not accept custom messages in the request body unless properly authenticated
  // *************************
  //
  // if (validateRequest(req, POST)) {
  //   try {
  //     const { to, message } = JSON.parse(req.body)

  //     const validPhoneNumber = validatePhoneNumber(to)
  //     if (!validPhoneNumber) throw new Error(INVALID_NUMBER)

  //     const texter = twilio(secretId, authToken)
  //     const text = await texter.messages.create({
  //       to: `+1${to}`,
  //       from,
  //       body: message,
  //     })

  //     const response = await text.toJSON()
  //     if (!response.errorCode) res.json(response)
  //     else throw new Error(response.errorMessage)
  //     // else throw new Error(response.errorCode)
  //   } catch (error) {
  //     res.json({ error: 'An error has occurred.' })
  //     res.status(500)
  //   }
  // } else
  //   res.json({
  //     error:
  //       'Your request is from an invalid source, or is sending an incorrect request',
  //   })
}

export default text
