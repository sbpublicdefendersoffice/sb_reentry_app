import { CSSProperties } from 'react'

import { CallToAction, Paragraph } from '../../../ui'
import { CopyHolder } from '../../../types/language'
import useLanguage from '../../../hooks/useLanguage'
import { DiversionTitle, DiversionQualify } from '../../../components'

const copy: CopyHolder = {
  english: {
    howWill: 'How will I know if I am eligible?',
    caseByCase:
      'Diversion eligibility is determined by the District Attorney’s Office on a case by case basis.',
    qualify: 'Not all cases will qualify.',
    contact: 'Who can I contact?',
    talkTo:
      'If you would like to learn more about diversion, please contact Julia Lara at the Santa Barbara County Public Defender’s Office.',
    holistic: 'Holistic Defense Advocate',
    defender: 'Office of the Public Defender of Santa Barbara',
  },
  spanish: {
    howWill: '¿Cómo sabré si soy elegible?',
    caseByCase:
      'La elegibilidad para la desviación la determina la Oficina del Fiscal de Distrito caso por caso.',
    qualify: 'No todos los casos calificarán.',
    contact: '¿A quién puedo contactar?',
    talkTo:
      'Si desea obtener más información sobre la desviación, comuníquese con Julia Lara en la Oficina del Defensor Público del Condado de Santa Bárbara.',
    holistic: 'Defensor de la defensa holística',
    defender: 'Oficina del Defensor Público de Santa Bárbara',
  },
}

const margin: CSSProperties = {
  marginBottom: 'var(--margin-lg)',
}

const DiversionLanding = () => {
  const { language } = useLanguage()

  const {
    howWill,
    caseByCase,
    qualify,
    contact,
    talkTo,
    holistic,
    defender,
  } = copy[language]

  return (
    <>
      <DiversionTitle />
      <DiversionQualify />
      <CallToAction blueBg>
        <Paragraph style={margin} size="heading-text" color="highlight">
          {howWill}
        </Paragraph>
        <Paragraph>{caseByCase}</Paragraph>
        <Paragraph>{qualify}</Paragraph>
      </CallToAction>
      <CallToAction>
        <Paragraph style={margin} size="heading-text" color="highlight">
          {contact}
        </Paragraph>
        <Paragraph style={margin}>{talkTo}</Paragraph>
        <Paragraph>Julia Lara</Paragraph>
        <Paragraph>{holistic}</Paragraph>
        <Paragraph>{defender}</Paragraph>
        <Paragraph>CREDO 47 Office: (805) 568-3498</Paragraph>
        <Paragraph>
          Email:{' '}
          <a
            href="mailto:julara@publicdefendersb.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            julara@publicdefendersb.org
          </a>
        </Paragraph>
      </CallToAction>
    </>
  )
}

export default DiversionLanding
