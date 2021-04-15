import NextLink from 'next/link'
import { useState, useRef, useEffect, ReactElement, Fragment } from 'react'

import Burger from './Burger'
import BurgerItems from './BurgerItems'
import useLanguage from '../hooks/useLanguage'
import styles from './Header.module.css'

import { staticPageRoutes } from '../constants/routes'
import { RouteInfo } from '../types/routes'
import { useOnClickOutside } from '../hooks/useOnClickOutside'
import { ThriveLogo, Paragraph } from '../ui'

const lastStaticRouteIndex: number = staticPageRoutes.length - 1

const Header = () => {
  const { language } = useLanguage()
  const [isBurgerVisible, setIsBurgerVisible] = useState<boolean>(
    innerWidth <= 700,
  )
  const [open, setOpen] = useState<boolean>(false)
  const node = useRef()
  useOnClickOutside(node, () => setOpen(false))
  useEffect(() => {
    const burgerVisibility = () => {
      if (innerWidth <= 700) setIsBurgerVisible(true)
      else setIsBurgerVisible(false)
    }

    addEventListener('resize', burgerVisibility)
    return () => removeEventListener('resize', burgerVisibility)
  }, [])

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

      if (i === lastStaticRouteIndex) return <Fragment key={i}>{link}</Fragment>
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
          <a className="not-text-link">
            <ThriveLogo role="img" className={styles.FreshStart} />
          </a>
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
    </header>
  )
}
export default Header
