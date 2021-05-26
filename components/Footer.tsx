import NextLink from 'next/link'
import { ReactElement, Fragment } from 'react'

import { staticPageRoutes } from '../constants/routes'
import { RouteInfo } from '../types/routes'
import useLanguage from '../hooks/useLanguage'
import { ENGLISH } from '../constants/language'
import SBPDLogo from './SBPDLogo'
import { Paragraph } from '../ui'

import styles from './Footer.module.css'

const currentYear: number = new Date().getFullYear()
export const copyright: string = `© Copyright 2021${
  currentYear === 2021 ? '' : `-${currentYear}`
}`
export const linkInfo = {
  text: "Santa Barbara County Public Defender's Office",
  href: 'https://www.countyofsb.org/defender',
}

const Footer = () => {
  const { language } = useLanguage()

  const StaticPages: ReactElement[] = staticPageRoutes.map(
    (routeData: RouteInfo, i: number) => {
      const title = routeData[`title_${language}`]
      const { route } = routeData

      return (
        <Fragment key={i}>
          <NextLink href={route} as={route}>
            <Paragraph role="link" className={styles.Link}>
              {title}
            </Paragraph>
          </NextLink>
        </Fragment>
      )
    },
  )

  return (
    <footer role="region" className={styles.Footer}>
      <div className={styles.container}>
        <nav role="navigation" className={styles.Nav}>
          {StaticPages}
        </nav>
        <div className={styles.Logo2}>
          <SBPDLogo />
        </div>
        <div className={styles.Logo1}>
          <img
            src="/icons/thriveleaf.svg"
            className={styles.leaf}
            alt="Thrive Logo Leaf"
          />
        </div>
      </div>
      <em>
        <span role="contentinfo" className={styles.copyright}>
          {copyright}
        </span>

        <a
          role="link"
          className={styles.copyright}
          href={linkInfo.href}
          target="_blank"
          rel="noopener noreferrer"
        >
          {linkInfo.text}
        </a>
      </em>
      <NextLink href="/privacypolicy" as="/privacypolicy">
        <a style={{ borderBottom: 'none' }}>
          <p role="term">
            {' '}
            {language === ENGLISH ? 'Privacy Policy' : 'política de privacidad'}
          </p>
        </a>
      </NextLink>
      <Paragraph className={styles.Disclaimer}>
        {language === ENGLISH
          ? `Thrive is a free, nonprofit resource directory developed by Code for America and Santa Barbara County Public Defender's office for people who have been system impacted in Santa Barbara County. We are not a law firm and the information on this site is not legal advice.`
          : `Thrive es un directorio de recursos gratuito y sin fines de lucro desarrollado por Code para Oficina del Defensor Público del Condado de Santa Bárbara y Estados Unidos para personas que se han visto afectados por el sistema en el condado de Santa Bárbara. No somos un bufete de abogados y la información en este sitio no es un consejo legal. `}
      </Paragraph>
    </footer>
  )
}

export default Footer
