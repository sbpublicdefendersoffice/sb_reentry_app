export interface RouteInfo {
  title_english: string
  title_spanish: string
  route: string
  imgPath?: string
}

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
    imgPath: './icons/medical.svg',
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
    imgPath: './icons/directory.svg',
  },
  {
    title_english: 'Legal Services',
    title_spanish: 'Servicios Jurídicos',
    route: '/legalservices',
    imgPath: './icons/legal.svg',
  },
  {
    title_english: 'Community Support',
    title_spanish: 'Soporte Comunitario',
    route: '/communitysupport',
    imgPath: './icons/community.svg',
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
    title_english: '72 Hour Checklist',
    title_spanish: 'Lista de verificación de 72 horas',
    route: '/checklist',
  },
  {
    title_english: 'Success Stories',
    title_spanish: 'Historias de éxito',
    route: '/successstories',
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
