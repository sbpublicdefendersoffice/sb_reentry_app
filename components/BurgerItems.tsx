import NextLink from 'next/link'
import { useState, Fragment, ReactElement } from 'react'
import { bool, func } from 'prop-types'
import { Button, MenuItem } from '@mui/material'
import { StyledBurgerItems } from './BurgerItems.module'
import {
  useStyles,
  staticPageRoutes,
  CourtSupportRoutes,
  ResourcesSupportRoutes,
} from '../constants'
import styles from './Header.module.css'
import useLanguage from '../hooks/useLanguage'
import { CopyHolder, RouteInfo } from '../types/'
export const copy: CopyHolder = {
  english: {
    court: 'Court Resources',
    resource: 'Resource Support',
  },
  spanish: {
    court: 'Recursos del Juzgado',
    resource: 'Soporte de Recursos',
  },
}
const lastStaticRouteIndex: number = staticPageRoutes.length - 1
const BurgerItems = ({ open, setOpen }) => {
  const { language } = useLanguage()
  const classes = useStyles()
  const activeCopy = copy[language]
  const handleOpen = event => {
    if (event.target.innerText === activeCopy.resource) {
      setOpen(true)
    } else if (event.target.innerText === activeCopy.court) {
      setOpen(true)
    } else {
      setOpen(!open)
    }
  }
  const StaticPages: ReactElement[] = staticPageRoutes.map(
    (routeData: RouteInfo, i: number) => {
      const title = routeData[`title_${language}`]
      const [courtButtonClicked, setCourtButtonClicked] = useState(false)
      const [resourceButtonClicked, setResourceButtonClicked] = useState(false)
      const { route } = routeData
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
      if (i === lastStaticRouteIndex - 1)
        return (
          <Fragment key={i}>
            <Button
              onClick={() => setCourtButtonClicked(!courtButtonClicked)}
              style={{
                textTransform: 'inherit',
                padding: '0 !important',
                margin: '.5rem 0 .5rem 0',
                display: 'block',
              }}
            >
              <h2 role="term" className={classes.subMenuItem}>
                {activeCopy.court}
              </h2>
            </Button>{' '}
            {courtButtonClicked &&
              CourtSupportRoutes.map((routeData, i) => {
                const title = routeData[`title_${language}`]
                const { route } = routeData
                return (
                  <MenuItem
                    key={i}
                    className={classes.dropDownBurgerItems}
                    onClick={() => setOpen(false)}
                  >
                    {route === 'https://portal.sbcourts.org/CASBPORTAL/' ? (
                      <a
                        target="_blank"
                        rel="noopener noreferrer"
                        href={route}
                        style={{
                          textTransform: 'inherit',
                          padding: 'none',
                          letterSpacing: 'none',
                        }}
                      >
                        <h2
                          style={{
                            letterSpacing: '0',
                            padding: '0',
                            lineHeight: '0',
                          }}
                          className={classes.subMenuItem}
                        >
                          {title}
                        </h2>
                      </a>
                    ) : (
                      <NextLink href={route} as={route}>
                        <h2 className={classes.subMenuItem}>{title}</h2>
                      </NextLink>
                    )}
                  </MenuItem>
                )
              })}
            <Button
              onClick={() => setResourceButtonClicked(!resourceButtonClicked)}
              style={{
                textTransform: 'inherit',
                padding: '0 !important',
                margin: '.5rem 0 .5rem 0',
                display: 'block',
              }}
            >
              <h2 role="term" className={classes.subMenuItem}>
                {activeCopy.resource}
              </h2>
            </Button>
            {resourceButtonClicked &&
              ResourcesSupportRoutes.map((routeData, i) => {
                const title = routeData[`title_${language}`]
                const { route } = routeData
                return (
                  <MenuItem
                    key={i}
                    className={classes.dropDownBurgerItems}
                    onClick={() => setOpen(false)}
                  >
                    <NextLink href={route} as={route}>
                      <h2 role="term" className={classes.subMenuItem}>
                        {title}
                      </h2>
                    </NextLink>
                  </MenuItem>
                )
              })}
            {link}
          </Fragment>
        )
      else return <Fragment key={i}>{link}</Fragment>
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
