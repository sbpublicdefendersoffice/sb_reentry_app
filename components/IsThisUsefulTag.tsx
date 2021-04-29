// import { useRouter } from 'next/router'

import useLanguage from '../hooks/useLanguage'
import { CopyHolder } from '../types/language'

import styles from './IsThisUsefulTag.module.css'

export const copy: CopyHolder = {
  english: {
    useful: 'Is this page useful?',
    yes: 'Yes',
    no: 'No',
  },
  spanish: {
    useful: '¿Es útil esta página?',
    yes: 'Si',
    no: 'No',
  },
}

const IsThisUsefulTag = () => {
  // const { asPath } = useRouter()
  const { language } = useLanguage()

  const { useful, yes, no } = copy[language]

  return (
    <aside role="menubar" className={styles.IsThisUsefulTag}>
      <span role="term" className={styles.Text}>
        {useful}
      </span>
      <a role="link" className={styles.Link}>
        {yes}
      </a>
      <a role="link" className={styles.Link}>
        {no}
      </a>
    </aside>
  )
}

export default IsThisUsefulTag
