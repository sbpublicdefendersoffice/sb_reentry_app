import { useRouter } from 'next/router'
import { Fragment, useState, useEffect } from 'react'

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
  useLocationFilters,
  useGlobalSearch,
  useView,
  useResizeEvent,
} from '../hooks'
import { MapMarker, CityFilter, ProximityFilter } from './'
import { Details } from '../ui'
import { PGOrgPlusLocation, WindowSize } from '../types'
import styles from './DisplayMap.module.css'

interface DisplayMapProps {
  latLongInfo: PGOrgPlusLocation[]
}

const DisplayMap = ({ latLongInfo }: DisplayMapProps) => {
  const [mapState, setMap] = useState<Map | null>(null)
  const [windowSize, setWindowSize] = useState<WindowSize>({
    width: innerWidth,
    height: innerHeight,
  })
  useResizeEvent(() =>
    setWindowSize({
      width: innerWidth,
      height: innerHeight,
    }),
  )
  const { pathname } = useRouter()
  const { isMapView } = useView()

  const { searchResults } = useGlobalSearch()
  const { language } = useLanguage()
  const { coords } = useLocation()
  const { locRecordsToFilter, setLocRecordsToFilter } = useLocationFilters()
  const { fitBoundsArr, centerArr, zoom } = useMapInfo(
    locRecordsToFilter?.filteredRecords || latLongInfo,
  )
  useEffect(() => {
    let map: Map

    const loadMap = async () => {
      if (latLongInfo && zoom && fitBoundsArr && centerArr) {
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
  }, [mapState, fitBoundsArr, centerArr, zoom])

  // Below effect is to clear map when new data is fetched due to new global data fetch or changing the language
  useEffect(
    () =>
      setLocRecordsToFilter({
        filterName: NEW_DATA,
      }),
    [language, searchResults],
  )
  const showFilters: boolean = !pathname.endsWith('[id]')
  const isInSBCounty: boolean = coords?.isInSBCounty
  const filteredRecordsReady: boolean = Boolean(
    locRecordsToFilter?.filteredRecords && mapState?.loaded,
  )

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
      className={
        windowSize.width < 1275 && !showFilters
          ? styles.DisplayMapMobile
          : showFilters && isMapView
          ? styles.DisplayMapMobile
          : styles.DisplayMap
      }
    >
      <div id="map" style={mapContainerStyle}>
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
    </Details>
  )
}
export default DisplayMap
