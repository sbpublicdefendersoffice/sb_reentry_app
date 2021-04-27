import { useRouter } from 'next/router'

import { CopyHolder } from '../types/language'
import { siteTitle } from '../constants/copy'
import { Button, Title, Paragraph, CallToAction } from '../ui'
import useLanguage from '../hooks/useLanguage'

import styles from './AddYourOrg.module.css'

export const url: string = '/addyourorg'

export const copy: CopyHolder = {
  english: {
    org: `Do you have an organization you'd like to feature on ${siteTitle}?`,
    explain1:
      'We always love hearing from groups and people seeking to help out the justice-impacted community!',
    explain2: 'Please click below to help us learn how we might work together.',
    btnTxt: 'Click to start',
  },
  spanish: {
    org: `¿Tiene una organización que le gustaría incluir en ${siteTitle}?`,
    explain1:
      '¡Siempre nos encanta escuchar a grupos y personas que buscan ayudar a la comunidad afectada por la justicia!',
    explain2:
      'Haga clic a continuación para ayudarnos a saber cómo podemos trabajar juntos.',
    btnTxt: 'Haga clic para comenzar',
  },
}

const AddYourOrg = () => {
  const { push } = useRouter()
  const { language } = useLanguage()

  const { org, explain1, explain2, btnTxt } = copy[language]

  return (
    <CallToAction role="region">
      <Title role="heading">{org}</Title>
      <Paragraph role="article" className={styles.Explain1}>
        {explain1}
      </Paragraph>
      <Paragraph role="article" className={styles.Explain2}>
        {explain2}
      </Paragraph>
      <Button role="button" onClick={() => push(url, url)}>
        {btnTxt}
      </Button>
    </CallToAction>
  )
}

export default AddYourOrg
