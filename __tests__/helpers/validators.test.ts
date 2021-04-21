import { NextApiRequest } from 'next'

import {
  INVALID_NUMBER,
  POST,
  GET,
  validatePhoneNumber,
  validateRequest,
  validateIsInSantaBarbaraCounty,
} from '../../helpers/validators'

const validDummyApiRequest = {
  method: 'POST',
  headers: { host: 'santabarbarareentry.netlify.app' },
}

const invalidDummyApiRequest = {
  method: 'PATCH',
  headers: { host: 'someotherhost.com' },
}

const dummyCoords: GeolocationCoordinates = {
  accuracy: 0,
  altitude: null,
  altitudeAccuracy: null,
  heading: null,
  latitude: 0,
  longitude: 0,
  speed: null,
}

describe('validator helper constants and functions', () => {
  it('exports correct string constants', () => {
    const expectedResults: string[] = ['Invalid Number', 'POST', 'GET']
    const constantsFromValidators: string[] = [INVALID_NUMBER, POST, GET]

    constantsFromValidators.forEach((constant: string, i: number) =>
      expect(constant).toEqual(expectedResults[i]),
    )
  })

  it('validates a correctly formatted phone number', () => {
    const correctNumber: string = '1234567890'
    const validateTestResult: boolean = validatePhoneNumber(correctNumber)

    expect(validateTestResult).toEqual(true)
  })

  it('does not validate an incorrectly formatted phone number', () => {
    const wrongNumber: string = '123456789'
    const validateTestResult: boolean = validatePhoneNumber(wrongNumber)

    expect(validateTestResult).toEqual(false)
  })

  it('validates a correctly formatted api request', () => {
    const validateApiRequest: boolean = validateRequest(
      validDummyApiRequest as NextApiRequest,
      'POST',
    )

    expect(validateApiRequest).toEqual(true)
  })

  it('does not validate an incorrectly formatted api request', () => {
    const validateApiRequest: boolean = validateRequest(
      invalidDummyApiRequest as NextApiRequest,
      'POST',
    )

    expect(validateApiRequest).toEqual(false)
  })

  it('validates a set of coords in santa barbara county', () => {
    const validateCoords: boolean = validateIsInSantaBarbaraCounty({
      ...dummyCoords,
      latitude: 34.615504683742714,
      longitude: -120.19000441804961,
    })

    expect(validateCoords).toEqual(true)
  })

  it('does not validate a set of coords not in santa barbara county', () => {
    const validateCoords: boolean = validateIsInSantaBarbaraCounty(dummyCoords)

    expect(validateCoords).toEqual(false)
  })
})
