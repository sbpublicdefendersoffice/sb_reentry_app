import { CopyHolder } from '../types/language'

export const siteTitle: string = 'Fresh Start Santa Barbara'

export const searchCopy: CopyHolder = {
  english: {
    search: 'Search',
    tooltip:
      'You can search by organization, keywords, address, city, zip code or service you need',
  },
  spanish: {
    search: 'Buscar',
    tooltip:
      'Puede buscar por organización, palabras clave, dirección, ciudad, código postal o servicio que necesita',
  },
}

export const inSantaBarbaraCopy: CopyHolder = {
  english: {
    true: `Looks like you're in Santa Barbara County. This means you'll be able to take advantage of all of ${siteTitle}'s region specific features.`,
    false: `Looks like you're not in Santa Barbara County. We're happy to show you services, but you will not be able to take advantage of all of ${siteTitle}'s region specific features.`,
  },
  spanish: {
    true: `Parece que estás en el condado de Santa Bárbara. Esto significa que podrá aprovechar todas
    de las características específicas de la región de ${siteTitle}.`,
    false: `Parece que no estás en el condado de Santa Bárbara. Nos complace mostrarle los servicios, pero no podrá aprovechar todas las características específicas de la región de ${siteTitle}.`,
  },
}
