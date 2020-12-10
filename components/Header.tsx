import styles from './Header.module.css'

const Header = () => (
  <header className={styles.Header}>
    <div className={styles.HeaderContainer}>
      <h1 className={styles.Title}>Santa Barbara Reentry</h1>
      <img
        src="/images/logo192.png"
        alt="County of Santa Barbara Logo"
        className={styles.Logo}
      />
    </div>
  </header>
)

export default Header
