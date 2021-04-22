import { Title, Paragraph } from '../ui'
import { CopyHolder } from '../types/language'
import useLanguage from '../hooks/useLanguage'

export const copy: CopyHolder = {
  english: {
    pageTitle: 'How can we help you today?',
    pageHeading: 'Click a tile to learn more',
  },
  spanish: {
    pageTitle: '¿Cómo podemos ayudarlo hoy?',
    pageHeading: 'Haga clic en un mosaico para obtener más información',
  },
}

import styles from './LetUsHelpTitle.module.css'

const LetUsHelpTitle = () => {
  const { language } = useLanguage()

  const activeCopy = copy[language]

  return (
    <div className={styles.LetUsHelpTitle}>
      <Title role="heading" className={styles.Title}>
        {activeCopy.pageTitle}
      </Title>
      <Paragraph role="article" size="med-text">
        {activeCopy.pageHeading}
      </Paragraph>
    </div>
  )
}

export default LetUsHelpTitle
