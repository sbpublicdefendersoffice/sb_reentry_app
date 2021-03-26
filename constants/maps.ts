import {
  CountyBreakdown,
  BoundingArr,
  CenterArr,
  CountyVisibilityFilter,
} from '../types/maps'

export const coordsString: string = 'coords'

export const mapboxStylingURL: string = 'mapbox://styles/mapbox/streets-v11'

export const mapContainerStyle: { [name: string]: string } = {
  height: '100%',
  width: '100%',
}

export const centerArr: CenterArr = [-120.05238901434026, 34.762449495215634]

export const fitBoundsArr: BoundingArr = [
  [-120.5723618, 34.3953777],
  [-119.5136408, 34.9733403],
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
