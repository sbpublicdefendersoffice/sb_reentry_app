import NextLink from 'next/link'
import LangSwitcher from './LangSwitcher'

import styles from './Header.module.css'

const Header = () => (
  <header role="banner" className={styles.Header}>
    <LangSwitcher />
    <div className={styles.HeaderContainer}>
      <NextLink href="/" as="/">
        <a className="not-text-link">
          <h1 className={styles.Title}>Santa Barbara Reentry</h1>
        </a>
      </NextLink>
      <img
        src="/images/logo192.png"
        alt="County of Santa Barbara Public Defender's Office Logo"
        className={styles.Logo}
      />
    </div>
  </header>
)

export default Header
