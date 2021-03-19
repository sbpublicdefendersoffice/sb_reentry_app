import NextLink from 'next/link'
import { useState, useRef, ReactElement } from 'react'

import Burger from './Burger'
import BurgerItems from './BurgerItems'
import useLanguage from '../hooks/useLanguage'
import styles from './Header.module.css'

import { staticPageRoutes } from '../constants/routes'
import { RouteInfo } from '../types/routes'
import { useOnClickOutside } from '../hooks/useOnClickOutside'
import { FreshStartLogo, Paragraph } from '../ui'

const lastStaticRouteIndex: number = staticPageRoutes.length - 1

const Header = () => {
  const { language } = useLanguage()
  const [open, setOpen] = useState(false)
  const node = useRef()
  useOnClickOutside(node, () => setOpen(false))

  const StaticPages: ReactElement[] = staticPageRoutes.map(
    (routeData: RouteInfo, i: number) => {
      const title = routeData[`title_${language}`]
      const { route } = routeData

      const link: ReactElement = (
        <NextLink href={route} as={route}>
          <h2 className={styles.Title}>{title}</h2>
        </NextLink>
      )

      if (i === lastStaticRouteIndex) return link
      else
        return (
          <>
            {link}
            <Paragraph
              className={styles.Separators}
              color="light"
              size="heading-text"
            >
              |
            </Paragraph>
          </>
        )
    },
  )

  return (
    <header role="banner" className={styles.Header}>
      <div className={styles.HeaderContainer}>
        <NextLink href="/" as="/">
          <a className="not-text-link">
            <FreshStartLogo className={styles.FreshStart} color="light" />
          </a>
        </NextLink>
        <nav className={styles.Nav}>
          <div className={styles.NavContainer}>{StaticPages}</div>
        </nav>
      </div>
      <div ref={node}>
        <Burger open={open} setOpen={setOpen} />
        <BurgerItems open={open} setOpen={setOpen} />
      </div>
    </header>
  )
}
export default Header
