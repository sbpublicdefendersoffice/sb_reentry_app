import { useRef, MutableRefObject } from 'react'

import { useLanguage, useIntersectionStyle } from '../hooks'
import { CopyHolder } from '../types'
import { Title, Paragraph } from '../ui'

const copy: CopyHolder = {
  english: {
    title: 'How Thrive Helps the Community',
    quote: '"Best Service Ever!"',
    attribute: '-John G. Someone, CEO of a CBO',
  },
  spanish: {
    title: 'Cómo Thrive Ayuda a la Comunidad',
    quote: '"¡El Mejor Servicio de Todos!"',
    attribute: '-John G. Someone, CEO de una CBO',
  },
}

import styles from './Quotes.module.css'

const Quotes = () => {
  const quoteRef: MutableRefObject<HTMLParagraphElement> = useRef()
  const { language } = useLanguage()
  useIntersectionStyle(quoteRef, styles.LoadingAnimation)

  const { title, quote, attribute } = copy[language]

  return (
    <section className={styles.Quotes}>
      <div className={styles.Holder}>
        <Title>{title}</Title>
        <Paragraph ref={quoteRef} size="heading-text" color="highlight">
          <em>{quote}</em>
        </Paragraph>
        <Paragraph className={styles.Attribution} size="med-text">
          {attribute}
        </Paragraph>
      </div>
    </section>
  )
}

export default Quotes
