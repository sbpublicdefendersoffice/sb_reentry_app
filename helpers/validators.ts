import { NextApiRequest } from 'next'

import { AllowedURL, AllowedMethod } from '../types/CORS'
import { fitBoundsArr } from '../constants/maps'

export const validatePhoneNumber = (num: string): boolean =>
  /^[0-9]{10}$/.test(num)

export const INVALID_NUMBER: string = 'Invalid Number'

export const POST: AllowedMethod = 'POST'
export const GET: AllowedMethod = 'GET'

const LOCAL: AllowedURL = 'localhost:3000'
const PRODUCTION: AllowedURL = 'thrivesbc.com'
const DEPLOYED: AllowedURL = 'santabarbarareentry.netlify.app'
const APTIBLE: AllowedURL = 'on-aptible.com'

export const validateRequest = (
  req: NextApiRequest,
  methodToAllow: AllowedMethod,
): boolean => {
  const { headers, method } = req
  const { host } = headers

  const isAllowedURL: boolean =
    host === LOCAL ||
    host.endsWith(PRODUCTION) ||
    host.endsWith(DEPLOYED) ||
    host.endsWith(APTIBLE)
  const isAllowedMethod: boolean = methodToAllow === method

  if (isAllowedURL && isAllowedMethod) return true
  else return false
}

export const validateIsInSantaBarbaraCounty = (
  coords: GeolocationCoordinates,
): boolean => {
  const lowerBounds = fitBoundsArr[0]
  const higherBounds = fitBoundsArr[1]

  const [lowerLong, lowerLat] = [lowerBounds[0], lowerBounds[1]]
  const [higherLong, higherLat] = [higherBounds[0], higherBounds[1]]

  const { longitude, latitude } = coords

  const isLongInBounds: boolean =
    longitude >= lowerLong && longitude <= higherLong
  const isLatInBounds: boolean = latitude >= lowerLat && latitude <= higherLat

  const isInSantaBarbaraCounty: boolean = isLongInBounds && isLatInBounds

  return isInSantaBarbaraCounty
}

export class ValidationError extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'ValidationError'
  }
}
