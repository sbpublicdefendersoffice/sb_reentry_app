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
        localStorage.setItem(coordsString, JSON.stringify(coords))
      },
      error =>
        console.error(`Error while getting browser location: ${error.message}`),
    )
  } else
    console.error('Enable location permission to use location-based features.')
}
