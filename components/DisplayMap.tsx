import { useRouter } from 'next/router'
import { Fragment, useReducer, Reducer } from 'react'
import ReactMapboxGL, { ScaleControl } from 'react-mapbox-gl'

import { mapboxStylingURL, mapContainerStyle, ENGLISH } from '../constants'
import { useMapInfo, useLanguage, useLocation } from '../hooks'
import {
  validateIsInSantaBarbaraCounty,
  manageFilteredMapState,
} from '../helpers'
import { MapMarker, CityFilter } from './'
import { Details } from '../ui'

import { LocationRecord, FilterMapAction, FilteredMapState } from '../types'

import styles from './DisplayMap.module.css'

interface DisplayMapProps {
  latLongInfo: LocationRecord[]
}

const MapboxMap = ReactMapboxGL({
  accessToken: process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN,
})

const DisplayMap = ({ latLongInfo }: DisplayMapProps) => {
  const { pathname } = useRouter()
  const { language } = useLanguage()
  const { coords } = useLocation()

  const [locRecordsToFilter, setLocRecordsToFilter] = useReducer<
    Reducer<FilteredMapState, FilterMapAction>
  >(manageFilteredMapState, {
    originalRecords: latLongInfo,
    filteredRecords: latLongInfo,
    visibility: { southCounty: true, centralCounty: true, northCounty: true },
    radiusDistance: Infinity,
  })

  const { fitBoundsArr, centerArr, zoom } = useMapInfo(
    locRecordsToFilter.filteredRecords,
  )

  const userLocationReady: boolean =
    coords && validateIsInSantaBarbaraCounty(coords)
  const recordsReady: boolean = Boolean(
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
          {recordsReady &&
            locRecordsToFilter.filteredRecords.map(
              (locationRecord: LocationRecord, i: number) => (
                <Fragment key={i}>
                  <MapMarker locationRecord={locationRecord} />
                </Fragment>
              ),
            )}
          <ScaleControl measurement="mi" position="bottom-right" />
        </MapboxMap>
      }
    </Details>
  )
}

export default DisplayMap
