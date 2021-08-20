import NextLink from 'next/link'
import { useState, Fragment, ReactElement } from 'react'
import { bool, func } from 'prop-types'
import { Button, MenuItem } from '@material-ui/core'
import { ArrowDropDown } from '@material-ui/icons/'
import { StyledBurgerItems } from './BurgerItems.module'
import { useStyles } from '../constants/'
import { staticPageRoutes } from '../constants/routes'
import { RouteInfo } from '../types/routes'
import styles from './Header.module.css'
import useLanguage from '../hooks/useLanguage'
const lastStaticRouteIndex: number = staticPageRoutes.length - 1
const BurgerItems = ({ open, setOpen }) => {
  const { language } = useLanguage()
  const classes = useStyles()
  const [buttonClicked, setButtonClicked] = useState(false)
  const handleOpen = event => {
    if (
      event.target.innerText === 'Court Support' ||
      event.target.innerText === 'Resource Support' ||
      event.target.innerText === 'Conoce tus derechos' ||
      event.target.innerText === 'Soporte de recursos'
    ) {
      setOpen(true)
      setButtonClicked(!buttonClicked)
    } else {
      setOpen(!open)
    }
  }
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
      const handleButtonClick = event => {
        setButtonClicked(true)
        setAnchorEl(event.currentTarget)
      }
      const handleClose = () => {
        setOpen(!open)
        setButtonClicked(false)
        setAnchorEl(null)
      }
      const link: ReactElement = (
        <MenuItem
          className={classes.dropDownItems}
          open={!open}
          onClick={() => setOpen(!open)}
        >
          <NextLink href={route} as={route}>
            <h2
              role="term"
              style={{ color: 'white' }}
              className={styles.SubMenuItem}
            >
              {title}
            </h2>
          </NextLink>
        </MenuItem>
      )
      const button: ReactElement = (
        <Fragment>
          <Button
            onClick={handleButtonClick}
            style={{
              textTransform: 'inherit',
              marginTop: '.2rem !important',
              marginBlockStart: '0.83em',
              marginBlockEnd: '0.83em',
              marginInlineStart: '0px',
              marginInlineEnd: '0px',
              fontSize: 'inherit',
              display: 'flex',
              alignContent: 'flex-start',
            }}
          >
            <h2 className={styles.SubMenuItem} role="term">
              {title}
              <ArrowDropDown style={{ alignItems: 'inherit' }} />
            </h2>
          </Button>
          {buttonClicked && (
            <>
              {' '}
              <MenuItem
                style={{ padding: '0 !important' }}
                open={true}
                onClick={() => setOpen(!open)}
              >
                <NextLink href={itemOneRoute} as={itemOneRoute}>
                  <h2 role="term" className={classes.subMenuItemInButton}>
                    {itemOne}
                  </h2>
                </NextLink>
              </MenuItem>
              <MenuItem
                open={true}
                className={classes.dropDownItems}
                onClick={handleClose}
              >
                {' '}
                <NextLink href={itemTwoRoute} as={itemTwoRoute}>
                  <h2 role="term" className={classes.subMenuItemInButton}>
                    {itemTwo}
                  </h2>
                </NextLink>
              </MenuItem>
              <MenuItem className={classes.dropDownItems} onClick={handleClose}>
                {' '}
                <NextLink href={itemThreeRoute} as={itemThreeRoute}>
                  <h2 role="term" className={classes.subMenuItemInButton}>
                    {itemThree}
                  </h2>
                </NextLink>
              </MenuItem>
              <MenuItem className={classes.dropDownItems} onClick={handleClose}>
                {' '}
                <NextLink href={itemFourRoute} as={itemFourRoute}>
                  <h2 role="term" className={classes.subMenuItemInButton}>
                    {itemFour}
                  </h2>
                </NextLink>
              </MenuItem>
              <MenuItem className={classes.dropDownItems} onClick={handleClose}>
                {' '}
                <NextLink href={itemFiveRoute} as={itemFiveRoute}>
                  <h2 role="term" className={classes.subMenuItemInButton}>
                    {itemFive}
                  </h2>
                </NextLink>
              </MenuItem>
              <MenuItem className={classes.dropDownItems} onClick={handleClose}>
                {' '}
                <NextLink href={itemSixRoute} as={itemSixRoute}>
                  <h2 role="term" className={classes.subMenuItemInButton}>
                    {itemSix}
                  </h2>
                </NextLink>
              </MenuItem>
            </>
          )}
        </Fragment>
      )
      if (i === lastStaticRouteIndex - 2 || i === lastStaticRouteIndex - 3)
        return <Fragment key={i}>{button}</Fragment>
      if (i === lastStaticRouteIndex) return null
      else
        return (
          <MenuItem onClick={() => setOpen(!open)} key={i}>
            <NextLink href={route} as={route}>
              {link}
            </NextLink>
          </MenuItem>
        )
    },
  )
  return (
    <StyledBurgerItems open={open} onClick={handleOpen}>
      {StaticPages}
    </StyledBurgerItems>
  )
}
BurgerItems.propTypes = {
  open: bool.isRequired,
  setOpen: func.isRequired,
}
export default BurgerItems
