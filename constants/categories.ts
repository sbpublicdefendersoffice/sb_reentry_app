import { CopyHolder } from '../types/language'

const categories: { [route: string]: CopyHolder } = {
  '/food': {
    english: {
      category: 'Food',
    },
    spanish: {
      category: 'Comida',
    },
  },
  '/medicalsupport': {
    english: {
      category: 'Medical Support',
    },
    spanish: {
      category: 'Atención Médica',
    },
  },
  '/transportation': {
    english: {
      category: 'Transportation',
    },
    spanish: {
      category: 'Transporte',
    },
  },
  '/mentalhealth': {
    english: {
      category: 'Mental Health',
    },
    spanish: {
      category: 'Salud Mental',
    },
  },
  '/socialservices': {
    english: {
      category: 'Social Services',
    },
    spanish: {
      category: 'Servicios Sociales',
    },
  },
  '/clothing': {
    english: {
      category: 'Clothing',
    },
    spanish: {
      category: 'Ropa',
    },
  },
  '/resourcedirectory': {
    english: {
      category: 'Resource Directory',
    },
    spanish: {
      category: 'Directorio de Recursos',
    },
  },
  '/legalservices': {
    english: {
      category: 'Legal Services',
    },
    spanish: {
      category: 'Servicios Jurídicos',
    },
  },
  '/communitysupport': {
    english: {
      category: 'Community Support',
    },
    spanish: {
      category: 'Soporte Comunitario',
    },
  },
  '/employment': {
    english: {
      category: 'Employment',
    },
    spanish: {
      category: 'Empleo',
    },
  },
  '/housing': {
    english: {
      category: 'Housing',
    },
    spanish: {
      category: 'Alojamiento',
    },
  },
  '/substanceuse': {
    english: {
      category: 'Substance Use',
    },
    spanish: {
      category: 'Uso de Sustancias',
    },
  },
}

export default categories

export const backendCategories: Set<string> = new Set<string>([
  'family',
  'women',
  'food',
  'medical support',
  'transportation',
  'mental health',
  'social services',
  'clothing',
  'resource directory',
  'legal services',
  'community support',
  'employment',
  'housing',
  'substance use',
])
