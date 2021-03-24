import { Dispatch, SetStateAction } from 'react'

// Including centerArr values for development ONLY
import {
  coordsString,
  // centerArr
} from '../constants/maps'

export const checkAndSetUserLocation = (
  setCoords: Dispatch<SetStateAction<GeolocationCoordinates>>,
): void => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position: GeolocationPosition): void => {
        const { coords } = position
        setCoords(coords)

        const coordsToSave: GeolocationCoordinates = Object.defineProperties(
          coords,
          {
            // longitude: { value: centerArr[0], enumerable: true },
            // latitude: { value: centerArr[1], enumerable: true },
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
        localStorage.setItem(coordsString, JSON.stringify(coordsToSave))
      },
      error =>
        console.error(`Error while getting browser location: ${error.message}`),
    )
  } else
    console.error('Enable location permission to use location-based features.')
}
