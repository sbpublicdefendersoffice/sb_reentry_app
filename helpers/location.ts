import { Dispatch, SetStateAction } from 'react'

import { VisibilityAsArray, SantaBarbaraCountyCoords, Language } from '../types'
import { validateIsInSantaBarbaraCounty } from './validators'
import { inSantaBarbaraCopy } from '../constants/copy'

export const checkAndSetUserLocation = (
  setCoords: Dispatch<SetStateAction<SantaBarbaraCountyCoords>>,
  setToast: Dispatch<SetStateAction<string>>,
  currentLanguage: Language,
): void => {
  const langLocalizedCopy = inSantaBarbaraCopy[currentLanguage]

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position: GeolocationPosition): void => {
        const { coords } = position

        // below value for development and presentation only
        // const isInSantaBarbara: boolean = true
        const isInSantaBarbara: boolean = validateIsInSantaBarbaraCounty(coords)

        const coordsToSave: SantaBarbaraCountyCoords = Object.defineProperties(
          coords,
          {
            isInSBCounty: {
              value: isInSantaBarbara,
              enumerable: true,
            },
            // below two values for development and presentation only
            // longitude: { value: -119.69805, enumerable: true },
            // latitude: { value: 34.406876, enumerable: true },
            longitude: { value: coords.longitude, enumerable: true },
            latitude: { value: coords.latitude, enumerable: true },
            accuracy: { value: coords.accuracy, enumerable: true },
            altitude: { value: coords.altitude, enumerable: true },
            altitudeAccuracy: {
              value: coords.altitudeAccuracy,
              enumerable: true,
            },
            heading: { value: coords.heading, enumerable: true },
            speed: { value: coords.speed, enumerable: true },
          },
        )
        setCoords(coordsToSave)
        if (isInSantaBarbara) setToast(langLocalizedCopy.inCounty)
        else setToast(langLocalizedCopy.notInCounty)
      },
      error => setToast(`${langLocalizedCopy.error} ${error.message}`),
    )
  } else setToast(langLocalizedCopy.permission)
}

export const isRegionVisible = (region: VisibilityAsArray): boolean => region[1]

const ONE_RADIAN: number = Math.PI / 180
const toRadian = (angle: number): number => ONE_RADIAN * angle
const distance = (a: number, b: number): number => ONE_RADIAN * (a - b)

export const isDistanceInBounds = (
  [lat1, lon1]: number[],
  [lat2, lon2]: number[],
  limit: number,
): boolean => {
  const { asin, cos, pow, sin, sqrt } = Math
  const RADIUS_OF_EARTH_IN_MILES: number = 3958.8

  const dLat: number = distance(lat2, lat1)
  const dLon: number = distance(lon2, lon1)

  lat1 = toRadian(lat1)
  lat2 = toRadian(lat2)

  // Haversine Formula
  const a: number =
    pow(sin(dLat / 2), 2) + pow(sin(dLon / 2), 2) * cos(lat1) * cos(lat2)
  const c: number = 2 * asin(sqrt(a))

  const finalDistance: number = RADIUS_OF_EARTH_IN_MILES * c

  const isInBounds: boolean = finalDistance <= limit

  return isInBounds
}
