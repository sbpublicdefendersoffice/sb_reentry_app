import { Dispatch, SetStateAction } from 'react'
import { coordsString } from '../constants/maps'

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
            accuracy: { value: coords.accuracy, enumerable: true },
            altitude: { value: coords.altitude, enumerable: true },
            altitudeAccuracy: {
              value: coords.altitudeAccuracy,
              enumerable: true,
            },
            heading: { value: coords.heading, enumerable: true },
            latitude: { value: coords.latitude, enumerable: true },
            longitude: { value: coords.longitude, enumerable: true },
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
