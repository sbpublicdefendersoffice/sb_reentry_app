import { CallToAction, Paragraph } from '../ui'
import { CopyHolder } from '../types/language'
import useLanguage from '../hooks/useLanguage'

import styles from './DiversionQualify.module.css'

export const iconsList: string[] = [
  '/icons/markericon.svg',
  '/icons/mentalhealth.svg',
  '/icons/treatmentheart.svg',
  '/icons/documents_smaller.svg',
]

export const copy: CopyHolder = {
  english: {
    qualify: 'How can I qualify?',
    youMust: 'In order to qualify for screening you must:',
    resident: 'Be a resident of Santa Barbara County',
    problem: 'Have a substance use or mental health problem',
    treatment: 'Be willing to participate in treatment',
    caseStatus:
      'Have a case or citation with pre-filling or pre-arraignment status',
  },
  spanish: {
    qualify: '¿Cómo puedo calificar?',
    youMust: 'Para calificar para la evaluación, debe:',
    resident: 'Ser residente del condado de Santa Bárbara',
    problem: 'Tiene un problema de salud mental o de uso de sustancias',
    treatment: 'Estar dispuesto a participar en el tratamiento',
    caseStatus:
      'Tener un caso o citación con estado de pre-llenado o pre-lectura de cargos',
  },
}

const DiversionQualify = () => {
  const { language } = useLanguage()

  const activeCopy = copy[language]
  const processStrings: string[] = Object.values(activeCopy).slice(2)

  return (
    <CallToAction>
      <Paragraph
        className={styles.Margin}
        size="heading-text"
        color="highlight"
      >
        {activeCopy.qualify}
      </Paragraph>
      <Paragraph className={styles.Margin} size="med-text">
        {activeCopy.youMust}
      </Paragraph>
      <div className={styles.Process}>
        {iconsList.map((src: string, i: number) => (
          <div className={styles.Tile} key={i}>
            <img className={styles.Image} src={src} />
            <Paragraph>{processStrings[i]}</Paragraph>
          </div>
        ))}
      </div>
    </CallToAction>
  )
}

export default DiversionQualify
