import NextLink from 'next/link'

import styles from './Header.module.css'

import SBPDLogo from './SBPDLogo'

const Header = () => (
  <header role="banner" className={styles.Header}>
    <div className={styles.HeaderContainer}>
      <NextLink href="/" as="/">
        <a className="not-text-link">
          <h1 className={styles.Title}>Santa Barbara Reentry</h1>
        </a>
      </NextLink>
      <div className={styles.Logo}>
        <SBPDLogo />
      </div>
    </div>
  </header>
)

export default Header
