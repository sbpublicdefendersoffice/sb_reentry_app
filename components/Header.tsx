import NextLink from 'next/link'
import { useState, useRef, ReactElement, Fragment, useContext } from 'react'
import { Burger, BurgerItems, LiveDataSearch } from './'
import {
  useLanguage,
  useResizeEvent,
  useOnClickOutside,
  FavoriteContext,
} from '../hooks'
import { CopyHolder } from '../types/'
import styles from './Header.module.css'
import { staticPageRoutes } from '../constants/routes'
import { RouteInfo } from '../types/routes'
import { useStyles } from '../constants'
import { ThriveLogo, Paragraph } from '../ui'
import { Hidden, Badge, Button, Menu, MenuItem } from '@material-ui/core'
import { Favorite, ArrowDropDown, Search } from '@material-ui/icons/'
import { withStyles } from '@material-ui/core/styles'
const lastStaticRouteIndex: number = staticPageRoutes.length - 1
const copy: CopyHolder = {
  english: {
    tagline: 'A Santa Barbara County client tool for the justice-impacted',
  },
  spanish: {
    tagline:
      'Una herramienta para clientes del condado de Santa Bárbara para los afectados por la justicia',
  },
}
const Header = () => {
  const { language } = useLanguage()
  const classes = useStyles()
  const activeCopy = copy[language]
  const { favoriteResources } = useContext(FavoriteContext)
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
  const StaticPages: ReactElement[] = staticPageRoutes.map(
    (routeData: RouteInfo, i: number) => {
      const title = routeData[`title_${language}`]
      const itemOne = routeData[`itemOne_${language}`]
      const itemOneRoute = routeData[`itemOneRoute`]
      const itemTwo = routeData[`itemTwo_${language}`]
      const itemTwoRoute = routeData[`itemTwoRoute`]
      const itemThree = routeData[`itemThree_${language}`]
      const itemThreeRoute = routeData[`itemThreeRoute`]
      const itemFour = routeData[`itemFour_${language}`]
      const itemFourRoute = routeData[`itemFourRoute`]
      const itemFive = routeData[`itemFive_${language}`]
      const itemFiveRoute = routeData[`itemFiveRoute`]
      const itemSix = routeData[`itemSix_${language}`]
      const itemSixRoute = routeData[`itemSixRoute`]
      const [anchorEl, setAnchorEl] = useState(null)
      const { route } = routeData
      const handleClick = event => {
        setAnchorEl(event.currentTarget)
      }

      const handleClose = () => {
        setAnchorEl(null)
      }
      const link: ReactElement = (
        <NextLink href={route} as={route}>
          <h2 role="term" className={styles.Title}>
            {title}
          </h2>
        </NextLink>
      )
      const button: ReactElement = (
        <Fragment>
          <Button
            onClick={handleClick}
            style={{
              textTransform: 'inherit',
              lineHeight: 'inherit',
              padding: '0 !important',
              marginTop: '.2rem !important',
            }}
          >
            <h2 role="term" className={styles.Title}>
              {title}
              <ArrowDropDown style={{ alignItems: 'inherit' }} />
            </h2>
          </Button>
          <Menu
            id="simple-menu"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <MenuItem className={classes.dropDownItems} onClick={handleClose}>
              <NextLink href={itemOneRoute} as={itemOneRoute}>
                <h2 role="term" className={styles.SubMenuItem}>
                  {itemOne}
                </h2>
              </NextLink>
            </MenuItem>
            <MenuItem className={classes.dropDownItems} onClick={handleClose}>
              {' '}
              <NextLink href={itemTwoRoute} as={itemTwoRoute}>
                <h2 role="term" className={styles.SubMenuItem}>
                  {itemTwo}
                </h2>
              </NextLink>
            </MenuItem>
            <MenuItem className={classes.dropDownItems} onClick={handleClose}>
              {' '}
              <NextLink href={itemThreeRoute} as={itemThreeRoute}>
                <h2 role="term" className={styles.SubMenuItem}>
                  {itemThree}
                </h2>
              </NextLink>
            </MenuItem>
            <MenuItem className={classes.dropDownItems} onClick={handleClose}>
              {' '}
              <NextLink href={itemFourRoute} as={itemFourRoute}>
                <h2 role="term" className={styles.SubMenuItem}>
                  {itemFour}
                </h2>
              </NextLink>
            </MenuItem>
            <MenuItem className={classes.dropDownItems} onClick={handleClose}>
              {' '}
              <NextLink href={itemFiveRoute} as={itemFiveRoute}>
                <h2 role="term" className={styles.SubMenuItem}>
                  {itemFive}
                </h2>
              </NextLink>
            </MenuItem>
            <MenuItem className={classes.dropDownItems} onClick={handleClose}>
              {' '}
              <NextLink href={itemSixRoute} as={itemSixRoute}>
                <h2 role="term" className={styles.SubMenuItem}>
                  {itemSix}
                </h2>
              </NextLink>
            </MenuItem>
          </Menu>
        </Fragment>
      )
      if (i === lastStaticRouteIndex - 2 || i === lastStaticRouteIndex - 3)
        return <Fragment key={i}>{button}</Fragment>

      if (i === lastStaticRouteIndex) return null
      else return <Fragment key={i}>{link}</Fragment>
    },
  )
  // console.log('static Pages routes 2', anchorEl)
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

        <Hidden mdDown>
          <div
            style={{
              position: 'relative',
              marginLeft: '10rem',
              // top: '4.2rem',
              // right: '30rem',
              color: 'white',
              fontSize: '3rem',
            }}
          >
            <Search
              style={{
                display: 'flex',
                fontSize: '2rem',
                marginRight: '1.5rem',
              }}
            />
          </div>
          <LiveDataSearch />
          <h4 className={styles.Tagline}>{activeCopy.tagline}</h4>
        </Hidden>
        <div className={styles.Favorites}>
          <NextLink href="/favorites" as="/favorites">
            <div className={classes.badge}>
              <Badge badgeContent={favoriteResources.length} color="primary">
                <Favorite style={{ color: 'white', fontSize: '3rem' }} />
              </Badge>
            </div>
          </NextLink>
        </div>
      </div>
    </header>
  )
}
export default Header
