import { useState, useEffect } from 'react'

import useLanguage from '../hooks/useLanguage'

import styles from './LangSwitcher.module.css'

const LangSwitcher = () => {
  const { language, setLanguage } = useLanguage()

  const [isChecked, setIsChecked] = useState<boolean>(false)

  useEffect(() => {
    if (language === 'english') setLanguage('spanish')
    else setLanguage('english')
  }, [isChecked])

  return (
    <input
      className={styles.LangSwitcher}
      type="checkbox"
      onClick={() => setIsChecked(!isChecked)}
      checked={isChecked}
    />
  )
}

export default LangSwitcher
