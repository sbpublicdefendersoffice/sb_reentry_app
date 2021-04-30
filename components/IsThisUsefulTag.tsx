import { useState, KeyboardEvent, MouseEvent } from 'react'
import { useRouter } from 'next/router'

import IsThisUsefulForm from './IsThisUsefulForm'
import useLanguage from '../hooks/useLanguage'
import { CopyHolder, Feedback } from '../types'

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
  const [feedbackInfo, setFeedbackInfo] = useState<Feedback | null>(null)
  const { asPath } = useRouter()
  const { language } = useLanguage()

  const activeCopy = copy[language]

  const { useful, yes, no } = copy[language]

  const showForm = ({
    currentTarget,
  }:
    | KeyboardEvent<HTMLAnchorElement>
    | MouseEvent<HTMLAnchorElement>): void => {
    if (asPath)
      setFeedbackInfo({
        isUseful: Boolean(+currentTarget.title),
        route: asPath,
        language,
        comment: '',
      })
  }

  return (
    <>
      {feedbackInfo && (
        <IsThisUsefulForm
          feedbackInfo={feedbackInfo}
          setFeedbackInfo={setFeedbackInfo}
          activeParentCopy={activeCopy}
        />
      )}
      <aside role="menubar" className={styles.IsThisUsefulTag}>
        <span role="term" className={styles.Text}>
          {useful}
        </span>
        <a
          tabIndex={0}
          title="1"
          role="link"
          className={styles.Link}
          onClick={showForm}
          onKeyDown={showForm}
        >
          {yes}
        </a>
        <a
          tabIndex={0}
          title="0"
          role="link"
          className={styles.Link}
          onClick={showForm}
          onKeyDown={showForm}
        >
          {no}
        </a>
      </aside>
    </>
  )
}

export default IsThisUsefulTag
