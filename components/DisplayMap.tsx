import { Fragment } from 'react'
import ReactMapboxGL, { ScaleControl } from 'react-mapbox-gl'

import { mapboxStylingURL, mapContainerStyle } from '../constants/maps'
import useMapInfo from '../hooks/useMapInfo'
import MapMarker from './MapMarker'

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
    <div className={styles.DisplayMap}>
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
            latLongInfo.map((locationRecord: LocationRecord, i: number) => (
              <Fragment key={i}>
                <MapMarker locationRecord={locationRecord} />
              </Fragment>
            ))}
          <ScaleControl measurement="mi" position="top-right" />
        </MapboxMap>
      }
    </div>
  )
}

export default DisplayMap
