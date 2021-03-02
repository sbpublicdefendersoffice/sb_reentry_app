import NextLink from 'next/link'
import Burger from './Burger'
import BurgerItems from './BurgerItems'
import useLanguage from '../hooks/useLanguage'
import React, { useState, useRef } from 'react'
import styles from './Header.module.css'
import { useOnClickOutside } from '../hooks/useOnClickOutside'

import { FreshStartLogo } from '../ui'
const altText = {
  english: "County of Santa Barbara Public Defender's Office Logo",
  spanish:
    'Logotipo de la Oficina del Defensor Público del Condado de Santa Bárbara',
}

const Header = () => {
  const { language } = useLanguage()
  const [open, setOpen] = useState(false)
  const node = useRef()
  useOnClickOutside(node, () => setOpen(false))

  return (
    <header role="banner" className={styles.Header}>
      <div className={styles.HeaderContainer}>
        <ul className={styles.HeaderContainer}>
          <li className="not-text-link">
            <NextLink href="/" as="/">
              <a className="not-text-link">
                <FreshStartLogo className={styles.FreshStart} color="light" />
              </a>
            </NextLink>
          </li>
          <li className={styles.NavListItem}>
            <NextLink href="/checklist" as="/checklist">
              <a>
                <h2 className={styles.Title}>72 Hour Checklist</h2>
              </a>
            </NextLink>
          </li>
          <li className={styles.NavListItem}>
            <NextLink href="/success-stories" as="/success-stories">
              <a>
                <h2 className={styles.Title}>Success Stories</h2>
              </a>
            </NextLink>
          </li>
          <li className={styles.NavListItem}>
            <NextLink href="/know-your-rights" as="/know-your-rights">
              <a>
                <h2 className={styles.Title}>Know your rights</h2>
              </a>
            </NextLink>
          </li>
          <li className={styles.NavListItem}>
            <NextLink href="/about-us" as="/about-us">
              <a>
                <h2 className={styles.Title}>About Us</h2>
              </a>
            </NextLink>
          </li>
        </ul>
      </div>
      <div ref={node}>
        <Burger open={open} setOpen={setOpen} />
        <BurgerItems open={open} setOpen={setOpen} />
      </div>
    </header>
  )
}

export default Header
