import { useReducer, Reducer } from 'react'

import { citiesByCountyRegion } from '../constants/maps'
import { isRegionVisible } from '../helpers/location'
import {
  FilterMapAction,
  FilteredMapState,
  CountyVisibilityFilter,
  VisibilityAsArray,
  LocationRecord,
} from '../types'

const manageFilteredMapState = (
  state: FilteredMapState,
  action: FilterMapAction,
) => {
  let { filteredRecords, visibility, radiusDistance } = state

  const { filterName, value, locationsToFilter } = action

  if (filterName === 'newData') {
    filteredRecords = null
    visibility = value as CountyVisibilityFilter
  }

  //#region regionVisibility logic

  if (filterName === 'regionVisibility') {
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
        (record: LocationRecord) => !citiesToRemove.includes(record.city),
      )
      visibility = value as CountyVisibilityFilter
    }
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
    radiusDistance: Infinity,
  })

  return { locRecordsToFilter, setLocRecordsToFilter }
}

export default useSearchFilters
