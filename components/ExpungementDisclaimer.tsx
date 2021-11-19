import { Fragment, ReactNode } from 'react'

import { CopyHolder } from '../types'
import { Card, Paragraph } from '../ui'
import { useLanguage } from '../hooks'

import styles from './ExpungementForm.module.css'

const copy: CopyHolder = {
  english: {
    disclaimer: 'Disclaimer',
    body: 'If you are on probation or parole, you may not be eligible for Fresh Start expungement at this time',
    however:
      'However, we still encourage you to fill out as much of this form as you can and get in touch with us!',
    later:
      'Even if you are not eligible now, you may be eligible at a later date or you may be able to take advantage of other services offered by the Public Defender',
  },
  spanish: {
    disclaimer: 'Descargo de responsabilidad',
    body: 'Si está en libertad condicional o en libertad condicional, es posible que no sea elegible para la eliminación de antecedentes de Fresh Start en este momento',
    however:
      'Sin embargo, le animamos a que rellene todo lo que pueda de este formulario y se ponga en contacto con nosotros',
    later:
      'Incluso si no es elegible ahora, puede ser elegible en una fecha posterior o puede aprovechar otros servicios ofrecidos por el Defensor Público',
  },
}

const ExpungementDisclaimer = () => {
  const { language } = useLanguage()

  const paragraphs: ReactNode[] = Object.entries(copy[language]).map(
    ([key, value], i) => {
      const dis: boolean = key === 'disclaimer'
      return (
        <Fragment key={i}>
          <Paragraph
            size={dis ? 'heading-text' : 'med-text'}
            color={dis ? 'highlight' : 'dark'}
          >
            {value}
          </Paragraph>
        </Fragment>
      )
    },
  )

  return (
    <Card className={styles.Card}>
      <section className={styles.Field}>{paragraphs}</section>
    </Card>
  )
}

export default ExpungementDisclaimer
