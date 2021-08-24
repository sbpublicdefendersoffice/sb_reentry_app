import NextLink from 'next/link'
import { ReactElement, Fragment, useState } from 'react'
import { Grid } from '@material-ui/core'
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
import { grid } from '@material-ui/system'
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
    court: 'Court Resources',
    resource: 'Resource Support',
  },
  spanish: {
    art: 'Imagen de la página de inicio gentilmente proporcionada por ',
    tagline:
      'Una herramienta para clientes del condado de Santa Bárbara para los afectados por la justicia',
    court: 'Recursos de la corte',
    resources: 'Soporte de recursos',
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
        <Grid item xs={12} sm={12} md={3} spacing={2} className={styles.Grid}>
          <NextLink href={route} as={route}>
            <h2
              role="term"
              // style={{ display: 'flex', margin: '1.5rem' }}
              className={styles.Title}
            >
              {title}
            </h2>
          </NextLink>
        </Grid>
      )
      if (i === lastStaticRouteIndex - 2 || i === lastStaticRouteIndex - 3)
        return <Fragment key={i}>{link}</Fragment>
      if (i === lastStaticRouteIndex - 1)
        return (
          <>
            <Grid item xs={12} sm={12} md={2} className={styles.Grid}>
              <h2
                role="term"
                className={styles.Title}
                style={{
                  marginBottom: '3rem',
                }}
              >
                {activeCopy.court}
                <div style={{ marginTop: '1rem' }}>
                  {CourtSupportRoutes.map(routeData => {
                    const title = routeData[`title_${language}`]
                    const { route } = routeData
                    return (
                      <NextLink href={route} as={route}>
                        <h2
                          role="term"
                          className={styles.Title}
                          style={{ marginLeft: '0rem', fontSize: '1.2rem' }}
                        >
                          {title}
                        </h2>
                      </NextLink>
                    )
                  })}
                </div>
              </h2>{' '}
            </Grid>
            <Grid item xs={12} sm={12} md={4} className={styles.Grid}>
              <h2
                role="term"
                className={styles.Title}
                // style={{
                //   marginLeft: '-12.5rem',
                // }}
              >
                {activeCopy.resource}
                <div style={{ marginTop: '1rem' }}>
                  {ResourcesSupportRoutes.map(routeData => {
                    const title = routeData[`title_${language}`]
                    const { route } = routeData
                    return (
                      <NextLink href={route} as={route}>
                        <h2
                          role="term"
                          className={styles.Title}
                          style={{ marginLeft: '0rem' }}
                        >
                          {title}
                        </h2>
                      </NextLink>
                    )
                  })}
                </div>
              </h2>
            </Grid>
            <div className={styles.About}> {link}</div>
          </>
        )

      if (i === lastStaticRouteIndex) return null
      else return null
    },
  )
  return (
    <footer
    // role="region"
    //  className={styles.Footer}
    >
      <div
      //  className={styles.container}
      >
        <Grid container className={styles.Footer}>
          {' '}
          <Grid item xs={12} sm={12} md={8} spacing={3}>
            {' '}
            {StaticPages}
          </Grid>
          {/* <nav role="navigation" className={styles.Nav}>
     
          </nav> */}
          <Grid item xs={12} sm={12} md={4} className={styles.GridRight}>
            <div>
              {' '}
              <em
                // style={{ position: 'relative', top: '0rem', left: '5.6rem' }}
                className={styles.Margins}
              >
                <span
                  role="contentinfo"
                  style={{ display: 'inline-block' }}
                  // className={styles.copyright}
                >
                  <p
                    className={styles.Margins}
                    style={{ marginRight: '.5rem' }}
                  >
                    {copyright}
                  </p>
                </span>

                <a
                  role="link"
                  className={styles.Margins}
                  href={linkInfo.href}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {linkInfo.text}
                </a>
              </em>
              <NextLink href="/privacypolicy" as="/privacypolicy">
                <a>
                  <p
                    role="term"
                    className={styles.Margins}
                    // style={{
                    //   marginTop: '1rem',
                    //   position: 'relative',
                    //   bottom: '.5rem',
                    //   left: '17rem',
                    // }}
                  >
                    {' '}
                    {language === ENGLISH
                      ? 'Privacy Policy'
                      : 'política de privacidad'}
                  </p>
                </a>
              </NextLink>
              <span
                // style={{
                //   marginTop: '1rem',
                //   display: 'inline-flex',
                //   position: 'relative',
                //   bottom: '17rem',
                //   right: '4.6rem',
                // }}

                className={styles.Margins}
              >
                <p style={{ display: 'inline-block' }}> {activeCopy.art}</p>
                <a
                  // className={styles.copyright}
                  href={'https://robertmaja.org/wp/home/'}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ display: 'inline-block' }}
                >
                  <p
                    // style={{
                    //   display: 'flex',
                    //   textAlign: 'end',
                    //   marginLeft: '.5rem',
                    // }}
                    style={{ marginLeft: '.5rem' }}
                    className={styles.Margins}
                  >
                    {' '}
                    Robert Maja
                  </p>
                </a>
              </span>
              <Paragraph
              //  className={styles.Disclaimer}
              >
                {language === ENGLISH
                  ? `Thrive is a free, nonprofit resource directory developed by Code for America and Santa Barbara County Public Defender's office for people who have been system impacted in Santa Barbara County. We are not a law firm and the information on this site is not legal advice.`
                  : `Thrive es un directorio de recursos gratuito y sin fines de lucro desarrollado por Code para Oficina del Defensor Público del Condado de Santa Bárbara y Estados Unidos para personas que se han visto afectados por el sistema en el condado de Santa Bárbara. No somos un bufete de abogados y la información en este sitio no es un consejo legal. `}
              </Paragraph>
              <ThriveLogo role="img" className={styles.ThriveLogo} />
              <h4
              // style={{ position: 'relative', top: '1rem', right: '-6.5rem' }}
              >
                {activeCopy.tagline}
              </h4>
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
          </Grid>
        </Grid>
      </div>
    </footer>
  )
}

export default Footer
