import ReactMapboxGL, { Marker, ScaleControl } from 'react-mapbox-gl'

import { mapboxStylingURL, mapContainerStyle } from '../constants/maps'
import useMapInfo from '../hooks/useMapInfo'

import { LocationInfo } from '../types/maps'
import { LocationRecord } from '../types/records'

import styles from './DisplayMap.module.css'

interface DisplayMapProps {
  latLongInfo: LocationRecord[]
}

const MapboxMap = ReactMapboxGL({
  accessToken: process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN,
})

const DisplayMap = ({ latLongInfo }: DisplayMapProps) => {
  const { fitBoundsArr, centerArr, zoom } = useMapInfo(latLongInfo)
  return (
    <div className={styles.Map}>
      {
        // @ts-ignore
        <MapboxMap
          className={styles.MapBox}
          style={mapboxStylingURL}
          containerStyle={mapContainerStyle}
          center={centerArr}
          fitBounds={fitBoundsArr}
          animationOptions={{ animate: false }}
          zoom={[zoom]}
        >
          {Boolean(latLongInfo.length) &&
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
          <ScaleControl measurement="mi" position="top-right" />
        </MapboxMap>
      }
    </div>
  )
}

export default DisplayMap
