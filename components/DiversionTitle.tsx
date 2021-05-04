import { CallToAction, Title, Paragraph } from '../ui'
import { CopyHolder } from '../types/language'
import useLanguage from '../hooks/useLanguage'

export const copy: CopyHolder = {
  english: {
    title: 'Diversion',
    whatIs: 'What is Diversion?',
    explain:
      'CREDO-47 is a diversion program that links individuals with substance use and mental health problems to treatment and provides assistance with housing, jobs, education and other resources. If you are accepted in the program and participate in treatment, you are able to get your criminal case dismissed.',
  },
  spanish: {
    title: 'Desviación',
    whatIs: '¿Qué es el desvío?',
    explain:
      'CREDO-47 es un programa alternativo que vincula a las personas con problemas de salud mental y uso de sustancias con el tratamiento y brinda asistencia con vivienda, trabajo, educación y otros recursos. Si es aceptado en el programa y participa en el tratamiento, puede hacer que se desestime su caso penal.',
  },
}

export const src: string = '/icons/diversion.svg'

import styles from './DiversionTitle.module.css'

const DiversionTitle = () => {
  const { language } = useLanguage()
  const { title, whatIs, explain } = copy[language]

  return (
    <CallToAction role="region" blueBg className={styles.DiversionTitle}>
      <img role="img" className={styles.Image} src={src} />
      <div className={styles.Text}>
        <Title role="heading">{title}</Title>
        <Paragraph role="article" size="med-text" color="highlight">
          {whatIs}
        </Paragraph>
        <Paragraph role="article">{explain}</Paragraph>
      </div>
    </CallToAction>
  )
}

export default DiversionTitle
