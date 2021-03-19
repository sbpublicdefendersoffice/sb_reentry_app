import { Fragment, Dispatch, SetStateAction } from 'react'
import ReactMapboxGL, { ScaleControl } from 'react-mapbox-gl'

import { mapboxStylingURL, mapContainerStyle } from '../constants/maps'
import useMapInfo from '../hooks/useMapInfo'
import { MapMarker, CityFilter } from './'
import { Details } from '../ui'
import useLanguage from '../hooks/useLanguage'

import { LocationRecord } from '../types/records'
import { ENGLISH } from '../types/language'

import styles from './DisplayMap.module.css'

interface DisplayMapProps {
  latLongInfo: LocationRecord[]
  setLatLongInfo?: Dispatch<SetStateAction<LocationRecord[]>>
}

const MapboxMap = ReactMapboxGL({
  accessToken: process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN,
})

const DisplayMap = ({ latLongInfo, setLatLongInfo }: DisplayMapProps) => {
  const { language } = useLanguage()
  const { fitBoundsArr, centerArr, zoom } = useMapInfo(latLongInfo)

  return (
    <Details
      open
      summary={language === ENGLISH ? 'Map' : 'Mapa'}
      className={styles.DisplayMap}
    >
      {latLongInfo && setLatLongInfo && (
        <CityFilter latLongInfo={latLongInfo} setLatLongInfo={setLatLongInfo} />
      )}
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
          <ScaleControl measurement="mi" position="bottom-right" />
        </MapboxMap>
      }
    </Details>
  )
}

export default DisplayMap
