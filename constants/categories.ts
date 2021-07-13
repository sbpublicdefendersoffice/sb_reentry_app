import { CopyHolder } from '../types/language'

const categories: { [route: string]: CopyHolder } = {
  '/food': {
    english: {
      category: 'Food',
      description:
        'Welcome to our food resources. We realize that your next meal is vital. Below you can find food resources that will help support you with your needs',
    },
    spanish: {
      category: 'Comida',
      description:
        'Welcome to our food resources. We realize that your next meal is vital. Below you can find food resources that will help support you with your needs',
    },
  },
  '/medicalsupport': {
    english: {
      category: 'Medical Support',
      description:
        'Welcome to our medical support. Your health is vital and we found resources that will help support you with your medical needs',
    },
    spanish: {
      category: 'Atención Médica',
      description:
        'Bienvenidos a nuestro soporte médico. Su salud es vital y encontramos recursos que lo ayudarán a satisfacer sus necesidades médicas.',
    },
  },
  '/transportation': {
    english: {
      category: 'Transportation',
      description:
        'Welcome to our transportation resources. Below are some resources that will help you get from point A to point B',
    },
    spanish: {
      category: 'Transporte',
      description:
        'Bienvenido a nuestros recursos de transporte. A continuación se muestran algunos recursos que lo ayudarán a pasar del punto A al punto B',
    },
  },
  '/mentalhealth': {
    english: {
      category: 'Mental Health',
      description:
        'Welcome to our mental health resources. Your mental health is important, below you can find resources that will help support you with your needs',
    },
    spanish: {
      category: 'Salud Mental',
      description:
        'Bienvenido a nuestros recursos de salud mental. Su salud mental es importante, a continuación puede encontrar recursos que lo ayudarán a satisfacer sus necesidades',
    },
  },
  '/socialservices': {
    english: {
      category: 'Social Services',
      description:
        'Welcome to our social service resources. Below you can find essential resources to address your re-entry needs',
    },
    spanish: {
      category: 'Servicios Sociales',
      description:
        'Bienvenidos a nuestros recursos de servicio social. A continuación, puede encontrar recursos esenciales para abordar sus necesidades de reingreso.',
    },
  },
  '/clothing': {
    english: {
      category: 'Clothing',
      description:
        'Welcome to our clothing resources. We all need clothes to wear. Below you can find locations and resources that will support you with your needs',
    },
    spanish: {
      category: 'Ropa',
      description:
        'Bienvenido a nuestros recursos de ropa. Todos necesitamos ropa para ponernos. A continuación, puede encontrar ubicaciones y recursos que lo ayudarán con sus necesidades.',
    },
  },
  '/resourcedirectory': {
    english: {
      category: 'Resource Directory',
      description:
        'Welcome to our resource directory. A broad range of resources that can support you with many of your reentry needs into Santa Barbara County',
    },
    spanish: {
      category: 'Directorio de Recursos',
      description:
        'Bienvenido a nuestro directorio de recursos. Una amplia gama de recursos que pueden ayudarlo con muchas de sus necesidades de reingreso al condado de Santa Bárbara.',
    },
  },
  '/legalservices': {
    english: {
      category: 'Legal Services',
      description:
        'Welcome to our legal service resources. You can find resources that can help you with any legal matters that you need to address',
    },
    spanish: {
      category: 'Servicios Jurídicos',
      description:
        'Bienvenido a nuestros recursos de servicios legales. Puede encontrar recursos que pueden ayudarlo con cualquier asunto legal que necesite abordar.',
    },
  },
  '/communitysupport': {
    english: {
      category: 'Community Support',
      description:
        'Welcome to our community support resources. Below you will be able to find the community support that you will need to help you in your reintegration process',
    },
    spanish: {
      category: 'Soporte Comunitario',
      description:
        'Bienvenido a los recursos de apoyo de nuestra comunidad. A continuación podrás encontrar el apoyo comunitario que necesitarás para ayudarte en tu proceso de reintegración.',
    },
  },
  '/employment': {
    english: {
      category: 'Employment',
      description:
        'Welcome to our employment resources. Below you will find organizations that will help you gain employment for a steady income',
    },
    spanish: {
      category: 'Empleo',
      description:
        'Bienvenido a nuestros recursos laborales. A continuación, encontrará organizaciones que lo ayudarán a obtener un empleo para obtener un ingreso estable.',
    },
  },
  '/housing': {
    english: {
      category: 'Housing',
      description:
        'Finding a place to live is one of the most important items that you have to figure out. If are looking for a apartment, shelter, transitional house, sober living home or shelter you can begin your search below',
    },
    spanish: {
      category: 'Alojamiento',
      description:
        'Encontrar un lugar para vivir es uno de los elementos más importantes que debe resolver. Si está buscando un apartamento, refugio, casa de transición, hogar para vivir sobrio o refugio, puede comenzar su búsqueda a continuación.',
    },
  },
  '/substanceuse': {
    english: {
      category: 'Substance Use',
      description:
        'Welcome to our substance use resources. Sobriety can help you navigate reentry successfully. There are many resources that will help you with all of your needs below',
    },
    spanish: {
      category: 'Uso de Sustancias',
      description:
        'Bienvenido a nuestros recursos sobre el uso de sustancias. La sobriedad puede ayudarlo a navegar el reingreso con éxito. Hay muchos recursos que lo ayudarán con todas sus necesidades a continuación',
    },
  },
}

export default categories
