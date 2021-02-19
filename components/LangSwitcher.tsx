import { useState, useEffect, useRef } from 'react'

import useLanguage from '../hooks/useLanguage'
import { ENGLISH, SPANISH } from '../types/language'

import styles from './LangSwitcher.module.css'

const copy = {
  english: {
    english: 'English',
    spanish: 'Spanish',
  },
  spanish: {
    english: 'Inglés',
    spanish: 'Español',
  },
}

const LangSwitcher = () => {
  const { language, setLanguage } = useLanguage()

  const activeCopy = copy[language]

  const [isChecked, setIsChecked] = useState<boolean>(language === SPANISH)
  const [disabled, setDisabled] = useState<boolean>(false)
  const initialRender = useRef<boolean>(true)

  useEffect(() => {
    if (initialRender.current) initialRender.current = false
    else {
      setDisabled(true)
      if (language === ENGLISH) setLanguage(SPANISH)
      else setLanguage(ENGLISH)
      setTimeout(() => setDisabled(false), 400)
    }
  }, [isChecked])

  return (
    <label className={styles.LangSwitcher} htmlFor="lang-input">
      <span style={{ color: isChecked ? 'var(--deselected)' : 'var(--white)' }}>
        {activeCopy.english}
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
      <span style={{ color: isChecked ? 'var(--white)' : 'var(--deselected)' }}>
        {activeCopy.spanish}
      </span>
    </label>
  )
}

export default LangSwitcher
