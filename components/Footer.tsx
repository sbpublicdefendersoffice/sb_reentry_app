import NextLink from 'next/link'
import { ReactElement, useState, Fragment } from 'react'
import { Grid, Hidden, Button } from '@mui/material'
import { RouteInfo, CopyHolder } from '../types/'
import useLanguage from '../hooks/useLanguage'
import { ENGLISH } from '../constants/language'
import { ArrowDropDown } from '@mui/icons-material'
import { ThriveLogo, Paragraph } from '../ui'
import {
  staticPageRoutes,
  CourtSupportRoutes,
  ResourcesSupportRoutes,
} from '../constants'
import styles from './Footer.module.css'
import { useStyles } from '../constants/materialStyles'
import TwitterIcon from '@mui/icons-material/Twitter'
import FacebookIcon from '@mui/icons-material/Facebook'
import InstagramIcon from '@mui/icons-material/Instagram'
const lastStaticRouteIndex: number = staticPageRoutes.length - 1
const currentYear: number = new Date().getFullYear()
export const copyright: string = `© Copyright 2021${
  currentYear === 2021 ? '' : `-${currentYear}`
}`
export const linkInfo = {
  text: "Santa Barbara County Public Defender's Office",
  href: 'https://www.countyofsb.org/defender',
  twitter: 'https://twitter.com/thrive_sbc',
  instagram: 'https://www.instagram.com/thrivesbc',
  facebook: 'https://www.facebook.com/ThriveSantaBarbaraCounty',
}
const copy: CopyHolder = {
  english: {
    art: 'Homepage picture graciously provided by ',
    tagline: 'A Santa Barbara County tool for the justice-impacted community',
    court: 'Court Resources',
    resource: 'Resource Support',
  },
  spanish: {
    art: 'Imagen de la página de inicio gentilmente proporcionada por ',
    tagline:
      'Una herramienta del condado de Santa Bárbara para la comunidad afectada por la justicia',
    court: 'Recursos de la corte',
    resource: 'Soporte de recursos',
  },
}
const Footer = () => {
  const { language } = useLanguage()
  const classes = useStyles()
  const activeCopy = copy[language]
  const StaticPages: ReactElement[] = staticPageRoutes.map(
    (routeData: RouteInfo, i: number) => {
      const title = routeData[`title_${language}`]
      const [courtButtonClicked, setCourtButtonClicked] = useState(false)
      const [resourceButtonClicked, setResourceButtonClicked] = useState(false)
      const { route } = routeData
      const link: ReactElement = (
        <Grid item xs={12} md={3} sm={1} className={styles.Grid}>
          <NextLink href={route} as={route}>
            <h2 className={styles.Title}>{title}</h2>
          </NextLink>
        </Grid>
      )
      if (i === lastStaticRouteIndex - 1) {
        return (
          <>
            <Grid item xs={12} md={2} sm={4} className={styles.Grid}>
              <Hidden smDown>
                <div style={{ width: '10rem' }}>
                  <Button
                    onClick={() => setCourtButtonClicked(!courtButtonClicked)}
                    style={{
                      textTransform: 'inherit',
                      lineHeight: 'inherit',
                      padding: '0 !important',

                      fontSize: '1rem',
                    }}
                  >
                    <h2 className={styles.ButtonTitle}>
                      {activeCopy.court}
                      <ArrowDropDown style={{ alignItems: 'inherit' }} />
                    </h2>{' '}
                  </Button>
                  {courtButtonClicked &&
                    CourtSupportRoutes.map((routeData, i) => {
                      const title = routeData[`title_${language}`]
                      const { route } = routeData
                      return (
                        <>
                          <NextLink key={i} href={route} as={route}>
                            <h2
                              className={styles.TitleWrap}
                              onClick={() => setCourtButtonClicked(false)}
                              style={{
                                fontSize: '1.2rem',
                                margin: '.5rem 0rem .5rem 0rem',
                                whiteSpace: 'normal',
                              }}
                            >
                              {title}
                            </h2>
                          </NextLink>
                          <br />
                        </>
                      )
                    })}
                </div>
              </Hidden>
              <Hidden mdUp>
                <Button
                  onClick={() => setCourtButtonClicked(!courtButtonClicked)}
                  className={styles.ButtonStyle}
                  style={{
                    textTransform: 'inherit',
                    lineHeight: 'inherit',
                    padding: '0 !important',
                    display: 'block',
                  }}
                >
                  <h2 className={styles.ButtonTitle}>
                    {activeCopy.court} <ArrowDropDown />
                  </h2>
                </Button>
                <div style={{ marginTop: '1rem' }}>
                  {courtButtonClicked &&
                    CourtSupportRoutes.map((routeData, i) => {
                      const title = routeData[`title_${language}`]
                      const { route } = routeData
                      return (
                        <>
                          {route ===
                          'https://portal.sbcourts.org/CASBPORTAL/' ? (
                            <a
                              target="_blank"
                              rel="noopener noreferrer"
                              href={route}
                              key={i}
                            >
                              <h2
                                style={{
                                  outline: '0 !important',
                                }}
                                className={styles.Title}
                              >
                                {title}
                              </h2>
                            </a>
                          ) : (
                            <NextLink key={i} href={route} as={route}>
                              <h2 className={styles.Title}>{title}</h2>
                            </NextLink>
                          )}
                        </>
                      )
                    })}
                </div>
              </Hidden>
            </Grid>
            <Grid item xs={12} md={2} sm={3} className={styles.Grid}>
              <Hidden smDown>
                <div
                  style={{
                    width: '10rem',
                    marginLeft: '2rem',
                    marginRight: '3rem',
                  }}
                >
                  <Button
                    onClick={() =>
                      setResourceButtonClicked(!resourceButtonClicked)
                    }
                    className={styles.Button}
                  >
                    <h2 className={styles.ButtonTitle}>
                      {activeCopy.resource}
                      <ArrowDropDown style={{ alignItems: 'inherit' }} />
                    </h2>
                  </Button>
                  {resourceButtonClicked &&
                    ResourcesSupportRoutes.map((routeData, i) => {
                      const title = routeData[`title_${language}`]
                      const { route } = routeData
                      return (
                        <>
                          <NextLink key={i} href={route} as={route}>
                            <h2
                              className={styles.TitleWrap}
                              onClick={() => setResourceButtonClicked(false)}
                              style={{
                                margin: '.5rem 0rem .5rem 0rem',
                                whiteSpace: 'normal',
                              }}
                            >
                              {title}
                            </h2>
                          </NextLink>
                          <br />
                        </>
                      )
                    })}
                </div>
              </Hidden>
              <Hidden mdUp>
                <Button
                  onClick={() =>
                    setResourceButtonClicked(!resourceButtonClicked)
                  }
                  style={{
                    textTransform: 'inherit',
                    lineHeight: 'inherit',
                    padding: '0 !important',
                    margin: 'auto',
                    display: 'block',
                    boxSizing: 'border-box',
                  }}
                >
                  <h2 className={styles.ButtonTitle}>
                    {activeCopy.resource} <ArrowDropDown />
                  </h2>
                </Button>
                <div>
                  {resourceButtonClicked &&
                    ResourcesSupportRoutes.map((routeData, i) => {
                      const title = routeData[`title_${language}`]
                      const { route } = routeData
                      return (
                        <NextLink key={i} href={route} as={route}>
                          <h2
                            className={styles.Title}
                            onClick={() => setResourceButtonClicked(false)}
                            style={{ margin: '.5rem 0rem .5rem 0rem' }}
                          >
                            {title}
                          </h2>
                        </NextLink>
                      )
                    })}
                </div>
              </Hidden>
            </Grid>
            <div className={styles.About}>{link}</div>
          </>
        )
      }
      if (i === lastStaticRouteIndex) return null
      else return <Fragment key={i}>{link}</Fragment>
    },
  )
  return (
    <footer role="region">
      <Grid container className={styles.Footer}>
        <Grid item xs={12} sm={12} md={8}>
          {StaticPages}
          <div id="12" className={classes.socialMediaIcons}>
            <h3 className={classes.socialMediaIconsHeader}>Follow us</h3>
            <div>
              <a
                href={linkInfo.twitter}
                target="_blank"
                rel="noopener noreferrer"
                style={{ padding: '1rem', fontSize: '2rem' }}
              >
                <TwitterIcon style={{ fontSize: '2rem' }} />
              </a>
              <a
                href={linkInfo.instagram}
                target="_blank"
                rel="noopener noreferrer"
                style={{ padding: '1rem', fontSize: '2rem !important' }}
              >
                <InstagramIcon style={{ fontSize: '2rem' }} />
              </a>
              <a
                href={linkInfo.facebook}
                style={{ padding: '1rem', fontSize: '2rem' }}
                target="_blank"
                rel="noopener noreferrer"
              >
                <FacebookIcon style={{ fontSize: '2rem' }} />
              </a>
            </div>
          </div>
        </Grid>
        <Grid item xs={12} sm={12} md={4} className={styles.GridRight}>
          <div>
            {' '}
            <ThriveLogo role="img" className={styles.ThriveLogo} />
            <h4>{activeCopy.tagline}</h4>
            <NextLink href="/privacypolicy" as="/privacypolicy">
              <p
                style={{ cursor: 'pointer' }}
                role="term"
                className={styles.Margins}
              >
                <a>
                  {language === ENGLISH
                    ? 'Privacy Policy'
                    : 'Política de privacidad'}
                </a>
              </p>
            </NextLink>
            <div className={styles.Margins}>
              <p className={styles.DisplayInline}> {activeCopy.art}</p>{' '}
              <a
                href={'https://robertmaja.org/wp/home/'}
                target="_blank"
                rel="noopener noreferrer"
                style={{ display: 'inline-block' }}
              >
                Robert Maja
              </a>
            </div>
            <Paragraph className={styles.Margins}>
              {language === ENGLISH
                ? `Thrive is a free, nonprofit resource directory developed by Code for America and Santa Barbara County Public Defender's office for people who have been system impacted in Santa Barbara County. We are not a law firm and the information on this site is not legal advice.`
                : `Thrive es un directorio de recursos gratuito y sin fines de lucro desarrollado por Code para Oficina del Defensor Público del Condado de Santa Bárbara y Estados Unidos para personas que se han visto afectados por el sistema en el condado de Santa Bárbara. No somos un bufete de abogados y la información en este sitio no es un consejo legal. `}
            </Paragraph>
            <em className={styles.Margins}>
              <span role="contentinfo" className={styles.DisplayInline}>
                <p className={styles.Margins} style={{ marginRight: '.5rem' }}>
                  {copyright}
                </p>
                <a
                  role="link"
                  className={styles.Margins}
                  href={linkInfo.href}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {linkInfo.text}
                </a>
              </span>
            </em>
          </div>
        </Grid>
      </Grid>
    </footer>
  )
}
export default Footer
