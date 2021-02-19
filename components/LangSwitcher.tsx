import { useState, useEffect, useRef } from 'react'

import useLanguage from '../hooks/useLanguage'

import styles from './LangSwitcher.module.css'

const LangSwitcher = () => {
  const { language, setLanguage } = useLanguage()

  const [isChecked, setIsChecked] = useState<boolean>(language === 'spanish')
  const [disabled, setDisabled] = useState<boolean>(false)
  const initialRender = useRef<boolean>(true)

  useEffect(() => {
    if (initialRender.current) initialRender.current = false
    else {
      setDisabled(true)
      if (language === 'english') setLanguage('spanish')
      else setLanguage('english')
      setTimeout(() => setDisabled(false), 400)
    }
  }, [isChecked])

  return (
    <label className={styles.LangSwitcher} htmlFor="lang-input">
      <span
        className={styles.label}
        style={{ color: isChecked ? 'var(--deselected)' : 'var(--white)' }}
      >
        {language === 'english' ? 'English' : 'Inglés'}
      </span>
      <input
        className={styles.input}
        type="checkbox"
        id="lang-input"
        onChange={() => setIsChecked(!isChecked)}
        checked={isChecked}
        disabled={disabled}
      />
      <span className={styles.slider} />
      <span
        className={styles.label}
        style={{ color: isChecked ? 'var(--white)' : 'var(--deselected)' }}
      >
        {language === 'english' ? 'Spanish' : 'Español'}
      </span>
    </label>
  )
}

export default LangSwitcher
