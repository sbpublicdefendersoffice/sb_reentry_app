import {
  useRef,
  useEffect,
  MutableRefObject,
  ChangeEvent,
  Dispatch,
  SetStateAction,
} from 'react'

import { CopyHolder, ExpungementInfo } from '../types'
import { Card, Paragraph, Input } from '../ui'
import { useLanguage, useIntersectionStyle } from '../hooks'

import styles from './ExpungementForm.module.css'
const { Field } = styles

const copy: CopyHolder = {
  english: {
    sign: 'Sign and Date',
    disclaimer:
      'I am submitting this form to apply for the services of appointed counsel. When this case ends, this information can also be used to decide, after a hearing, whether and how much I can be ordered to pay for the legal services provided. An order to pay for legal services can be enforced as a civil judgement against my property. (Penal Code Section 987.8)',
    fees: 'It will not violate your probation or any law if you fail to pay any ordered Public Defender fees. However, the order has the same effect as a judgement in a civil action. It can be enforced by the County against you and your property like any other money judgement.',
    certify:
      'I certify under penalty of perjury under the laws of the state of California that all of the above is true and correct. I have read and understand all of the above.',
    date: 'Date',
    signature: 'Signature (Please type your full name)',
  },
  spanish: {
    sign: 'Firma y Fecha',
    disclaimer:
      'Estoy presentando este formulario para solicitar los servicios de un abogado. Cuando este caso termine, esta información también puede ser utilizada para decidir, después de una audiencia, si puedo ser ordenado a pagar por los servicios legales proporcionados y cuánto. Una orden para pagar servicios legales puede ser ejecutada como un juicio civil contra mi propiedad. (Código Penal, Sección 987.8)',
    fees: 'No violara su libertad condicional ni ninguna ley si usted no paga los honorarios del Defensor Público ordenado. Sin embargo, la orden tiene el mismo efecto que un fallo en una acción civil. Puede ser impuesta por el Condado contra usted y su propiedad como cualquier otro fallo de dinero.',
    certify:
      'Yo certifico bajo pena de perjurio según las leyes del estado de California que todo lo anterior es verdadero y correcto. He leído y entiendo todo lo anterior.',
    date: 'Fecha',
    signature: 'Firma (Por favor escriba su nombre completo)',
  },
}

interface ExpungementSignatureProps {
  setExpungeInfo: Dispatch<SetStateAction<ExpungementInfo>>
  expungeInfo: ExpungementInfo
  handleChange: ({
    target, // eslint-disable-line no-unused-vars
  }: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void
  animationClass: string
}

const ExpungementSignature = ({
  setExpungeInfo,
  expungeInfo,
  handleChange,
  animationClass,
}: ExpungementSignatureProps) => {
  const signRef: MutableRefObject<HTMLDivElement> = useRef()
  const { language } = useLanguage()

  const { sign, disclaimer, fees, certify, date, signature } = copy[language]
  useEffect(
    () =>
      setExpungeInfo(val => ({
        ...val,
        Date: new Date().toISOString().substring(0, 10),
      })),
    [],
  )

  useIntersectionStyle(signRef, animationClass)

  return (
    <Card ref={signRef} className={styles.Card} id="sign">
      <Paragraph size="med-text" color="highlight">
        {sign}
      </Paragraph>
      <section className={Field}>
        <Paragraph>{disclaimer}</Paragraph>
        <Paragraph>{fees}</Paragraph>
      </section>
      <section className={Field}></section>
      <section className={Field}>
        <label htmlFor="Date">{date}</label>
        <Input
          onChange={handleChange}
          type="date"
          id="Date"
          value={expungeInfo?.Date}
        />
      </section>
      <section className={Field}>
        <label htmlFor="Signature">{signature}</label>
        <Input onChange={handleChange} type="text" id="Signature" />
      </section>
      <section className={Field}>
        <label htmlFor="certified" style={{ textAlign: 'center' }}>
          {certify}
          <Input onChange={handleChange} type="checkbox" id="certified" />
        </label>
      </section>
    </Card>
  )
}

export default ExpungementSignature
