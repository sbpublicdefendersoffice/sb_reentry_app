import { useEffect, useState } from 'react'
import { fitBoundsArr } from '../constants/maps'

import {
  LocationInfo,
  CenterArr,
  BoundingArr,
  LocationState,
  LocationRecord,
} from '../types'

const latToMile: number = 69.2

const defaultLocationState: LocationState = {
  fitBoundsArr,
  centerArr: [-120.05238901434026, 34.762449495215634],
  zoom: 8.5,
}

const useMapInfo = (latLongInfo: LocationRecord[]) => {
  const [mapInfo, setMapInfo] = useState<LocationState>(defaultLocationState)

  useEffect(() => {
    if (latLongInfo?.length) {
      const summedLatAndLong: LocationInfo = latLongInfo.reduce(
        (total: LocationInfo, currentValue: LocationInfo) => {
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
        spread === 0 ? 15 : spread >= 1 && spread <= 5 ? 10.5 : 8.5

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
