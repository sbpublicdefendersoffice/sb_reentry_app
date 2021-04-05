import { useRouter } from 'next/router'

import styles from './Navigator.module.css'

const Navigator = () => {
  const { back } = useRouter()

  return (
    <nav className={styles.Navigator}>
      <span className={styles.Arrows} onClick={(): void => back()}>
        &#5130;
      </span>
    </nav>
  )
}

export default Navigator
