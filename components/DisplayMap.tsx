import { Fragment, Dispatch, SetStateAction } from 'react'
import ReactMapboxGL, { ScaleControl } from 'react-mapbox-gl'

import { mapboxStylingURL, mapContainerStyle, ENGLISH } from '../constants'
import { useMapInfo, useLanguage, useLocation } from '../hooks'
import { validateIsInSantaBarbaraCounty } from '../helpers/validators'
import { MapMarker, CityFilter } from './'
import { Details } from '../ui'

import { LocationRecord } from '../types/records'

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
  const { coords } = useLocation()

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
          style={mapboxStylingURL}
          containerStyle={mapContainerStyle}
          center={centerArr}
          fitBounds={fitBoundsArr}
          animationOptions={{ animate: false }}
          zoom={[zoom]}
        >
          {Boolean(coords) && validateIsInSantaBarbaraCounty(coords) && (
            <MapMarker
              locationRecord={{
                longitude: coords.longitude,
                latitude: coords.latitude,
                single_category: 'user',
                multiple_categories: ['user'],
                uuid: '',
                name: language === ENGLISH ? 'Your location' : 'Tu ubicación',
              }}
            />
          )}
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
