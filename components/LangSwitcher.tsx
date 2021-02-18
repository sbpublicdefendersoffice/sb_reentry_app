import { useState, useEffect, useRef } from 'react'

import useLanguage from '../hooks/useLanguage'

import styles from './LangSwitcher.module.css'

const LangSwitcher = () => {
  const { language, setLanguage } = useLanguage()

  const [isChecked, setIsChecked] = useState<boolean>(false)
  const initialRender = useRef<boolean>(true)

  useEffect(() => {
    if (initialRender.current) initialRender.current = false
    else {
      if (language === 'english') setLanguage('spanish')
      else setLanguage('english')
    }
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
