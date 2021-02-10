import { useEffect, useState } from 'react'

import styles from './Navigator.module.css'

const Navigator = () => {
  const [history, setHistory] = useState<null | History>(null)

  useEffect((): void => {
    setHistory(window.history)
  }, [])

  return (
    <nav className={styles.Navigator}>
      <span className={styles.Arrows} onClick={() => history.back()}>
        &#5130;
      </span>
      <span className={styles.Arrows} onClick={() => history.forward()}>
        &#5125;
      </span>
    </nav>
  )
}

export default Navigator
