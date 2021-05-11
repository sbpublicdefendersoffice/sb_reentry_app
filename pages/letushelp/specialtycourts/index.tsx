import NextLink from 'next/link'

import { CallToAction, Paragraph } from '../../../ui'
import { LetUsHelpIndexTitle } from '../../../components'
import { CopyHolder } from '../../../types/language'
import useLanguage from '../../../hooks/useLanguage'
import { margin, width } from '../../../constants/styling'

const copy: CopyHolder = {
  english: {
    title: 'Speciality Courts',
    whatIs: 'What  are speciality courts?',
    explain:
      "Santa Barbara County courts offer a number of specialty courts which include both Review and Treatment Courts. Specialty Courts focus on the rehabilitation of the justice involved community by connecting them to supportive services. They then monitor the community member's progress as they engage in diversion programming, re-enter the community, complete their terms of probation or engage in other court approved services",
    types: 'Types of Speciality Courts',
    list: 'These include but are not limited to: Drug Court, Restorative Court, Veterans Treatment Court, Mental Health Treatment Court and Domestic Violence Review Court as well as Diversion Reviews',
    eligible: 'How Can I Qualify for Speciality Courts?',
    qualify:
      'Contact an attorney or the Public Defender’s office to see if your case might qualify for Specialty Courts. Each court has specific requirements for entry, and an attorney is best qualified to help guide you through the process and discuss the specifics of entering each respective treatment court',
    click: 'Click Here',
    criteria: ' to read more about eligibilty criteria',
    attorney: 'An attorney will be able to guide you through this document',
  },
  spanish: {
    title: 'Tribunales de especialidades',
    whatIs: '¿Qué son los tribunales de especialidades?',
    explain:
      'Los tribunales del condado de Santa Bárbara ofrecen varios tribunales especializados que incluyen tribunales de revisión y de tratamiento. Los Tribunales de Especialidades se enfocan en la rehabilitación de la comunidad involucrada en la justicia al conectarlos con servicios de apoyo. Luego monitorean el progreso del miembro de la comunidad a medida que participan en programas de desvío, vuelven a ingresar a la comunidad, completan sus términos de libertad condicional o participan en otros servicios aprobados por la corte',
    types: 'Tipos de tribunales especializados',
    list: 'Estos incluyen pero no se limitan a: Tribunal de Drogas, Tribunal Restaurativo, Tribunal de Tratamiento de Veteranos, Tribunal de Tratamiento de Salud Mental y Tribunal de Revisión de Violencia Doméstica, así como revisiones de desvíos',
    eligible: '¿Cómo puedo calificar para tribunales especializados?',
    qualify:
      'Comuníquese con un abogado o con la oficina del Defensor Público para ver si su caso podría calificar para Tribunales Especializados. Cada tribunal tiene requisitos específicos para ingresar, y un abogado está mejor calificado para ayudarlo a guiarlo a través del proceso y discutir los detalles de ingresar a cada tribunal de tratamiento respectivo',
    click: 'Haga clic aquí',
    criteria: ' para leer más sobre los criterios de elegibilidad',
    attorney: 'Un abogado podrá guiarlo a través de este documento',
  },
}
const src: string = '/icons/specialtycourts.svg'

const SpecialtyCourtsLanding = () => {
  const { language } = useLanguage()
  const {
    title,
    whatIs,
    explain,
    types,
    list,
    eligible,
    qualify,
    click,
    criteria,
    attorney,
  } = copy[language]

  return (
    <>
      <LetUsHelpIndexTitle {...{ src, title, whatIs, explain }} />
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
