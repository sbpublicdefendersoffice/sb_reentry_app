import NextLink from 'next/link'

import styles from './Header.module.css'

import { FreshStartLogo, SBPDLogo } from './'

const Header = () => (
  <header role="banner" className={styles.Header}>
    <div className={styles.HeaderContainer}>
      <NextLink href="/" as="/">
        <a className="not-text-link">
          {/* <h1 className={styles.Title}>Santa Barbara Reentry</h1> */}
          <FreshStartLogo color="light" />
        </a>
      </NextLink>
      <div className={styles.Logo}>
        <SBPDLogo />
      </div>
    </div>
  </header>
)

export default Header
