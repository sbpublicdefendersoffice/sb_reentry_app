import { useRef, MutableRefObject, ChangeEvent } from 'react'

import { CopyHolder, ExpungementInfo } from '../types'
import { Card, Paragraph, Input } from '../ui'
import { useLanguage, useIntersectionStyle } from '../hooks'

import styles from './ExpungementForm.module.css'
const { Field } = styles

const copy: CopyHolder = {
  english: {
    sign: 'Sign and Date',
    certify:
      'I certify under penalty of perjury under the laws of the state of California that all of the above is true and correct. I have read and understand all of the above.',
    date: 'Date',
    signature: 'Signature (Please type your full name)',
  },
  spanish: {
    sign: 'Firma y Fecha',
    certify:
      'Yo certifico bajo pena de perjurio según las leyes del estado de California que todo lo anterior es verdadero y correcto. He leído y entiendo todo lo anterior.',
    date: 'Fecha',
    signature: 'Firma (Por favor escriba su nombre completo)',
  },
}

interface ExpungementSignatureProps {
  expungeInfo: ExpungementInfo
  handleChange: ({
    target, // eslint-disable-line no-unused-vars
  }: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void
  animationClass: string
}

const ExpungementSignature = ({
  expungeInfo,
  handleChange,
  animationClass,
}: ExpungementSignatureProps) => {
  const signRef: MutableRefObject<HTMLDivElement> = useRef()
  const { language } = useLanguage()

  const { sign, certify, date, signature } = copy[language]

  useIntersectionStyle(signRef, animationClass)

  return (
    <Card ref={signRef} className={styles.Card} id="sign">
      <section className={Field}>
        <Paragraph size="med-text" color="highlight">
          {sign}
        </Paragraph>
      </section>
      <section className={Field}></section>
      <section className={Field}>
        <label id="date-label" htmlFor="Date">
          {date}
        </label>
        <Input
          onChange={handleChange}
          type="date"
          id="Date"
          value={expungeInfo?.Date}
        />
      </section>
      <section className={Field}>
        <label id="sign-label" htmlFor="Signature">
          {signature}
        </label>
        <Input onChange={handleChange} type="text" id="Signature" />
      </section>
      <section className={Field}>
        <label
          id="cert-label"
          htmlFor="certified"
          style={{ textAlign: 'center' }}
        >
          {certify}
          <Input onChange={handleChange} type="checkbox" id="certified" />
        </label>
      </section>
    </Card>
  )
}

export default ExpungementSignature
