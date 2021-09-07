import { useRouter } from 'next/router'

import { useLanguage } from '../hooks/'
import { CopyHolder } from '../types/language'

import { Paragraph, Title, Button } from '../ui'

import styles from './HomepageMainBanner.module.css'

const copy: CopyHolder = {
  english: {
    about: 'About Us',
    title: "We're here to help you thrive",
    explainer:
      "On ThriveSBC you will find a variety of resources to help you or a loved one with re-entry after a jail or prison stay. We're  here to help!",
    buttonText: 'Search For Resources',
  },
  spanish: {
    about: 'Sobre nosotros',
    title: 'Estamos aquí para ayudarlo a prosperar',
    explainer:
      'En ThriveSBC encontrará una variedad de recursos para ayudarlo a usted oa un ser querido con el reingreso después de una estadía en la cárcel o prisión. ¡Estamos aquí para ayudar!',
    buttonText: 'Buscar recursos',
  },
}

export const url: string = '/checklist'

const HomepageMainBanner = () => {
  const { push } = useRouter()
  const { language } = useLanguage()
  const { about, title, explainer, buttonText } = copy[language]

  return (
    <section className={styles.Main}>
      <div
        style={{ backgroundImage: 'url("./images/maja_bg.jpg")' }}
        className={styles.BGPic}
      />
      <article className={styles.Article}>
        <div className={styles.Backing}>
          <Paragraph color="highlight" size="med-text" className={styles.About}>
            {about}
          </Paragraph>
          <Title>{title}</Title>
          <Paragraph className={styles.Paragraph}>{explainer}</Paragraph>
          <Button onClick={() => push(url, url)}>{buttonText}</Button>
        </div>
      </article>
    </section>
  )
}

export default HomepageMainBanner
