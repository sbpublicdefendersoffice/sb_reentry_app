import { useRouter } from 'next/router'
import { Fragment, useEffect } from 'react'
import ReactMapboxGL, { ScaleControl } from 'react-mapbox-gl'

import {
  mapboxStylingURL,
  mapContainerStyle,
  ENGLISH,
  NEW_DATA,
} from '../constants'
import {
  useMapInfo,
  useLanguage,
  useLocation,
  useSearchFilters,
  useGlobalSearch,
} from '../hooks'
import { MapMarker, CityFilter, ProximityFilter } from './'
import { Details } from '../ui'

import { LocationRecord } from '../types'

import styles from './DisplayMap.module.css'

interface DisplayMapProps {
  latLongInfo: LocationRecord[]
  testWorkaround?: boolean
}

const returnMarker = (locationRecord: LocationRecord, i: number) => (
  <Fragment key={i}>
    <MapMarker locationRecord={locationRecord} />
  </Fragment>
)

const MapboxMap = ReactMapboxGL({
  accessToken: process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN,
})

const DisplayMap = ({ latLongInfo, testWorkaround }: DisplayMapProps) => {
  const { pathname } = useRouter()
  const { searchResults } = useGlobalSearch()
  const { language } = useLanguage()
  const { coords } = useLocation()
  const { locRecordsToFilter, setLocRecordsToFilter } = useSearchFilters()
  const { fitBoundsArr, centerArr, zoom } = useMapInfo(
    locRecordsToFilter?.filteredRecords || latLongInfo,
  )
  // Below effect is to clear map when new data is fetched due to new global data fetch or changing the language
  useEffect(
    () =>
      setLocRecordsToFilter({
        filterName: NEW_DATA,
      }),
    [language, searchResults],
  )

  const isInSBCounty: boolean = coords?.isInSBCounty

  const filteredRecordsReady: boolean = Boolean(
    locRecordsToFilter?.filteredRecords,
  )
  const showFilters: boolean = !pathname.endsWith('[id]')

  return (
    <Details
      role="main"
      open
      summary={language === ENGLISH ? 'Map' : 'Mapa'}
      className={styles.DisplayMap}
    >
      {showFilters && (
        <CityFilter
          locationsToFilter={latLongInfo}
          regionVisibility={locRecordsToFilter.visibility}
          setLocRecordsToFilter={setLocRecordsToFilter}
        >
          {isInSBCounty && (
            <ProximityFilter
              coords={coords}
              locationsToFilter={latLongInfo}
              setLocRecordsToFilter={setLocRecordsToFilter}
              radiusDistance={locRecordsToFilter.radiusDistance}
            />
          )}
        </CityFilter>
      )}
      {!testWorkaround && (
        // @ts-ignore
        <MapboxMap
          style={mapboxStylingURL}
          containerStyle={mapContainerStyle}
          center={centerArr}
          fitBounds={fitBoundsArr}
          animationOptions={{ animate: false }}
          zoom={[zoom]}
        >
          {isInSBCounty && (
            <MapMarker
              customStyle={{ zIndex: 8 }}
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
          {filteredRecordsReady
            ? locRecordsToFilter.filteredRecords.map(returnMarker)
            : latLongInfo.map(returnMarker)}
          <ScaleControl measurement="mi" position="bottom-right" />
        </MapboxMap>
      )}
    </Details>
  )
}

export default DisplayMap
