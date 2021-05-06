import NextLink from 'next/link'

import { CallToAction, Paragraph } from '../../../ui'
import { CopyHolder } from '../../../types/language'
import useLanguage from '../../../hooks/useLanguage'
import { margin, width } from '../../../constants/styling'

const copy: CopyHolder = {
  english: {
    types: 'Types of Speciality Courts',
    list:
      'These include but are not limited to: Drug Court, Restorative Court, Veterans Treatment Court, Mental Health Treatment Court and Domestic Violence Review Court as well as Diversion Reviews',
    eligible: 'How Can I Qualify for Speciality Courts?',
    qualify:
      'Contact an attorney or the Public Defender’s office to see if your case might qualify for Specialty Courts. Each court has specific requirements for entry, and an attorney is best qualified to help guide you through the process and discuss the specifics of entering each respective treatment court',
    click: 'Click Here',
    criteria: ' to read more about eligibilty criteria',
    attorney: 'An attorney will be able to guide you through this document',
  },
  spanish: {
    types: 'Tipos de tribunales especializados',
    list:
      'Estos incluyen pero no se limitan a: Tribunal de Drogas, Tribunal Restaurativo, Tribunal de Tratamiento de Veteranos, Tribunal de Tratamiento de Salud Mental y Tribunal de Revisión de Violencia Doméstica, así como revisiones de desvíos',
    eligible: '¿Cómo puedo calificar para tribunales especializados?',
    qualify:
      'Comuníquese con un abogado o con la oficina del Defensor Público para ver si su caso podría calificar para Tribunales Especializados. Cada tribunal tiene requisitos específicos para ingresar, y un abogado está mejor calificado para ayudarlo a guiarlo a través del proceso y discutir los detalles de ingresar a cada tribunal de tratamiento respectivo',
    click: 'Haga clic aquí',
    criteria: ' para leer más sobre los criterios de elegibilidad',
    attorney: 'Un abogado podrá guiarlo a través de este documento',
  },
}

const SpecialtyCourtsLanding = () => {
  const { language } = useLanguage()
  const { types, list, eligible, qualify, click, criteria, attorney } = copy[
    language
  ]

  return (
    <>
      <CallToAction>
        <Paragraph style={margin} size="heading-text" color="highlight">
          {types}
        </Paragraph>
        <Paragraph style={width}>{list}</Paragraph>
      </CallToAction>
      <CallToAction blueBg>
        <Paragraph style={margin} size="heading-text" color="highlight">
          {eligible}
        </Paragraph>
        <Paragraph style={{ ...width, ...margin }}>{qualify}</Paragraph>
        <div style={margin}>
          <NextLink href="/documents/specialtycourtsrequirements">
            <a>{click}</a>
          </NextLink>
          <span>{criteria}</span>
        </div>
        <Paragraph>{attorney}</Paragraph>
      </CallToAction>
    </>
  )
}

export default SpecialtyCourtsLanding
