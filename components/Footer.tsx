import NextLink from 'next/link'
import { ReactElement, Fragment, useState } from 'react'

import { RouteInfo, CopyHolder } from '../types/'
import useLanguage from '../hooks/useLanguage'
import { ENGLISH } from '../constants/language'
import { ArrowDropDown } from '@material-ui/icons/'
// import SBPDLogo from './SBPDLogo'
import { ThriveLogo, Paragraph } from '../ui'
import {
  useStyles,
  staticPageRoutes,
  CourtSupportRoutes,
  ResourcesSupportRoutes,
} from '../constants'
import { Button, Menu, MenuItem } from '@material-ui/core'
import styles from './Footer.module.css'
const lastStaticRouteIndex: number = staticPageRoutes.length - 1
const currentYear: number = new Date().getFullYear()
export const copyright: string = `© Copyright 2021${
  currentYear === 2021 ? '' : `-${currentYear}`
}`
export const linkInfo = {
  text: "Santa Barbara County Public Defender's Office",
  href: 'https://www.countyofsb.org/defender',
}

const copy: CopyHolder = {
  english: {
    art: 'Homepage picture graciously provided by ',
    tagline: 'A Santa Barbara County client tool for the justice-impacted',
  },
  spanish: {
    art: 'Imagen de la página de inicio gentilmente proporcionada por ',
    tagline:
      'Una herramienta para clientes del condado de Santa Bárbara para los afectados por la justicia',
  },
}

const Footer = () => {
  const { language } = useLanguage()
  const activeCopy = copy[language]
  const classes = useStyles()
  const StaticPages: ReactElement[] = staticPageRoutes.map(
    (routeData: RouteInfo, i: number) => {
      const title = routeData[`title_${language}`]
      const [anchorEl, setAnchorEl] = useState(null)
      const [anchorElCourt, setAnchorElCourt] = useState(null)
      const [anchorElResource, setAnchorElResource] = useState(null)
      const { route } = routeData

      const handleCourt = event => {
        setAnchorElCourt(event.currentTarget)
      }
      const handleResource = event => {
        setAnchorElResource(event.currentTarget)
      }
      const handleCloseCourt = event => {
        setAnchorElCourt(null)
      }
      const handleCloseResource = event => {
        setAnchorElResource(null)
      }
      const link: ReactElement = (
        <NextLink href={route} as={route}>
          <h2 role="term" className={styles.Title}>
            {title}
          </h2>
        </NextLink>
      )
      if (i === lastStaticRouteIndex - 2 || i === lastStaticRouteIndex - 3)
        return <Fragment key={i}>{link}</Fragment>
      if (i === lastStaticRouteIndex - 1)
        return (
          <Fragment key={i}>
            <Button
              onClick={handleCourt}
              style={{
                textTransform: 'inherit',
                lineHeight: 'inherit',
                padding: '0 !important',
                marginTop: '.2rem !important',
              }}
            >
              <h2 role="term" className={styles.Title}>
                Court Resources
                <ArrowDropDown style={{ alignItems: 'inherit' }} />
              </h2>
            </Button>{' '}
            <Menu
              id="court-support"
              anchorEl={anchorElCourt}
              keepMounted
              open={Boolean(anchorElCourt)}
              onClose={handleCloseCourt}
            >
              {CourtSupportRoutes.map(routeData => {
                const title = routeData[`title_${language}`]
                const { route } = routeData
                return (
                  <MenuItem
                    className={classes.dropDownItems}
                    onClick={handleCloseCourt}
                  >
                    <NextLink href={route} as={route}>
                      <h2 role="term" className={styles.SubMenuItem}>
                        {title}
                      </h2>
                    </NextLink>
                  </MenuItem>
                )
              })}
            </Menu>
            <Button
              onClick={handleResource}
              style={{
                textTransform: 'inherit',
                lineHeight: 'inherit',
                padding: '0 !important',
                marginTop: '.2rem !important',
              }}
            >
              <h2 role="term" className={styles.Title}>
                Resource Support
                <ArrowDropDown style={{ alignItems: 'inherit' }} />
              </h2>
            </Button>
            <Menu
              id="resource-support"
              anchorEl={anchorElResource}
              keepMounted
              open={Boolean(anchorElResource)}
              onClose={handleCloseResource}
            >
              {ResourcesSupportRoutes.map(routeData => {
                const title = routeData[`title_${language}`]
                const { route } = routeData
                return (
                  <MenuItem
                    className={classes.dropDownItems}
                    onClick={handleCloseResource}
                  >
                    <NextLink href={route} as={route}>
                      <h2 role="term" className={styles.SubMenuItem}>
                        {title}
                      </h2>
                    </NextLink>
                  </MenuItem>
                )
              })}
            </Menu>
            {link}
          </Fragment>
        )

      if (i === lastStaticRouteIndex) return null
      else return null
    },
  )
  return (
    <footer role="region" className={styles.Footer}>
      <div className={styles.container}>
        <nav role="navigation" className={styles.Nav}>
          {StaticPages}
        </nav>
        <div className={styles.Logo2}>
          {' '}
          <ThriveLogo role="img" className={styles.ThriveLogo} />
          <h4 style={{ marginLeft: '3rem' }}>{activeCopy.tagline}</h4>
        </div>

        {/* <SBPDLogo />
      
        <div className={styles.Logo1}>
          <img
            loading="lazy"
            src="/icons/thriveleaf.svg"
            className={styles.leaf}
            alt="Thrive Logo Leaf"
          />
        </div> */}
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
      <span>
        {activeCopy.art}
        <a
          className={styles.copyright}
          href={'https://robertmaja.org/wp/home/'}
          target="_blank"
          rel="noopener noreferrer"
        >
          Robert Maja
        </a>
      </span>
      <Paragraph className={styles.Disclaimer}>
        {language === ENGLISH
          ? `Thrive is a free, nonprofit resource directory developed by Code for America and Santa Barbara County Public Defender's office for people who have been system impacted in Santa Barbara County. We are not a law firm and the information on this site is not legal advice.`
          : `Thrive es un directorio de recursos gratuito y sin fines de lucro desarrollado por Code para Oficina del Defensor Público del Condado de Santa Bárbara y Estados Unidos para personas que se han visto afectados por el sistema en el condado de Santa Bárbara. No somos un bufete de abogados y la información en este sitio no es un consejo legal. `}
      </Paragraph>
    </footer>
  )
}

export default Footer
