import {
  foodServiceCopy,
  medicalsupportServiceCopy,
  transportationServiceCopy,
  mentalhealthServiceCopy,
  socialservicesServiceCopy,
  clothingServiceCopy,
  resourcedirectoryServiceCopy,
  legalservicesServiceCopy,
  communitysupportServiceCopy,
  employmentServiceCopy,
  housingServiceCopy,
  substanceuseServiceCopy,
} from './service-filter-data'
import { CopyHolder } from '../types/language'
export const categoryServiceFilter = {
  food: { foodServiceCopy },
  'medical support': { medicalsupportServiceCopy },
  transportation: { transportationServiceCopy },
  'mental health': { mentalhealthServiceCopy },
  'social services': { socialservicesServiceCopy },
  clothing: { clothingServiceCopy },
  'resource directory': { resourcedirectoryServiceCopy },
  'legal services': { legalservicesServiceCopy },
  'community support': { communitysupportServiceCopy },
  employment: { employmentServiceCopy },
  housing: { housingServiceCopy },
  'substance use': { substanceuseServiceCopy },
}

export const categoryCopy: CopyHolder = {
  english: {
    chooseFilters: 'Choose Filters Below',
    list: 'List',
    map: 'Map',
    filter: 'Filter',
    viewResults: 'View Results',
  },

  spanish: {
    chooseFilters: 'Elija filtros a continuación',
    list: 'Lista',
    map: 'Mapa',
    filter: 'Filtrar',
    viewResults: 'Ver resultados',
  },
}
export const getMatchingRecords = (allRecords, keywords) => {
  const filteredRecords = allRecords.records.filter(record =>
    keywords.some(keyword => {
      let orgTags = record.fields.org_tags.map(item => item.toLowerCase())
      return orgTags.includes(keyword.toLowerCase())
    }),
  )
  return { records: filteredRecords, category: allRecords.category }
}
