// import { useEffect, useState } from 'react'
import ReactMapboxGL, { Marker } from 'react-mapbox-gl'

import styles from './MapAlt.module.css'

type LocationInfo = { latitude: number; longitude: number }

interface MapAltProps {
  latLongInfo: LocationInfo[]
}

// interface MapSize {
//   width: number
//   height: number
// }

const MapboxMap = ReactMapboxGL({
  accessToken: process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN,
})
const mapboxStylingURL: string = 'mapbox://styles/mapbox/streets-v11'

const MapAlt = ({ latLongInfo }: MapAltProps) => {
  const summedLatAndLong: LocationInfo = latLongInfo.reduce(
    (total: LocationInfo, currentValue: LocationInfo) => ({
      latitude: total.latitude + currentValue.latitude,
      longitude: total.longitude + currentValue.longitude,
    }),
    { latitude: 0, longitude: 0 },
  )

  const numOfLocations: number = latLongInfo.length

  // #region
  // const [mapComputedSize, setMapComputedSize] = useState<MapSize>({
  //   width: 0,
  //   height: 0,
  // })

  // useEffect(() => {
  //   const addressInfoNode: HTMLElement = document.getElementById('LocationInfo')

  //   const computeAndSetMapSize = () => {
  //     if (addressInfoNode) {
  //       const { offsetWidth, offsetHeight } = addressInfoNode
  //       setMapComputedSize({ width: offsetWidth, height: offsetHeight })
  //     }
  //   }

  //   addEventListener('resize', computeAndSetMapSize)

  //   return () => removeEventListener('resize', computeAndSetMapSize)
  // }, [])
  // #endregion
  return (
    <div
      className={styles.Map}
      style={{
        height: '25rem',
        width: '100%',
      }}
    >
      <MapboxMap
        className={styles.MapBox}
        style={mapboxStylingURL}
        zoom={[8]}
        containerStyle={{
          height: '100%',
          width: '100%',
        }}
        center={[
          summedLatAndLong.longitude / numOfLocations,
          summedLatAndLong.latitude / numOfLocations,
        ]}
      >
        {numOfLocations &&
          latLongInfo.map((coords: LocationInfo, i: number) => {
            const { longitude, latitude } = coords
            return (
              <Marker
                key={i}
                coordinates={[longitude, latitude]}
                anchor="bottom"
              >
                <img src="/images/heart.svg" className={styles.Pin} />
              </Marker>
            )
          })}
      </MapboxMap>
    </div>
  )
}

export default MapAlt
