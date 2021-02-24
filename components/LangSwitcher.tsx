import { useState, useEffect, useRef, MutableRefObject } from 'react'

import useLanguage from '../hooks/useLanguage'
import { ENGLISH, SPANISH, CopyHolder } from '../types/language'

import styles from './LangSwitcher.module.css'

const copy: CopyHolder = {
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
  const [isDisabled, setIsDisabled] = useState<boolean>(false)

  const isInitialRender: MutableRefObject<boolean> = useRef<boolean>(true)

  useEffect((): void => {
    if (isInitialRender.current) isInitialRender.current = false
    else {
      setIsDisabled(true)
      if (language === ENGLISH) setLanguage(SPANISH)
      else setLanguage(ENGLISH)
      setTimeout((): void => setIsDisabled(false), 400)
    }
  }, [isChecked])

  return (
    <label className={styles.LangSwitcher} htmlFor="lang-input">
      <span
        className={styles.label}
        style={{
          color: isChecked ? 'var(--deselected)' : 'var(--dark)',
          fontWeight: isChecked ? 100 : 400,
        }}
      >
        {activeCopy.english}
      </span>
      <input
        className={styles.input}
        type="checkbox"
        id="lang-input"
        onChange={() => setIsChecked(!isChecked)}
        checked={isChecked}
        disabled={isDisabled}
      />
      <span className={styles.slider} />
      <span
        className={styles.label}
        style={{
          color: isChecked ? 'var(--dark)' : 'var(--deselected)',
          fontWeight: isChecked ? 400 : 100,
        }}
      >
        {activeCopy.spanish}
      </span>
    </label>
  )
}

export default LangSwitcher
