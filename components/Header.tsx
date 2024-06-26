import NextLink from 'next/link'
import { useState, useRef, ReactElement, Fragment } from 'react'
import Burger from './Burger'
import BurgerItems from './BurgerItems'
import LiveDataSearch from './LiveDataSearch'
import {
  useLanguage,
  useResizeEvent,
  useOnClickOutside,
  useFavorite,
  useLoginStatus,
} from '../hooks'
import { CopyHolder } from '../types/'
import styles from './Header.module.css'

import { RouteInfo } from '../types/routes'
import {
  useStyles,
  staticPageRoutes,
  CourtSupportRoutes,
  ResourcesSupportRoutes,
  ENGLISH,
} from '../constants'
import { ThriveLogo } from '../ui'
import { Hidden, Badge, Button, Menu, MenuItem, Grid, Box } from '@mui/material'
import { Favorite, ArrowDropDown } from '@mui/icons-material'
import { useRouter } from 'next/router'
import logout from '../pages/api/logout'

const lastStaticRouteIndex: number = staticPageRoutes.length - 1

const copy: CopyHolder = {
  english: {
    tagline: 'A Santa Barbara County tool for the justice-impacted community',
  },
  spanish: {
    tagline:
      'Una herramienta del condado de Santa Bárbara para la comunidad afectada por la justicia',
  },
}
const Header = () => {
  const { language } = useLanguage()
  const classes = useStyles()
  const { favoriteResources } = useFavorite()
  const activeCopy = copy[language]
  const [isBurgerVisible, setIsBurgerVisible] = useState<boolean>(
    innerWidth <= 1275,
  )
  const [open, setOpen] = useState<boolean>(false)
  const node = useRef()
  useOnClickOutside(node, () => setOpen(false))
  const burgerVisibility = () => {
    if (innerWidth <= 1275) setIsBurgerVisible(true)
    else setIsBurgerVisible(false)
  }
  useResizeEvent(burgerVisibility)

  // LoginStatus hook
  const { isLoggedIn, setIsLoggedIn } = useLoginStatus()
  const { push } = useRouter()
  // Logout onclick function
  const logOut = async (): Promise<void> => {
    const loggingOut: Response = await fetch('/api/logout')
    const logoutMessage = await loggingOut.json()
    if (logoutMessage.error) console.error(logoutMessage.error)
    else {
      setIsLoggedIn(false)
      push('/login')
    }
  }

  // Logout page route
  const logoutRoute: RouteInfo = {
    title_english: 'Logout',
    title_spanish: 'Cerrar sesión',
    route: '',
  }

  const StaticPages: ReactElement[] = staticPageRoutes.map(
    (routeData: RouteInfo, i: number) => {
      // Check LoginStatus to replace login with logout route
      let isLoginLink = false
      if (isLoggedIn && routeData['title_english'] === 'Login') {
        routeData = logoutRoute
        isLoginLink = true
      }
      const title = routeData[`title_${language}`]
      const [anchorElCourt, setAnchorElCourt] = useState(null)
      const [anchorElResource, setAnchorElResource] = useState(null)

      const { route } = routeData

      const handleCourt = event => {
        setAnchorElCourt(event.currentTarget)
      }
      const handleResource = event => {
        setAnchorElResource(event.currentTarget)
      }
      const handleCloseCourt = () => {
        setAnchorElCourt(null)
      }
      const handleCloseResource = () => {
        setAnchorElResource(null)
      }
      const link: ReactElement = (
        <NextLink href={route} as={route}>
          <h2
            onClick={isLoginLink ? logOut : undefined}
            role="term"
            className={styles.Title}
          >
            {title}
          </h2>
        </NextLink>
      )
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
              <h2 className={styles.Title}>
                {language === ENGLISH
                  ? 'Court Resources'
                  : 'Recursos del Juzgado'}
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
              {CourtSupportRoutes.map((routeData, i) => {
                const title = routeData[`title_${language}`]
                const { route } = routeData
                return (
                  <MenuItem
                    className={classes.dropDownItems}
                    onClick={handleCloseCourt}
                    key={i}
                  >
                    {route === 'https://portal.sbcourts.org/CASBPORTAL/' ? (
                      <a
                        target="_blank"
                        href={route}
                        rel="noopener noreferrer"
                        className={styles.ALink}
                      >
                        <h2
                          style={{ outline: '0 !important' }}
                          className={styles.SubMenuItem}
                        >
                          {title}
                        </h2>
                      </a>
                    ) : (
                      <NextLink href={route} as={route}>
                        <h2 className={styles.SubMenuItem}>{title}</h2>
                      </NextLink>
                    )}
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
              <h2 className={styles.Title}>
                {language === ENGLISH
                  ? 'Resource Support'
                  : 'Soporte de recursos'}
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
              {ResourcesSupportRoutes.map((routeData, i) => {
                const title = routeData[`title_${language}`]
                const { route } = routeData
                return (
                  <MenuItem
                    key={i}
                    className={classes.dropDownItems}
                    onClick={handleCloseResource}
                  >
                    <NextLink href={route} as={route}>
                      <h2 className={styles.SubMenuItem}>{title}</h2>
                    </NextLink>
                  </MenuItem>
                )
              })}
            </Menu>
            {link}
          </Fragment>
        )
      else return <Fragment key={i}>{link}</Fragment>
    },
  )

  return (
    <header role="banner" className={styles.Header}>
      <div className={styles.HeaderContainer}>
        <NextLink href="/" as="/">
          <ThriveLogo role="img" className={styles.ThriveLogo} />
        </NextLink>
        <nav role="navigation" className={styles.Nav}>
          <div className={styles.NavContainer}>{StaticPages}</div>
        </nav>

        <div role="menu" ref={node}>
          {isBurgerVisible && (
            <>
              <Burger open={open} setOpen={setOpen} />

              <BurgerItems open={open} setOpen={setOpen} />
            </>
          )}
        </div>

        {/* <Hidden lgDown> */}
        <Box sx={{ display: { md: 'none', lg: 'block' } }}>
          <Grid container style={{ width: '36%' }}>
            <Grid item md={12} sm={4}>
              <div className={styles.DataSearch}>
                <LiveDataSearch />
              </div>
            </Grid>
          </Grid>
          <h4 className={styles.Tagline}>{activeCopy.tagline}</h4>
        </Box>
        {/* </Hidden> */}

        <div role="term" className={styles.Favorites}>
          <NextLink href="/favorites" as="/favorites">
            <Badge badgeContent={favoriteResources.length} color="primary">
              <Favorite style={{ color: 'white', fontSize: '3rem' }} />
            </Badge>
          </NextLink>
        </div>
      </div>
    </header>
  )
}
export default Header
