import NextLink from 'next/link'
import { useState, useRef } from 'react'

import Burger from './Burger'
import BurgerItems from './BurgerItems'
import useLanguage from '../hooks/useLanguage'
import styles from './Header.module.css'
import { useOnClickOutside } from '../hooks/useOnClickOutside'
import { CopyHolder } from '../types/language'
import { FreshStartLogo, Paragraph } from '../ui'

const copy: CopyHolder = {
  english: {
    checklist: '72 Hour Checklist',
    successStory: 'Success Stories',
    knowYourRights: 'Know Your Rights',
    aboutUs: 'About Us',
  },
  spanish: {
    checklist: 'Lista de verificación de 72 horas',
    successStory: 'Historias de éxito',
    knowYourRights: 'Conoce tus derechos',
    aboutUs: 'Sobre nosotros',
  },
}

const Header = () => {
  const { language } = useLanguage()
  const [open, setOpen] = useState(false)
  const node = useRef()
  useOnClickOutside(node, () => setOpen(false))

  const activeCopy = copy[language]

  return (
    <header role="banner" className={styles.Header}>
      <div className={styles.HeaderContainer}>
        <NextLink href="/" as="/">
          <a className="not-text-link">
            <FreshStartLogo className={styles.FreshStart} color="light" />
          </a>
        </NextLink>
        <nav className={styles.Nav}>
          <div className={styles.NavContainer}>
            <NextLink href="/checklist" as="/checklist">
              <h2 className={styles.Title}>{activeCopy.checklist}</h2>
            </NextLink>
            <Paragraph
              className={styles.Separators}
              color="light"
              size="heading-text"
            >
              |
            </Paragraph>
            <NextLink href="/success-stories" as="/success-stories">
              <h2 className={styles.Title}>{activeCopy.successStory}</h2>
            </NextLink>
            <Paragraph
              className={styles.Separators}
              color="light"
              size="heading-text"
            >
              |
            </Paragraph>
            <NextLink href="/know-your-rights" as="/know-your-rights">
              <h2 className={styles.Title}>{activeCopy.knowYourRights}</h2>
            </NextLink>
            <Paragraph
              className={styles.Separators}
              color="light"
              size="heading-text"
            >
              |
            </Paragraph>
            <NextLink href="/about-us" as="/about-us">
              <h2 className={styles.Title}>{activeCopy.aboutUs}</h2>
            </NextLink>
          </div>
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
