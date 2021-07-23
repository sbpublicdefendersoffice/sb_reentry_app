import { useReducer, Reducer } from 'react'

import {
  citiesByCountyRegion,
  allRegionsVisible,
  NEW_DATA,
  REGION_VISIBILITY,
  RADIUS_DISTANCE,
} from '../constants/maps'
import { isRegionVisible, isDistanceInBounds } from '../helpers/location'
import {
  FilterMapAction,
  FilteredMapState,
  CountyVisibilityFilter,
  VisibilityAsArray,
  RadiusFilterInfo,
  PGOrgPlusLocation,
} from '../types'

const manageFilteredMapState = (
  state: FilteredMapState,
  action: FilterMapAction,
) => {
  let { filteredRecords, visibility, radiusDistance } = state

  const { filterName, value, locationsToFilter } = action

  if (filterName === NEW_DATA) {
    filteredRecords = null
    visibility = allRegionsVisible as CountyVisibilityFilter
    radiusDistance = 1000
  } else if (filterName === REGION_VISIBILITY) {
    const visibilityEntries: VisibilityAsArray[] = Object.entries(value)

    if (visibilityEntries.some(isRegionVisible)) {
      const citiesToRemove: string[] = visibilityEntries.reduce(
        (arrOfCities: string[], currentEntry: VisibilityAsArray): string[] => {
          const [region, visible] = currentEntry

          if (!visible)
            arrOfCities = [...arrOfCities, ...citiesByCountyRegion[region]]
          return arrOfCities
        },
        [],
      )

      filteredRecords = locationsToFilter.filter(
        (record: PGOrgPlusLocation) => !citiesToRemove.includes(record.city),
      )
      visibility = value as CountyVisibilityFilter
    }
  } else if (filterName === RADIUS_DISTANCE) {
    const { newRadiusDistance, coords } = value as RadiusFilterInfo

    const userLocationCoords: number[] = [coords.latitude, coords.longitude]

    filteredRecords = locationsToFilter.filter((record: PGOrgPlusLocation) => {
      const locCoords: number[] = [record.latitude, record.longitude]

      return isDistanceInBounds(
        userLocationCoords,
        locCoords,
        newRadiusDistance,
      )
    })

    radiusDistance = newRadiusDistance
  }

  return { filteredRecords, visibility, radiusDistance }
}

const useSearchFilters = () => {
  const [locRecordsToFilter, setLocRecordsToFilter] = useReducer<
    Reducer<FilteredMapState, FilterMapAction>
  >(manageFilteredMapState, {
    filteredRecords: null,
    visibility: {
      southCounty: true,
      centralCounty: true,
      northCounty: true,
    },
    radiusDistance: 1000,
  })

  return { locRecordsToFilter, setLocRecordsToFilter }
}

export default useSearchFilters
