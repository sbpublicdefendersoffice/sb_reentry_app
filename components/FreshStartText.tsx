import type { CopyHolder } from '../types/'
import NextLink from 'next/link'

import useLanguage from '../hooks/useLanguage'
import { Paragraph, Title } from '../ui'

const copy: CopyHolder = {
  english: {
    reduce: 'Reduce or dismiss your record in Santa Barbara county',
    fill: "Fill out one easy form and you'll be connected to the Santa Barbara Public Defender's Office to help with your petitions for record clearance",
    login: 'Login',
    apply: ' and apply today',
  },
  spanish: {
    reduce: 'Reducir o descartar su registro en el condado de Santa Bárbara',
    fill: 'Complete un formulario sencillo y se lo comunicará con la Oficina del Defensor Público de Santa Bárbara para ayudarlo con sus peticiones de autorización de antecedentes.',
    login: 'Inicie sesión',
    apply: ' y aplique hoy',
  },
}

import styles from './FreshStartText.module.css'

const FreshStartText = () => {
  const { language } = useLanguage()

  const { reduce, fill, login, apply } = copy[language]

  return (
    <div className={styles.FreshStartText}>
      <Title className={styles.Title}>Fresh Start</Title>
      <Paragraph size="heading-text" className={styles.TextBlock}>
        {reduce}
      </Paragraph>
      <Paragraph size="heading-text" className={styles.TextBlock}>
        {fill}
      </Paragraph>
      <Paragraph size="heading-text" className={styles.TextBlock}>
        <NextLink href="/login">{login}</NextLink>
        {apply}
      </Paragraph>
    </div>
  )
}

export default FreshStartText
