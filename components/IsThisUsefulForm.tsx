import {
  useEffect,
  Dispatch,
  SetStateAction,
  MouseEvent,
  ChangeEvent,
  FormEvent,
} from 'react'
import { useRouter } from 'next/router'

import { siteTitle } from '../constants/copy'
import useLanguage from '../hooks/useLanguage'
import { Paragraph, Button } from '../ui'
import { Feedback, CopyHolder } from '../types'
import { POST } from '../helpers/validators'

export interface IsThisUsefulFormProps {
  feedbackInfo: Feedback
  setFeedbackInfo: Dispatch<SetStateAction<Feedback | null>>
  activeParentCopy: { [key: string]: string }
}

import styles from './IsThisUsefulForm.module.css'

export const copy: CopyHolder = {
  english: {
    usefulHeading: `Great! What do you like about ${siteTitle}?`,
    notUsefulHeading:
      "We're sorry this page isn't useful. What could we do better?",
    buttonCopy: 'Send us feedback',
  },
  spanish: {
    usefulHeading: `¡Estupendo! ¿Qué le gusta de ${siteTitle}?`,
    notUsefulHeading:
      'Lamentamos que esta página no sea útil. ¿Que podriamos hacer mejor?',
    buttonCopy: 'Enviar comentarios',
  },
}

const IsThisUsefulForm = ({
  feedbackInfo,
  setFeedbackInfo,
  activeParentCopy,
}: IsThisUsefulFormProps) => {
  const { asPath } = useRouter()
  const { language } = useLanguage()

  useEffect(
    (): void => setFeedbackInfo(prevState => ({ ...prevState, language })),
    [language],
  )

  useEffect(
    (): void => setFeedbackInfo(prevState => ({ ...prevState, route: asPath })),
    [asPath],
  )

  const { is_useful, comment } = feedbackInfo
  const { useful, yes, no } = activeParentCopy
  const { usefulHeading, notUsefulHeading, buttonCopy } = copy[language]

  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault()
    if (feedbackInfo) {
      const postCommentToAirtable: Response = await fetch(
        '/api/airtablecomment',
        {
          method: POST,
          body: JSON.stringify(feedbackInfo),
        },
      )

      const apiResponse: string = await postCommentToAirtable.json()
      console.log(apiResponse)
    }
  }

  const setIsUseful = ({
    currentTarget,
  }: MouseEvent<HTMLInputElement> | ChangeEvent<HTMLInputElement>): void =>
    setFeedbackInfo(prevState => ({
      ...prevState,
      is_useful: +currentTarget.value,
    }))

  const setComment = ({ target }: ChangeEvent<HTMLTextAreaElement>): void =>
    setFeedbackInfo(prevState => ({
      ...prevState,
      comment: target.value,
    }))

  return (
    <form
      role="form"
      className={styles.IsThisUsefulForm}
      onSubmit={handleSubmit}
    >
      <div
        role="switch"
        className={styles.Close}
        onClick={() => setFeedbackInfo(null)}
      >
        <span>X</span>
      </div>
      <div className={styles.Holder}>
        <Paragraph role="article" className={styles.Heading} size="med-text">
          {useful}
        </Paragraph>
        <div className={styles.RadioSection}>
          <label role="aria-label" htmlFor="useful" className={styles.Label}>
            {yes}
          </label>
          <input
            role="radio"
            className={styles.Radio}
            checked={!!is_useful}
            type="radio"
            id="useful"
            name="useful"
            value="1"
            onClick={setIsUseful}
            onChange={setIsUseful}
          />
          <label
            role="aria-label"
            htmlFor="not-useful"
            className={styles.Label}
          >
            {no}
          </label>
          <input
            role="radio"
            className={styles.Radio}
            checked={!is_useful}
            type="radio"
            id="not-useful"
            name="useful"
            value="0"
            onClick={setIsUseful}
            onChange={setIsUseful}
          />
        </div>
        <Paragraph role="article" className={styles.Heading} size="med-text">
          {is_useful ? usefulHeading : notUsefulHeading}
        </Paragraph>
        <textarea
          role="textbox"
          className={styles.Textbox}
          value={comment}
          onChange={setComment}
          spellCheck
        />
        <div className={styles.Button}>
          <Button role="button" type="submit">
            {buttonCopy}
          </Button>
        </div>
      </div>
    </form>
  )
}

export default IsThisUsefulForm
