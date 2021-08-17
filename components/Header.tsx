import NextLink from 'next/link'
import { useState, useRef, ReactElement, Fragment, useContext } from 'react'
import { Burger, BurgerItems, LiveDataSearch } from './'
import {
  useLanguage,
  useResizeEvent,
  useOnClickOutside,
  FavoriteContext,
} from '../hooks'
import styles from './Header.module.css'
import { staticPageRoutes } from '../constants/routes'
import { RouteInfo } from '../types/routes'
import { useStyles } from '../constants'
import { ThriveLogo, Paragraph } from '../ui'
import { Hidden, Badge } from '@material-ui/core'
import FavoriteIcon from '@material-ui/icons/Favorite'
const lastStaticRouteIndex: number = staticPageRoutes.length - 1
const Header = () => {
  const { language } = useLanguage()
  const classes = useStyles()
  const { favoriteResources } = useContext(FavoriteContext)
  const [isBurgerVisible, setIsBurgerVisible] = useState<boolean>(
    innerWidth <= 700,
  )
  const [open, setOpen] = useState<boolean>(false)
  const node = useRef()
  useOnClickOutside(node, () => setOpen(false))
  const burgerVisibility = () => {
    if (innerWidth <= 700) setIsBurgerVisible(true)
    else setIsBurgerVisible(false)
  }
  useResizeEvent(burgerVisibility)
  const StaticPages: ReactElement[] = staticPageRoutes.map(
    (routeData: RouteInfo, i: number) => {
      const title = routeData[`title_${language}`]
      const { route } = routeData
      const link: ReactElement = (
        <NextLink href={route} as={route}>
          <h2 role="term" className={styles.Title}>
            {title}
          </h2>
        </NextLink>
      )
      if (i === lastStaticRouteIndex - 1)
        return <Fragment key={i}>{link}</Fragment>
      if (i === lastStaticRouteIndex) return null
      else
        return (
          <Fragment key={i}>
            {link}
            <Paragraph
              className={styles.Separators}
              color="light"
              size="heading-text"
            >
              |
            </Paragraph>
          </Fragment>
        )
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
      </div>
      <div role="menu" ref={node}>
        {isBurgerVisible && (
          <>
            <Burger open={open} setOpen={setOpen} />
            <BurgerItems open={open} setOpen={setOpen} />
          </>
        )}
      </div>
      <div className={styles.Favorites}>
        <NextLink href="/favorites" as="/favorites">
          <div className={classes.badge}>
            <Badge badgeContent={favoriteResources.length} color="primary">
              <FavoriteIcon style={{ color: 'white', fontSize: '3rem' }} />
            </Badge>
          </div>
        </NextLink>
      </div>
      <Hidden mdDown>
        <LiveDataSearch />
      </Hidden>
    </header>
  )
}
export default Header
