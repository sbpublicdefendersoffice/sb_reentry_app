import NextLink from 'next/link'

import useLanguage from '../hooks/useLanguage'

import styles from './Header.module.css'

const altText = {
  english: "County of Santa Barbara Public Defender's Office Logo",
  spanish:
    'Logotipo de la Oficina del Defensor Público del Condado de Santa Bárbara',
}

const Header = () => {
  const { language } = useLanguage()

  return (
    <header role="banner" className={styles.Header}>
      <div className={styles.HeaderContainer}>
        <NextLink href="/" as="/">
          <a className="not-text-link">
            <h1 className={styles.Title}>Santa Barbara Reentry</h1>
          </a>
        </NextLink>
        <img
          src="/images/logo192.png"
          alt={altText[language]}
          className={styles.Logo}
        />
      </div>
    </header>
  )
}

export default Header
