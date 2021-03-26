import { LocationRecord } from './records'

export interface CountyBreakdown {
  southCounty: string[]
  centralCounty: string[]
  northCounty: string[]
}
export interface PopupInfo {
  clientX: number
  clientY: number
}

export interface LocationInfo {
  latitude: number
  longitude: number
  latArr: number[]
  longArr: number[]
}

export type CenterArr = [number, number]

export type BoundingArr = [CenterArr, CenterArr]

export interface LocationState {
  fitBoundsArr: BoundingArr
  centerArr: CenterArr
  zoom: number
}

export interface UseLocationProps {
  coords: GeolocationCoordinates
  // eslint-disable-next-line no-unused-vars
  setCoords: (coords: GeolocationCoordinates) => void
}

export interface CountyVisibilityFilter {
  southCounty: boolean
  centralCounty: boolean
  northCounty: boolean
}

export interface FilteredMapState {
  filteredRecords: LocationRecord[] | null
  visibility: CountyVisibilityFilter
  radiusDistance: number
}

export interface FilterMapAction {
  filterName: 'regionVisibility' | 'radiusDistance' | 'newData'
  value: CountyVisibilityFilter | number
  locationsToFilter?: LocationRecord[]
}

export type VisibilityAsArray = [string, boolean]
