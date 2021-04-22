import { useRouter } from 'next/router'

import { Button, Title, Paragraph, CallToAction } from '../ui'
import useLanguage from '../hooks/useLanguage'
import { CopyHolder } from '../types/language'

export const url: string = '/letushelp'

export const copy: CopyHolder = {
  english: {
    title1: 'Not sure where to start?',
    title2: 'Let us help',
    explanation: 'Click below to help us better understand your needs',
    buttonText: 'Start',
  },
  spanish: {
    title1: '¿No estás seguro por dónde empezar?',
    title2: 'Ayudemos',
    explanation:
      'Haga clic a continuación para ayudarnos a comprender mejor sus necesidades',
    buttonText: 'Comienzo',
  },
}

import styles from './LetUsHelpCta.module.css'

const LetUsHelpCta = () => {
  const { push } = useRouter()
  const { language } = useLanguage()
  const activeCopy = copy[language]

  return (
    <CallToAction blueBg>
      <Title role="heading">{activeCopy.title1}</Title>
      <Title role="heading">{activeCopy.title2}</Title>
      <div className={styles.Copy}>
        <Paragraph role="article" className={styles.Explanation}>
          {activeCopy.explanation}
        </Paragraph>
      </div>
      <Button role="button" onClick={() => push(url, url)}>
        {activeCopy.buttonText}
      </Button>
    </CallToAction>
  )
}

export default LetUsHelpCta
