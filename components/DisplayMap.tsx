import { Fragment } from 'react'
import ReactMapboxGL, { ScaleControl } from 'react-mapbox-gl'

import { mapboxStylingURL, mapContainerStyle } from '../constants/maps'
import useMapInfo from '../hooks/useMapInfo'
import MapMarker from './MapMarker'
import { Details } from '../ui'
import useLanguage from '../hooks/useLanguage'

import { LocationRecord } from '../types/records'

import styles from './DisplayMap.module.css'

interface DisplayMapProps {
  latLongInfo: LocationRecord[]
  page: 'search' | 'org'
}

const MapboxMap = ReactMapboxGL({
  accessToken: process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN,
})

const DisplayMap = ({ latLongInfo, page }: DisplayMapProps) => {
  const { language } = useLanguage()
  const { fitBoundsArr, centerArr, zoom } = useMapInfo(latLongInfo)

  return (
    <Details
      open
      summary={language === 'english' ? 'Map' : 'Mapa'}
      className={`${styles.DisplayMap} 
      ${page === 'search' ? styles.SearchPageSize : ''}`}
    >
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
          {Boolean(latLongInfo?.length) &&
            latLongInfo.map((locationRecord: LocationRecord, i: number) => (
              <Fragment key={i}>
                <MapMarker locationRecord={locationRecord} />
              </Fragment>
            ))}
          <ScaleControl measurement="mi" position="top-right" />
        </MapboxMap>
      }
    </Details>
  )
}

export default DisplayMap
