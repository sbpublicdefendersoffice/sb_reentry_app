import { CountyBreakdown, BoundingArr } from '../types/maps'

export const coordsString: string = 'coords'

export const mapboxStylingURL: string = 'mapbox://styles/mapbox/streets-v11'

export const mapContainerStyle: { [name: string]: string } = {
  height: '100%',
  width: '100%',
}

export const fitBoundsArr: BoundingArr = [
  [-120.5723618, 34.3953777],
  [-119.5136408, 34.9733403],
]

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
