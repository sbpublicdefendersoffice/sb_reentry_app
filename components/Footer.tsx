import SBPDLogo from './SBPDLogo'

import styles from './Footer.module.css'

const currentYear: number = new Date().getFullYear()
const copyright: string = `© Copyright 2021${
  currentYear === 2021 ? '' : `-${currentYear}`
}`

const Footer = () => (
  <footer className={styles.Footer}>
    <div className={styles.container}>
      <nav className={styles.Nav}>
        <span>item one</span>
        <span>item two</span>
        <span>item three</span>
        <span>item four</span>
        <span>item five</span>
      </nav>
      <div className={styles.Logo1}>
        <SBPDLogo />
      </div>
      <div className={styles.Logo2}>
        <SBPDLogo />
      </div>
    </div>
    <em>
      <span className={styles.copyright}>{copyright}</span>
      <a
        className={styles.copyright}
        href="https://www.countyofsb.org/defender"
        target="_blank"
        rel="noopener noreferrer"
      >
        Santa Barbara County Public Defender's Office
      </a>
    </em>
  </footer>
)

export default Footer
