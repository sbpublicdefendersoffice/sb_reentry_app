import { useRouter } from 'next/router'

import { useLanguage } from '../../hooks/'
import { CopyHolder } from '../../types/language'

import { Paragraph, Title, Button } from '../../ui'

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
    freshStart:
      'Apply for criminal record expungement with via our Fresh Start tool',
  },
  spanish: {
    about: 'Sobre nosotros',
    title: 'Estamos aquí para ayudarte prosperar',
    explainer:
      'En ThriveSBC encontrara una variedad de recursos para ayudarlo a usted o a un ser querido que ha sido impactado por el sistema legal penal. ¡Estamos aquí para ayudar!',
    buttonText: 'Buscando Recursos ',
    loginButtonText: 'Acceso',
    loginCopy:
      ' O, iniciar a ThriveSBC para administrar su información, solicitar la eliminación de registros y mas',
    freshStart:
      'Solicitar la eliminación de registros por el instrumento Nuevo Comienzo',
  },
}

export const hub: string = '/#resourcehub'

const HomePage = ({ children }) => {
  const { push } = useRouter()
  const { language } = useLanguage()
  const {
    about,
    title,
    explainer,
    buttonText,
    loginButtonText,
    loginCopy,
    freshStart,
  } = copy[language]

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
          <Button onClick={() => push('/login')}>{loginButtonText}</Button>
          <Paragraph className={styles.Paragraph}>{freshStart}</Paragraph>
          <Button onClick={() => push('/freshstart')}>Fresh Start</Button>
          {children}
        </div>
      </article>
    </section>
  )
}

export default HomePage
