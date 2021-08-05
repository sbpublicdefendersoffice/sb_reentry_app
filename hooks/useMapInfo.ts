import { useEffect, useState } from 'react'
import { fitBoundsArr, centerArr } from '../constants/maps'

import {
  LocationInfo,
  CenterArr,
  BoundingArr,
  LocationState,
  PGOrgPlusLocation,
} from '../types'

const latToMile: number = 69.2

const defaultLocationState: LocationState = {
  fitBoundsArr,
  centerArr,
  zoom: 8.5,
}

const useMapInfo = (latLongInfo: PGOrgPlusLocation[]) => {
  const [mapInfo, setMapInfo] = useState<LocationState>(defaultLocationState)

  useEffect(() => {
    if (latLongInfo?.length) {
      const summedLatAndLong: LocationInfo = latLongInfo.reduce(
        (total: LocationInfo, currentValue: PGOrgPlusLocation) => {
          total.latArr.push(currentValue.latitude)
          total.longArr.push(currentValue.longitude)
          return {
            ...total,
            latitude: total.latitude + currentValue.latitude,
            longitude: total.longitude + currentValue.longitude,
          }
        },
        { latitude: 0, longitude: 0, latArr: [], longArr: [] },
      )

      const numOfLocations: number = latLongInfo.length

      const centerArr: CenterArr = [
        summedLatAndLong.longitude / numOfLocations,
        summedLatAndLong.latitude / numOfLocations,
      ]

      const minLat: number = Math.min(...summedLatAndLong.latArr)
      const maxLat: number = Math.max(...summedLatAndLong.latArr)

      const spread: number = Math.round(maxLat * latToMile - minLat * latToMile)
      const zoom: number =
        spread === 0 ? 15 : spread >= 1 && spread <= 5 ? 10.5 : 7

      const fitBoundsArr: BoundingArr = [
        [Math.min(...summedLatAndLong.longArr), minLat],
        [Math.max(...summedLatAndLong.longArr), maxLat],
      ]

      setMapInfo({ fitBoundsArr, centerArr, zoom })
    } else setMapInfo(defaultLocationState)
  }, [latLongInfo])

  return mapInfo
}

export default useMapInfo
