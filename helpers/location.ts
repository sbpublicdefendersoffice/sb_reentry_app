import { Dispatch, SetStateAction } from 'react'

import { VisibilityAsArray, SantaBarbaraCountyCoords } from '../types'
import { validateIsInSantaBarbaraCounty } from './validators'

export const checkAndSetUserLocation = (
  setCoords: Dispatch<SetStateAction<SantaBarbaraCountyCoords>>,
): void => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position: GeolocationPosition): void => {
        const { coords } = position

        const coordsToSave: SantaBarbaraCountyCoords = Object.defineProperties(
          coords,
          {
            isInSBCounty: {
              // below value for development ONLY
              // value: true,
              value: validateIsInSantaBarbaraCounty(coords),
              enumerable: true,
            },
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
      },
      error =>
        console.error(`Error while getting browser location: ${error.message}`),
    )
  } else
    console.error('Enable location permission to use location-based features.')
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
