import { CopyHolder } from '../types/language'

import { Accordian } from '../types/accordian'
export const checklistData: CopyHolder = {
  english: {
    title: '72 Hour Checklist',
    description:
      'Welcome back! We are wishing you a successful transition back into Santa Barbara County. The first 72 hours can be an important part of your transition. This guide will help you have a better understanding of some of the resources that you might need. We hope that these resources will be able to help you improve your quality of life.',
  },

  spanish: {
    title: 'Lista de verificación de 72 horas',
    description:
      '¡Bienvenido de nuevo! Le deseamos una exitosa transición de regreso al condado de Santa Bárbara. Las primeras 72 horas pueden ser una parte importante de su transición. Esta guía le ayudará a comprender mejor algunos de los recursos que podría necesitar. Esperamos que estos recursos puedan ayudarlo a mejorar su calidad de vida.',
  },
}

export const probationAccordian: Accordian = {
  english: {
    title: 'Report To Your Probation or Parole Officer',
    description:
      'When first releasing it is recommended to check in with your probation officer withing 24 hours, or as ordered by the Court, or as instructed by an officer. Please reach out to Probation or Parole in the resource below for any additional questions that you may have',
    actionClick: 'blank',
    itemOne: 'Santa Barbara Probation Agency',
    itemTwo: 'Website:',
    itemTwoUrl: 'https://www.sbprobation.org',
    itemThree: 'Probation Report & Resource Center (PRRC)',
    itemFour: 'Division of Adult Parole Operations',
    itemFourUrl: 'https://www.cdcr.ca.gov/parole/northern-region-directory/',
    itemFive: 'Northern County Directory',
  },
  spanish: {
    title: 'Informe a su oficial de libertad condicional o bajo palabra',
    description:
      'Al ser liberado por primera vez, se recomienda que se registre con su oficial de libertad condicional dentro de las 24 horas, o según lo ordene el Tribunal, o según las instrucciones de un oficial. Comuníquese con Libertad condicional o Libertad bajo palabra en el recurso a continuación para cualquier pregunta adicional que pueda tener.',
    actionClick: 'blANK',
    itemOne: 'Agencia de Libertad Condicional de Santa Bárbara',
    itemTwo: 'Sitio web:',
    itemTwoUrl: 'https://www.sbprobation.org',
    itemThree: 'Probation Report & Resource Center (PRRC)',
    itemFour: 'División de Operaciones de Libertad Condicional para Adultos:',
    itemFourUrl: 'https://www.cdcr.ca.gov/parole/northern-region-directory/',
    itemFive: 'Directorio del norte del condado',
  },
}
export const importantAccordian: Accordian = {
  english: {
    title: 'Important documents',
    description:
      'It is important that you obtain these documents as soon as you can. These documents may be required to gain access to some of the resources you may need. ',
    actionClick: 'Here are some of the most important documents to obtain',
    itemOne: 'Birth Certificate (Santa Barbara County)',
    itemOneUrl: 'https://countyofsb.org/care/recorder/vital-records/births.sbc',

    itemTwo: 'Birth Certificate (Outside of Santa Barbara County)',
    itemTwoUrl: 'https://www.cdc.gov/nchs/w2w/index.htm',
    itemThree: 'Social Security Card',
    itemThreeUrl: 'https://www.ssa.gov/ssnumber/',
    itemFour: `Identification Card or Driver's License (California)`,
    itemFourUrl:
      'https://www.dmv.ca.gov/portal/driver-licenses-identification-cards/renew-your-driver-license-dl-or-identification-card-id/',
    disclaimer:
      '* Obtaining or replacing some of these documents do have associated fees, but waivers are available.',
  },
  spanish: {
    title: 'Documentos importantes',
    description:
      'Es importante que obtenga estos documentos lo antes posible. Estos documentos pueden ser necesarios para acceder a algunos de los recursos que pueda necesitar.',
    actionClick:
      'Estos son algunos de los documentos más importantes para obtener',
    itemOne: 'Certificado de nacimiento (condado de Santa Bárbara)',
    itemOneUrl: 'https://countyofsb.org/care/recorder/vital-records/births.sbc',
    itemTwo: 'Certificado de nacimiento (fuera del condado de Santa Bárbara)',
    itemTwoUrl: 'https://www.cdc.gov/nchs/w2w/index.htm',
    itemThree: 'Tarjeta de seguro Social',
    itemThreeUrl: 'https://www.ssa.gov/ssnumber/',
    itemFour: 'Tarjeta de identificación o licencia de conducir (California)',
    itemFourUrl:
      'https://www.dmv.ca.gov/portal/driver-licenses-identification-cards/renew-your-driver-license-dl-or-identification-card-id/',
    disclaimer:
      '* Obtener o reemplazar algunos de estos documentos tiene tarifas asociadas, pero hay exenciones disponibles.',
  },
}
export const foodAccordian: Accordian = {
  english: {
    title: 'Figuring out food resources you will need',
    description:
      'Find a food pantry or place that is located in your area. There are also many food assistance programs that will support you with your needs',
    actionClick:
      'Click on a category below to begin your reentyy resource search',
    itemOne: 'Food Pantries',
    itemOneUrl: 'Pantries',
    itemTwo: 'Food Meals',
    itemTwoUrl: 'Meals',
    itemThree: 'Cal-Fresh (Food Stamps)',
    itemThreeUrl: 'Stamps',
  },
  spanish: {
    title: 'Averiguar los recursos alimentarios que necesitará',
    description:
      'Busque una despensa de alimentos o un lugar que se encuentre en su área. También hay muchos programas de asistencia alimentaria que lo ayudarán con sus necesidades.',
    actionClick:
      'Haga clic en una categoría a continuación para comenzar su búsqueda de recursos de reingreso',
    itemOne: 'Despensas de alimentos',
    itemOneUrl: 'Pantries',
    itemTwo: 'Comidas alimenticias',
    itemTwoUrl: 'Meals',
    itemThree: 'Cupones de alimentos',
    itemThreeUrl: 'Stamps',
  },
}
export const medicalAccordian: Accordian = {
  english: {
    title: 'Address your medical needs',
    description:
      'Prioritize your medical needs. There are plenty of resources that you will find to get started below',
    actionClick:
      'Click on a category below to begin your search for medical resources',
    itemOne: 'Health Insurance Information & Enrollment Assistance',
    itemOneUrl: 'Health Insurance',
    itemTwo: 'Medical Clinics',
    itemTwoUrl: 'Medical Clinic',
    itemThree: 'Medi-Cal',
    itemThreeUrl: 'Medi-Cal',
  },
  spanish: {
    title: 'Aborde sus necesidades médicas',
    description:
      'Priorice sus necesidades médicas. Hay muchos recursos que encontrará para comenzar a continuación.',
    actionClick:
      'Haga clic en una categoría a continuación para comenzar su búsqueda de recursos médicos',
    itemOne:
      'Información sobre seguros médicos y asistencia para la inscripción',
    itemOneUrl: 'Health Insurance',
    itemTwo: 'Clínicas Médicas',
    itemTwoUrl: 'Medical Clinic',
    itemThree: 'Medi-Cal',
    itemThreeUrl: 'Medi-Cal',
  },
}
export const sobrietyAccordian: Accordian = {
  english: {
    title: 'Resources and support for those in sobriety',
    description:
      'One of the greatest habits that you can create while re-entering into society is staying sober. Feel free to check out many of the resources that will support you through out your journey',
    actionClick:
      'Click on a category below to begin your search for sober living resources',
    itemOne: 'Sober Living Homes',
    itemOneUrl: 'Sober Living',
    itemTwo: 'AA',
    itemTwoUrl: 'alcohol',

    itemThree: 'NA',
    itemThreeUrl: 'narcotics anonymous',
  },
  spanish: {
    title: 'Recursos y apoyo para quienes están sobrios',
    description:
      'Uno de los mejores hábitos que puede crear al volver a entrar en la sociedad es mantenerse sobrio. No dude en consultar muchos de los recursos que lo ayudarán a lo largo de su viaje.',
    actionClick:
      'Haga clic en una categoría a continuación para comenzar su búsqueda de recursos para una vida sobria',
    itemOne: 'Viviendas sobrias',
    itemTwo: 'AA',
    itemTwoUrl: 'alcohol',
    itemThree: 'NA',
    itemThreeUrl: 'narcotics anonymous',
  },
}
export const mentalHealthAccordian: Accordian = {
  english: {
    title: 'Look into getting support for your mental health needs',
    description: 'Here are some resources for your mental health needs',
    actionClick:
      'Click on a category below to begin your search for mental health resources',
    itemOne: 'Mental Wellness Information and Education',
    itemOneUrl: 'Mental',
    itemTwo: 'Mental Wellness Evaluation',
    itemTwoUrl: 'Mental Wellness',
    itemThree: 'Suicide Prevention Hotlines',
    itemThreeUrl: 'Suicide',
    itemFour: 'General Crisis Intervention Hotlines',
    itemFourUrl: 'Crisis',
    itemFive: 'Psychiatric Response Hotline',
    itemFiveUrl: 'Psychiatric',
  },
  spanish: {
    title: 'Busque apoyo para sus necesidades de salud mental',
    description:
      'Con toda la presión adicional de reingresar a la sociedad, recomendamos buscar ayuda si cree que necesita que se aborde este problema.',
    actionClick:
      'Haga clic en una categoría a continuación para comenzar su búsqueda de recursos de salud mental',
    itemOne: 'Información y educación sobre el bienestar mental',
    itemOneUrl: 'Mental',
    itemTwo: 'Evaluación de bienestar mental',
    itemTwoUrl: 'Mental Wellness',
    itemThree: 'Líneas directas para la prevención del suicidio',
    itemThreeUrl: 'Suicide',
    itemFour: 'Líneas directas generales de intervención en casos de crisis',
    itemFourUrl: 'Crisis',
    itemFive: 'Línea directa de respuesta psiquiátrica',
    itemFiveUrl: 'Psychiatric',
  },
}
export const jobAccordian: Accordian = {
  english: {
    title: 'Start your Job Search',
    description: 'Obtaining a job is critical for financial stability',
    actionClick: 'Click on a category below to help begin your job search',
    itemOne: 'LinkedIn',
    itemOneUrl: 'https://www.linkedin.com',
    itemTwo: 'Indeed',
    itemTwoUrl: 'https://www.indeed.com',
    disclaimer: 'Best of wishes in your job search',
  },
  spanish: {
    title: 'Busque apoyo para sus necesidades de salud mental',
    description:
      'Obtener un trabajo es fundamental para la estabilidad financiera',
    actionClick:
      'Haga clic en una categoría a continuación para ayudarlo a comenzar su búsqueda de trabajo',
    itemOne: 'LinkedIn',
    itemOneUrl: 'https://www.linkedin.com',
    itemTwo: 'Indeed',
    itemTwoUrl: 'https://www.indeed.com',
    disclaimer: 'Los mejores deseos en su búsqueda de trabajo',
  },
}
export const tipsAccordian: Accordian = {
  english: {
    title: 'Tips for a successful re-entry',
    description:
      "We wish you a successful transition into society. As you know there are many organizations that are in Santa Barbara County that are willing to support. Don't be afraid to ask for help! Your community believes in you!",
    actionClick: 'Tips that can help',
    itemOne:
      'Build a community of support by reaching out to others who are living positive lives',
    itemTwo: 'Staying sober is critical to staying focused in your goals',
    itemThree:
      'Not being ashamed of your past. Recognizing that we all make mistakes and the community is welcoming you back into society with lots of resources that can help in your transition',
    itemFour:
      'Watching your circle. Incareration often times is a test to see who is truly there for you. Choose the people you have around you wisely. This could be a big investment or a huge expense. Choose wisely',
  },
  spanish: {
    title: 'Consejos para un reingreso exitoso',
    description:
      'Le deseamos una exitosa transición a la sociedad. Como saben, hay muchas organizaciones en el condado de Santa Bárbara que están dispuestas a apoyar. ¡No temas pedir ayuda! ¡Tu comunidad cree en ti!',
    actionClick: 'Consejos que pueden ayudar',
    itemOne:
      'Construya una comunidad de apoyo al acercarse a otras personas que están viviendo una vida positiva.',
    itemTwo:
      'Mantenerse sobrio es fundamental para mantenerse enfocado en sus objetivos',
    itemThree:
      'No avergonzarse de su pasado. Reconocer que todos cometemos errores y que la comunidad le da la bienvenida a la sociedad con muchos recursos que pueden ayudarlo en su transición.',
    itemFour:
      'Observando tu círculo. La atención a menudo es una prueba para ver quién está realmente ahí para usted. Elija sabiamente a las personas que tiene a su alrededor. Esto podría ser una gran inversión o un gasto enorme. Elegir sabiamente',
  },
}
