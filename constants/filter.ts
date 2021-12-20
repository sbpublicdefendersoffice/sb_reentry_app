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
  educationServiceCopy,
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
  education: { educationServiceCopy },
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
