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
    title_english: 'Home',
    title_spanish: 'Casa',
    route: '/',
  },
  {
    title_english: 'Thrive Stories',
    title_spanish: 'Historias de éxito',
    route: '/thrivestories',
  },
  {
    title_english: 'Court Support',
    title_spanish: 'Conoce tus derechos',
    route: '/courtsupport',
    itemOne_english: 'Diversion Programs',
    itemOne_spanish: 'Programas de desvío',
    itemOneRoute: '/letushelp/diversion/areyouaclient',
    itemTwo_english: 'Treatment Courts',
    itemTwo_spanish: 'Tribunal de tratamiento',
    itemTwoRoute: '/linktotreatment',
    itemThree_english: 'Odessy Portal',
    itemThree_spanish: 'Odessy Portal',
    itemThreeRoute:
      '/https://odysseyidentityprovider.tylerhost.net/idp/account/signin?ReturnUrl=%2fidp%2fissue%2fwsfed%3fwa%3dwsignin1.0%26wtrealm%3dhttps%253a%252f%252fportal.sbcourts.org%252fCASBPORTAL%252f%26wctx%3drm%253d0%2526id%253dpassive%2526ru%253d%25252fCASBPORTAL%25252faccount%25252flogin%26wct%3d2021-08-18T18%253a25%253a29Z%26wauth%3durn%253a18&wa=wsignin1.0&wtrealm=https%3a%2f%2fportal.sbcourts.org%2fCASBPORTAL%2f&wctx=rm%3d0%26id%3dpassive%26ru%3d%252fCASBPORTAL%252faccount%252flogin&wct=2021-08-18T18%3a25%3a29Z&wauth=urn%3a18',
    itemFour_english: 'Public Defender Services',
    itemFour_spanish: 'Servicios de defensa pública',
    itemFourRoute: '/search/1069',
    itemFive_english: 'Helping prepare for court',
    itemFive_spanish: 'Ayudando a prepararse para la corte',
    itemFiveRoute: '/letushelp/prearraignment',
    itemSix_english: 'Legal terms to know',
    itemSix_spanish: 'Términos legales a conocer',
    itemSixRoute: '/letushelp/legalterms',
  },
  {
    title_english: 'Resource Support',
    title_spanish: 'Soporte de recursos',
    route: '/resourcesupport',
    itemOne_english: 'Resource Checklist',
    itemOne_spanish: 'Lista de recursos',
    itemOneRoute: '/checklist',
    itemTwo_english: 'Support for Women',
    itemTwo_spanish: 'Apoyo a las mujeres',
    itemTwoRoute: '/letushelp/resourcesforwomen',
    itemThree_english: 'Support for families',
    itemThree_spanish: 'Apoyo a las familias',
    itemThreeRoute: '/letushelp/familyresources',
    itemFour_english: 'Highly Recommended Resources',
    itemFour_spanish: 'Recursos altamente recomendados',
    itemFourRoute: '/letushelp/recommendedresources',
    itemFive_english: 'Know Your Rights',
    itemFive_spanish: 'Conoce tus derechos',
    itemFiveRoute: '/knowyourrights',
    itemSix_english: 'FAQ',
    itemSix_spanish: 'FAQ',
    itemSixRoute: '/faq',
  },
  {
    title_english: 'About Us',
    title_spanish: 'Sobre nosotros',
    route: '/aboutus',
  },
  {
    title_english: 'Favorites',
    title_spanish: 'Favoritas',
    route: '/favorites',
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
    route: '/search/1142',
    imgPath: './icons/phone.svg',
  },
  {
    title_english: "Santa Barbara Public Defender's Office",
    title_spanish: 'Oficina del Defensor Público de Santa Bárbara',
    text_english:
      'The Office of the Public Defender exists to provide legal services to those persons who qualify for assistance, including the indigent and unhoused.',
    text_spanish:
      'La Oficina del Defensor Público existe para brindar servicios legales a aquellas personas que califican para recibir asistencia, incluidos los indigentes y los que no tienen vivienda.',
    route: '/search/1069',
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
    route: '/search/1072',
    imgPath: './icons/clearmyrecord.svg',
  },
]
