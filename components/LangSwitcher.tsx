import { useState, useEffect, useRef, MutableRefObject } from 'react'

import { useLanguage, useGlobalSearch } from '../hooks'
import { ENGLISH, SPANISH } from '../constants/language'

import styles from './LangSwitcher.module.css'

const disabledTimeInMs: number = 400

const LangSwitcher = () => {
  const { language, setLanguage } = useLanguage()
  const { setSearchResults } = useGlobalSearch()

  const [isChecked, setIsChecked] = useState<boolean>(language === SPANISH)
  const [isDisabled, setIsDisabled] = useState<boolean>(false)

  const isInitialRender: MutableRefObject<boolean> = useRef<boolean>(true)

  useEffect((): void => {
    if (!isInitialRender.current) setSearchResults(null)
  }, [language])

  useEffect((): void => {
    if (isInitialRender.current) isInitialRender.current = false
    else {
      setIsDisabled(true)
      if (language === ENGLISH) setLanguage(SPANISH)
      else setLanguage(ENGLISH)
      setTimeout((): void => setIsDisabled(false), disabledTimeInMs)
    }
  }, [isChecked])

  return (
    <label className={styles.LangSwitcher} htmlFor="lang-input">
      <span
        className={styles.label}
        style={{
          color: isChecked ? 'var(--deselected)' : 'var(--primary)',
          fontWeight: isChecked ? 100 : 400,
        }}
      >
        English
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
          color: isChecked ? 'var(--primary)' : 'var(--deselected)',
          fontWeight: isChecked ? 400 : 100,
        }}
      >
        Español
      </span>
    </label>
  )
}

export default LangSwitcher
