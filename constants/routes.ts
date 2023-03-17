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
  {
    title_english: 'Court Preparation',
    title_spanish: 'Preparación de la Corte',
    route: './letushelp/prearraignment',
    imgPath: './icons/documents.svg',
  },
  {
    title_english: 'Public Defender Service',
    title_spanish: 'Servicio de Defensoría Pública',
    route: './letushelp',
    imgPath: './icons/specialtycourts.svg',
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
    title_english: 'About Us',
    title_spanish: 'Sobre nosotros',
    route: '/aboutus',
  },
  {
    title_english: 'Favorites',
    title_spanish: 'Favoritas',
    route: '/favorites',
  },
  {
    title_english: 'Fresh Start',
    title_spanish: 'Nuevo Comienzo',
    route: '/freshstart',
  },
  {
    title_english: 'Login',
    title_spanish: 'Acceso',
    route: '/login',
  },
]

export const letUsHelpRoutes: RouteInfo[] = [
  {
    title_english: 'Specialty Courts',
    title_spanish: 'Tribunales de especialidades',
    route: '/letushelp/specialtycourts',
    imgPath: './icons/specialtycourts.svg',
  },
  {
    title_english: 'Do I qualify for diversion?',
    title_spanish: '¿Califico para el desvío?',
    route: '/letushelp/diversion',
    imgPath: './icons/diversion.svg',
  },
  {
    title_english: 'Clear my record',
    title_spanish: 'Limpiar mi registro',
    route: '/freshstart',
    imgPath: './icons/clearmyrecord.svg',
  },
  {
    title_english: 'Documents you may need',
    title_spanish: 'Documentos que puede necesitar',
    route: '/letushelp/documents',
    imgPath: './icons/documents.svg',
  },
  {
    title_english: 'Pre-arraignment preparation',
    title_spanish: 'Preparación previa a la lectura de cargos',
    route: '/letushelp/prearraignment',
    imgPath: './icons/prearraignment.svg',
  },
  {
    title_english: 'Common Legal Terms',
    title_spanish: 'Términos legales comunes',
    route: '/letushelp/legalterms',
    imgPath: './icons/legalterms.svg',
  },

  {
    title_english: 'Recommended Resources',
    title_spanish: 'Recursos recomendados',
    route: '/letushelp/recommendedresources',
    imgPath: './icons/recommendedresources.svg',
  },
  {
    title_english: 'Family Resources',
    title_spanish: 'Recursos familiares',
    route: '/letushelp/familyresources',
    imgPath: './icons/familyresources.svg',
  },
  {
    title_english: 'Resources for Women',
    title_spanish: 'Recursos para mujeres',
    route: '/letushelp/resourcesforwomen',
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
    route: '/orgs/1142',
    imgPath: './icons/phone.svg',
  },
  {
    title_english: "Santa Barbara Public Defender's Office",
    title_spanish: 'Oficina del Defensor Público de Santa Bárbara',
    text_english:
      'The Office of the Public Defender exists to provide legal services to those persons who qualify for assistance, including the indigent and unhoused.',
    text_spanish:
      'La Oficina del Defensor Público existe para brindar servicios legales a aquellas personas que califican para recibir asistencia, incluidos los indigentes y los que no tienen vivienda.',
    route: '/orgs/1069',
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
    route: '/orgs/1072',
    imgPath: './icons/clearmyrecord.svg',
  },
]
export const CourtSupportRoutes: RouteInfo[] = [
  {
    title_english: 'Diversion Programs',
    title_spanish: 'Programas de desvío',
    route: '/letushelp/diversion',
  },
  {
    title_english: 'Specialty Courts',
    title_spanish: 'Tribunales de especialidades',
    route: '/letushelp/specialtycourts',
  },
  {
    title_english: 'Odyssey Portal',
    title_spanish: 'Odyssey Portal',
    route: 'https://portal.sbcourts.org/CASBPORTAL/',
  },
  {
    title_english: 'Public Defender Services',
    title_spanish: 'Servicios de defensa pública',
    route: '/orgs/1069',
  },
  {
    title_english: 'Helping prepare for court',
    title_spanish: 'Ayudando a prepararse para la corte',
    route: '/letushelp/prearraignment',
  },
  {
    title_english: 'Legal terms to know',
    title_spanish: 'Términos legales a conocer',
    route: '/letushelp/legalterms',
  },
]
export const ResourcesSupportRoutes: RouteInfo[] = [
  {
    title_english: 'Resource Checklist',
    title_spanish: 'Soporte de recursos',
    route: '/checklist',
  },
  {
    title_english: 'Support for Women',
    title_spanish: 'Apoyo a las mujeres',
    route: '/letushelp/resourcesforwomen',
  },
  {
    title_english: 'Support for families',
    title_spanish: 'Apoyo a las familias',
    route: '/letushelp/familyresources',
  },
  {
    title_english: 'Highly Recommended Resources',
    title_spanish: 'Recursos altamente recomendados',
    route: '/letushelp/recommendedresources',
  },
  {
    title_english: 'Know Your Rights',
    title_spanish: 'Conoce tus derechos',
    route: '/knowyourrights',
  },
  {
    title_english: 'FAQ',
    title_spanish: 'FAQ',
    route: '/faq',
  },
]
export const LoginRoute: RouteInfo[] = [
  {
    title_english: 'Login',
    title_spanish: 'Acceso',
    route: '/login',
  },
]
export const SignupRoute: RouteInfo[] = [
  {
    title_english: 'Sign Up',
    title_spanish: 'Inscribirse',
    route: '/signup',
  },
]
export const VerifyEmailRoute: RouteInfo[] = [
  {
    title_english: 'Verify Email',
    title_spanish: 'Verify Email',
    route: '/verifyemail',
  },
]
export const VerifyEmailWithIDRoute: RouteInfo[] = [
  {
    title_english: 'Verify Email',
    title_spanish: 'Verify Email',
    route: '/verifyemail/:verificationString',
  },
]
export const ResetPasswordWithIDRoute: RouteInfo[] = [
  {
    title_english: 'Verify Email',
    title_spanish: 'Verify Email',
    route: '/forgotpassword/:passwordResetCode',
  },
]
