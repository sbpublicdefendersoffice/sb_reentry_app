import NextLink from 'next/link'

import styles from './Header.module.css'

import { FreshStartLogo } from '../ui'

const Header = () => (
  <header role="banner" className={styles.Header}>
    <div className={styles.HeaderContainer}>
      <NextLink href="/" as="/">
        <a className="not-text-link">
          <FreshStartLogo className={styles.FreshStart} color="light" />
        </a>
      </NextLink>
      {/* TODO: Full Page Search */}
    </div>
  </header>
)

export default Header
