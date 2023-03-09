import { StarPurple500Sharp } from '@mui/icons-material'
import { ReactElement } from 'react'
import { useRouter } from 'next/router'
import NextLink from 'next/link'
import { useLanguage } from '../hooks/'
import { CopyHolder } from '../types/language'
import { RouteInfo } from '../types'
import { resourceRoutes } from '../constants/routes'

import { Paragraph, Title, Button } from '../ui'

import styles from './HomepageMainBanner.module.css'
import { Grid } from '@mui/material'

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
      'Apply for criminal record expungement via our Fresh Start tool',
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

const HomepageMainBanner = ({ children }) => {
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

  const PageTiles: ReactElement[] = resourceRoutes.map(
    (link: RouteInfo, i: number) => {
      const { route, imgPath } = link
      const title: string = link[`title_${language}`]

      return (
        // <Grid xs={5} sm={4} md={3} key={i} className={styles.singleTileHolder}>
        <>
          {/* <NextLink href={route}> */}
          {/* <a className={`${styles.link} not-text-link`}> */}
          <div className={styles.imgBg}>
            <img
              loading="lazy"
              role="img"
              className={styles.image}
              src={imgPath}
              alt={`${title}_icon`}
            />
            <Paragraph className={styles.categoryTitle} role="note">
              {title}
            </Paragraph>
          </div>
          {/* </a> */}
          {/* </NextLink> */}
        </>
        // </Grid>
      )
    },
  )

  return (
    <section className={styles.Main}>
      <article className={styles.Article}>
        <Title className={styles.Title}>{title}</Title>
        <Paragraph className={styles.Paragraph}>{freshStart}</Paragraph>
        <Button onClick={() => push('/freshstart')}>Fresh Start</Button>
        <Paragraph className={styles.Paragraph}>{explainer}</Paragraph>
        {children}
        <div className={styles.tileContainer}>{PageTiles}</div>
        {/* <Grid container spacing={0} className={styles.tileContainer}>
          {PageTiles}
        </Grid> */}
      </article>
    </section>
  )
}

export default HomepageMainBanner
