export const mapboxStylingURL: string = 'mapbox://styles/mapbox/streets-v11'

export const mapContainerStyle: { [name: string]: string } = {
  height: '100%',
  width: '100%',
}

type CountyBreakdown = {
  south: string[]
  central: string[]
  north: string[]
}

export const citiesByCountyRegion: CountyBreakdown = {
  south: [
    'Carpinteria',
    'Goleta',
    'Isla Vista',
    'Montecito',
    'Santa Barbara',
    'Summerland',
  ],
  central: ['Buellton', 'Lompoc', 'New Cuyama', 'Santa Ynez', 'Solvang'],
  north: ['Guadalupe', 'Los Alamos', 'Orcutt', 'Santa Maria'],
}
