import { useRouter } from 'next/router'
import { useState } from 'react'

import { useLanguage, useResizeEvent } from '../hooks/'
import { CopyHolder } from '../types/language'
import { Title, Paragraph, Button } from '../ui'

const resourceIcons: string[] = [
  'legalservices',
  'documents',
  'specialtycourts',
]
const resourceCopy: CopyHolder[] = [
  {
    english: {
      service: 'Public Defender Services',
      copy: "Access the many services offered by the Public Defender's Office.",
    },
    spanish: {
      service: 'Servicios de Defensoría Publica',
      copy: 'Accede a los múltiples servicios que se ofrecen de la oficina Defensor Público.',
    },
  },
  {
    english: {
      service: 'Help Preparing for Court',
      copy: 'From documents to legal terms, we can help you through!',
    },
    spanish: {
      service: 'Ayuda para prepararse para el tribunal',
      copy: '¡De los documentos a las formas legales, nosotros podemos ayudarte a través!',
    },
  },
  {
    english: {
      service: 'Our Resource Guides',
      copy: 'Food, jobs, medicine and more. Find resources to help you live your life.',
    },
    spanish: {
      service: 'Nuestras guías de recursos',
      copy: 'Alimentos, trabajos, medicinas y más. Encuentre recursos que lo ayuden a vivir su vida.',
    },
  },
]

const copy: CopyHolder = {
  english: {
    title: 'Unsure where to start?',
    title2: 'Let us help',
    buttonText: 'See more help topics',
  },
  spanish: {
    title: '¿No estás seguro por dónde empezar?',
    title2: 'Déjanos ayudarte',
    buttonText: 'Ver más temas de ayuda',
  },
}

export const url: string = '/letushelp'

import styles from './UnsureWhereToStart.module.css'

const UnsureWhereToStart = () => {
  const { push } = useRouter()
  const { language } = useLanguage()

  const [isLargeView, setIsLargeView] = useState<boolean>(
    window.innerWidth > 700,
  )

  useResizeEvent((): void =>
    window.innerWidth > 700 ? setIsLargeView(true) : setIsLargeView(false),
  )

  const { title, title2, buttonText } = copy[language]

  return (
    <section className={styles.UnsureWhereToStart}>
      <div className={styles.Column}>
        <Title>{title}</Title>
        <Title className={styles.SecondTitle}>{title2}</Title>
        {isLargeView && (
          <div className={styles.Resources}>
            {resourceCopy.map((resource: CopyHolder, i: number) => {
              const { service, copy } = resource[language]

              return (
                <div key={i} className={styles.SingleResource}>
                  <img
                    className={styles.Icon}
                    src={`./icons/${resourceIcons[i]}.svg`}
                  />
                  <div className={styles.TextHolder}>
                    <Paragraph
                      className={styles.ResourceTitle}
                      color="highlight"
                    >
                      {service}
                    </Paragraph>
                    <Paragraph className={styles.ResourceCopy}>
                      {copy}
                    </Paragraph>
                  </div>
                </div>
              )
            })}
          </div>
        )}
        <Button block onClick={() => push(url, url)} className={styles.Button}>
          {isLargeView ? buttonText : title2}
        </Button>
      </div>
      <img className={styles.Image} src="./images/whereToStartPic.jpg" />
    </section>
  )
}

export default UnsureWhereToStart
