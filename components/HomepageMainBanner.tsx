import { useRouter } from 'next/router'

// import { useState } from 'react'

import {
  useLanguage,
  // useResizeEvent
} from '../hooks/'
import { CopyHolder } from '../types/language'

// import Newsfeed from './Newsfeed'
import { Paragraph, Title, Button } from '../ui'

import styles from './HomepageMainBanner.module.css'

const copy: CopyHolder = {
  english: {
    about: 'About Us',
    title: "We're here to help you thrive",
    explainer:
      "On ThriveSBC you will find a variety of resources to help you or a loved one who have been impacted by the criminal legal system. We're  here to help!",
    buttonText: 'Search For Resources',
    loginButtonText: 'Login',
    loginCopy:
      'Or, Login to ThriveSBC to manage your info, apply for record expungement and more',
  },
  spanish: {
    about: 'Sobre nosotros',
    title: 'Estamos aquí para ayudarlo a prosperar',
    explainer:
      'En ThriveSBC encontrará una variedad de recursos para ayudarlo a usted oa un ser querido que ha sido afectado por el sistema legal penal. ¡Estamos aquí para ayudar!',
    buttonText: 'Buscar recursos',
    loginButtonText: 'Acceso',
    loginCopy:
      'O bien, inicie sesión en ThriveSBC para administrar su información, solicitar la eliminación de antecedentes penales y más.',
  },
}

export const hub: string = '/#resourcehub'
const login: string = '/login'

const HomepageMainBanner = () => {
  const { push } = useRouter()
  const { language } = useLanguage()
  // const [isAbove500px, setIsAbove500px] = useState<boolean>(innerWidth >= 500)
  const { about, title, explainer, buttonText, loginButtonText, loginCopy } =
    copy[language]
  // useResizeEvent(() => setIsAbove500px(innerWidth >= 500))

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
          <Button onClick={() => push(hub, hub, { shallow: true })}>
            {buttonText}
          </Button>
          <Paragraph className={styles.Paragraph}>{loginCopy}</Paragraph>
          <Button onClick={() => push(login)}>{loginButtonText}</Button>
        </div>
        {/* <div
          style={{
            display: isAbove500px ? 'block' : 'none',
            overflow: 'scroll',
          }}
        >
          <Newsfeed />
        </div> */}
      </article>
    </section>
  )
}

export default HomepageMainBanner
