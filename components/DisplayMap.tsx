import { useRouter } from 'next/router'
import { Fragment, useEffect } from 'react'
import ReactMapboxGL, { ScaleControl } from 'react-mapbox-gl'

import {
  mapboxStylingURL,
  mapContainerStyle,
  ENGLISH,
  allRegionsVisible,
  NEW_DATA,
} from '../constants'
import {
  useMapInfo,
  useLanguage,
  useLocation,
  useSearchFilters,
  useGlobalSearch,
} from '../hooks'
import { validateIsInSantaBarbaraCounty } from '../helpers'
import { MapMarker, CityFilter } from './'
import { Details } from '../ui'

import { LocationRecord } from '../types'

import styles from './DisplayMap.module.css'

interface DisplayMapProps {
  latLongInfo: LocationRecord[]
}

const returnMarker = (locationRecord: LocationRecord, i: number) => (
  <Fragment key={i}>
    <MapMarker locationRecord={locationRecord} />
  </Fragment>
)

const MapboxMap = ReactMapboxGL({
  accessToken: process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN,
})

const DisplayMap = ({ latLongInfo }: DisplayMapProps) => {
  const { pathname } = useRouter()
  const { searchResults } = useGlobalSearch()
  const { language } = useLanguage()
  const { coords } = useLocation()
  const { locRecordsToFilter, setLocRecordsToFilter } = useSearchFilters()
  const { fitBoundsArr, centerArr, zoom } = useMapInfo(
    locRecordsToFilter?.filteredRecords || latLongInfo,
  )

  useEffect(
    () =>
      setLocRecordsToFilter({
        filterName: NEW_DATA,
        value: allRegionsVisible,
      }),
    [language, searchResults],
  )

  const userLocationReady: boolean =
    coords && validateIsInSantaBarbaraCounty(coords)

  const filteredRecordsReady: boolean = Boolean(
    locRecordsToFilter?.filteredRecords?.length,
  )
  const showFilters: boolean = !pathname.endsWith('[id]')

  return (
    <Details
      open
      summary={language === ENGLISH ? 'Map' : 'Mapa'}
      className={styles.DisplayMap}
    >
      {showFilters && (
        <CityFilter
          latLongInfo={latLongInfo}
          regionVisibility={locRecordsToFilter.visibility}
          setLocRecordsToFilter={setLocRecordsToFilter}
        />
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
          {userLocationReady && (
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
          {filteredRecordsReady
            ? locRecordsToFilter.filteredRecords.map(returnMarker)
            : latLongInfo.map(returnMarker)}
          <ScaleControl measurement="mi" position="bottom-right" />
        </MapboxMap>
      }
    </Details>
  )
}

export default DisplayMap
