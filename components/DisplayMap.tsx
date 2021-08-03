import { useRouter } from 'next/router'
import { Fragment, useEffect, useState } from 'react'
import type { Map } from 'mapbox-gl'

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

import { PGOrgPlusLocation } from '../types'

import styles from './DisplayMap.module.css'

interface DisplayMapProps {
  latLongInfo: PGOrgPlusLocation[]
  testWorkaround?: boolean
}

const DisplayMap = ({ latLongInfo, testWorkaround }: DisplayMapProps) => {
  const [mapState, setMap] = useState<Map | null>(null)

  const { pathname } = useRouter()
  const { searchResults } = useGlobalSearch()
  const { language } = useLanguage()
  const { coords } = useLocation()
  const { locRecordsToFilter, setLocRecordsToFilter } = useSearchFilters()
  const { fitBoundsArr, centerArr, zoom } = useMapInfo(
    locRecordsToFilter?.filteredRecords || latLongInfo,
  )
  useEffect(() => {
    let map: Map

    const loadMap = async () => {
      if (latLongInfo && !testWorkaround) {
        const { Map, ScaleControl } = await import('mapbox-gl')

        map = new Map({
          accessToken: process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN,
          container: 'map',
          style: mapboxStylingURL,
          center: centerArr,
          zoom,
        })

        map.fitBounds(fitBoundsArr)

        map.addControl(
          new ScaleControl({
            unit: 'imperial',
          }),
          'bottom-right',
        )

        setMap(map)
      }
    }
    loadMap()

    return () => map?.remove()
  }, [])

  useEffect(() => {
    if (mapState) {
      const tempMap: Map = mapState

      tempMap.fitBounds(fitBoundsArr)
      tempMap.setCenter(centerArr)
      tempMap.setZoom(zoom)

      setMap(tempMap)
    }
  }, [fitBoundsArr, centerArr, zoom])

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
    locRecordsToFilter?.filteredRecords && mapState?.loaded,
  )
  const showFilters: boolean = !pathname.endsWith('[id]')

  const returnMarker = (locationRecord: PGOrgPlusLocation, i: number) => (
    <Fragment key={i}>
      <MapMarker locationRecord={locationRecord} map={mapState} />
    </Fragment>
  )

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
        <div id="map" style={mapContainerStyle}>
          {isInSBCounty && (
            <MapMarker
              locationRecord={{
                city: '',
                longitude: coords.longitude,
                latitude: coords.latitude,
                single_category: 'user',
                multiple_categories: ['user'],
                id: 0,
                name_english: 'Your location',
                name_spanish: 'Tu ubicación',
              }}
              map={mapState}
              onTop
            />
          )}
          {filteredRecordsReady
            ? locRecordsToFilter.filteredRecords.map(returnMarker)
            : latLongInfo.map(returnMarker)}
        </div>
      )}
    </Details>
  )
}

export default DisplayMap
