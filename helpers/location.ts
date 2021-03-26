import { Dispatch, SetStateAction } from 'react'

import { VisibilityAsArray } from '../types'

export const checkAndSetUserLocation = (
  setCoords: Dispatch<SetStateAction<GeolocationCoordinates>>,
): void => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position: GeolocationPosition): void => {
        const { coords } = position

        const coordsToSave: GeolocationCoordinates = Object.defineProperties(
          coords,
          {
            // Below values for development ONLY
            // longitude: { value: -119.69688092013844, enumerable: true },
            // latitude: { value: 34.40553099684989, enumerable: true },
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
const toRadian = angle => (Math.PI / 180) * angle
const distance = (a, b) => (Math.PI / 180) * (a - b)

export const isDistanceInBounds = (
  [lat1, lon1]: number[],
  [lat2, lon2]: number[],
  limit: number,
): boolean => {
  const RADIUS_OF_EARTH_IN_MILES = 3958.8

  const dLat = distance(lat2, lat1)
  const dLon = distance(lon2, lon1)

  lat1 = toRadian(lat1)
  lat2 = toRadian(lat2)

  // Haversine Formula
  const a =
    Math.pow(Math.sin(dLat / 2), 2) +
    Math.pow(Math.sin(dLon / 2), 2) * Math.cos(lat1) * Math.cos(lat2)
  const c = 2 * Math.asin(Math.sqrt(a))

  const finalDistance = RADIUS_OF_EARTH_IN_MILES * c

  const isInBounds: boolean = finalDistance <= limit

  return isInBounds
}

export const isRegionVisible = (region: VisibilityAsArray): boolean => region[1]
