import { NextApiRequest } from 'next'
import { AllowedURL, AllowedMethod } from '../types/CORS'

export const validatePhoneNumber = (num: string): boolean =>
  /^[0-9]{10}$/.test(num)

export const INVALID_NUMBER: string = 'Invalid Number'

export const POST: AllowedMethod = 'POST'
export const GET: AllowedMethod = 'GET'

const LOCAL: AllowedURL = 'localhost:3000'
const DEPLOYED: AllowedURL = 'santabarbarareentry.netlify.app'

export const validateRequest = (
  req: NextApiRequest,
  methodToAllow: AllowedMethod,
): boolean => {
  const { headers, method } = req
  const { host } = headers

  const isAllowedURL: boolean = host === LOCAL || host.endsWith(DEPLOYED)
  const isAllowedMethod: boolean = methodToAllow === method

  if (isAllowedURL && isAllowedMethod) return true
  else return false
}
