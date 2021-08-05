import {
  CountyBreakdown,
  BoundingArr,
  CenterArr,
  CountyVisibilityFilter,
  FilterTypes,
} from '../types/maps'

export const NEW_DATA: FilterTypes = 'newData'

export const RADIUS_DISTANCE: FilterTypes = 'radiusDistance'

export const REGION_VISIBILITY: FilterTypes = 'regionVisibility'

export const coordsString: string = 'coords'

export const mapboxStylingURL: string = 'mapbox://styles/mapbox/streets-v11'

export const mapContainerStyle: { [name: string]: string } = {
  width: '100%',
  height: 'var(--screen-minus-header)',
}

export const centerArr: CenterArr = [-120.05238901434026, 34.762449495215634]

export const fitBoundsArr: BoundingArr = [
  [-120.6759, 34.2826],
  [-119.2886, 35.128],
]

export const allRegionsVisible: CountyVisibilityFilter = {
  southCounty: true,
  centralCounty: true,
  northCounty: true,
}

export const citiesByCountyRegion: CountyBreakdown = {
  southCounty: [
    'Carpinteria',
    'Goleta',
    'Isla Vista',
    'Montecito',
    'Santa Barbara',
    'Summerland',
  ],
  centralCounty: ['Buellton', 'Lompoc', 'New Cuyama', 'Santa Ynez', 'Solvang'],
  northCounty: ['Guadalupe', 'Los Alamos', 'Orcutt', 'Santa Maria'],
}
