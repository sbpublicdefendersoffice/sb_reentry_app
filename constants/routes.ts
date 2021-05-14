import { RouteInfo, InfoWithDescription } from '../types/routes'

export const resourceRoutes: RouteInfo[] = [
  {
    title_english: 'Food',
    title_spanish: 'Comida',
    route: '/food',
    imgPath: './icons/food.svg',
  },
  {
    title_english: 'Medical Support',
    title_spanish: 'Atención Médica',
    route: '/medicalsupport',
    imgPath: './icons/medicalsupport.svg',
  },
  {
    title_english: 'Transportation',
    title_spanish: 'Transporte',
    route: '/transportation',
    imgPath: './icons/transportation.svg',
  },
  {
    title_english: 'Mental Health',
    title_spanish: 'Salud Mental',
    route: '/mentalhealth',
    imgPath: './icons/mentalhealth.svg',
  },
  {
    title_english: 'Social Services',
    title_spanish: 'Servicios Sociales',
    route: '/socialservices',
    imgPath: './icons/socialservices.svg',
  },
  {
    title_english: 'Clothing',
    title_spanish: 'Ropa',
    route: '/clothing',
    imgPath: './icons/clothing.svg',
  },
  {
    title_english: 'Resource Directory',
    title_spanish: 'Directorio de Recursos',
    route: '/resourcedirectory',
    imgPath: './icons/resourcedirectory.svg',
  },
  {
    title_english: 'Legal Services',
    title_spanish: 'Servicios Jurídicos',
    route: '/legalservices',
    imgPath: './icons/legalservices.svg',
  },
  {
    title_english: 'Community Support',
    title_spanish: 'Soporte Comunitario',
    route: '/communitysupport',
    imgPath: './icons/communitysupport.svg',
  },
  {
    title_english: 'Employment',
    title_spanish: 'Empleo',
    route: '/employment',
    imgPath: './icons/employment.svg',
  },
  {
    title_english: 'Housing',
    title_spanish: 'Alojamiento',
    route: '/housing',
    imgPath: './icons/housing.svg',
  },
  {
    title_english: 'Substance Use',
    title_spanish: 'Uso de Sustancias',
    route: '/substanceuse',
    imgPath: './icons/substanceuse.svg',
  },
]

export const staticPageRoutes: RouteInfo[] = [
  {
    title_english: 'Resource Checklist',
    title_spanish: 'Lista de recursos',
    route: '/checklist',
  },
  {
    title_english: 'Thrive Stories',
    title_spanish: 'Historias de éxito',
    route: '/thrivestories',
  },
  {
    title_english: 'Know Your Rights',
    title_spanish: 'Conoce tus derechos',
    route: '/knowyourrights',
  },
  {
    title_english: 'About Us',
    title_spanish: 'Sobre nosotros',
    route: '/aboutus',
  },
]

export const letUsHelpRoutes: RouteInfo[] = [
  {
    title_english: 'Specialty Courts',
    title_spanish: 'Tribunales de especialidades',
    route: '/specialtycourts/areyouaclient',
    imgPath: './icons/specialtycourts.svg',
  },
  {
    title_english: 'Do I qualify for diversion?',
    title_spanish: '¿Califico para el desvío?',
    route: '/diversion/areyouaclient',
    imgPath: './icons/diversion.svg',
  },
  {
    title_english: 'Clear my record',
    title_spanish: 'Limpiar mi registro',
    route: '/clearmyrecord',
    imgPath: './icons/clearmyrecord.svg',
  },
  {
    title_english: 'Documents you may need',
    title_spanish: 'Documentos que puede necesitar',
    route: '/documents',
    imgPath: './icons/documents.svg',
  },
  {
    title_english: 'Pre-arraignment preparation',
    title_spanish: 'Preparación previa a la lectura de cargos',
    route: '/prearraignment',
    imgPath: './icons/prearraignment.svg',
  },
  {
    title_english: 'Common Legal Terms',
    title_spanish: 'Términos legales comunes',
    route: '/legalterms',
    imgPath: './icons/legalterms.svg',
  },

  {
    title_english: 'Recommended Resources',
    title_spanish: 'Recursos recomendados',
    route: '/recommendedresources',
    imgPath: './icons/recommendedresources.svg',
  },
  {
    title_english: 'Family Resources',
    title_spanish: 'Recursos familiares',
    route: '/familyresources',
    imgPath: './icons/familyresources.svg',
  },
  {
    title_english: 'Resources for Women',
    title_spanish: 'Recursos para mujeres',
    route: '/resourcesforwomen',
    imgPath: './icons/resourcesforwomen.svg',
  },
]
export const PrivacyPolicyRoute: RouteInfo[] = [
  {
    title_english: 'Privacy Policy',
    title_spanish: 'política de privacidad',
    route: '/privacypolicy',
  },
]
export const topThreeRoutes: InfoWithDescription[] = [
  {
    title_english: 'Behavioral Wellness',
    title_spanish: 'Bienestar conductual',
    text_english:
      'Behavioral Wellness is the hub for mental health services in Santa Barbara County',
    text_spanish:
      'Línea de Acceso para Servicios y Crisis, Gratuito y Disponible las 24 Horas del Día',
    route: '/search/recncoC6502aH2qYs',
    imgPath: './icons/phone.svg',
  },
  {
    title_english: "Santa Barbara Public Defender's Office",
    title_spanish: 'Oficina del Defensor Público de Santa Bárbara',
    text_english:
      'The Office of the Public Defender exists to provide legal services to those persons who qualify for assistance, including the indigent and unhoused.',
    text_spanish:
      'La Oficina del Defensor Público existe para brindar servicios legales a aquellas personas que califican para recibir asistencia, incluidos los indigentes y los que no tienen vivienda.',
    route: '/search/recD8lFn9X48GfcaS',
    imgPath: './icons/prearraignment.svg',
  },
  {
    title_english: 'Probation Report and Resource Center (PRRC)',
    title_spanish:
      'Centro de recursos e informes de libertad condicional (PRRC)',
    text_english:
      'The PRRC is an excellent source for information on probation requirements, reporting and many other topics',
    text_spanish:
      'El PRRC es una excelente fuente de información sobre los requisitos de libertad condicional, informes y muchos otros temas',
    route: '/search/rec5sVCDDkpXlclv0',
    imgPath: './icons/clearmyrecord.svg',
  },
]
