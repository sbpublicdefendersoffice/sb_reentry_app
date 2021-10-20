import { useRef, MutableRefObject, ChangeEvent } from 'react'

import { CopyHolder, ExpungementInfo } from '../types'
import { Card, Paragraph, Input } from '../ui'
import { useLanguage, useIntersectionStyle } from '../hooks'

import styles from './ExpungementForm.module.css'
const { Selected, Deslected, HR } = styles

const copy: CopyHolder = {
  english: {
    payment: 'Payment Options',
    info: 'If represented by the Public Defender, I can either agree to pay a fixed amount for their services, or I can ask the judge to decide if and how much I should pay. If I ask a judge to decide if and how much I should pay for Public Defender services, I understand that the hourly rate set by the County is $95 per hour worked on my case. If I give up the right to a hearing, I can agree to be charged $125 for representation in misdemeanor cases, and $175 for representation in felony cases.',
    initial: 'PLEASE CHOOSE AN OPTION AND INITIAL',
    no_reimburse:
      'I DO NOT want a reimbursement hearing; I agree to pay $125 if charged with a misdemeanor and $175 if charged with a felony.',
    hearing:
      'I want a judge to decide if and how much I should pay for legal services. The Public Defender will not represent me at this hearing and their role will be to present the information necessary to make an order for reimbursement. The Court can order the reimbursement hearing when the case ends, and up to six months after the case ends. If I do not agree with the amount set by the court at this hearing, I must immediately let the court know I object to the fee amount and my reasons for disagreeing.',
  },
  spanish: {
    payment: 'Opciones de pago',
    info: 'Si soy representado por el Defensor Público, yo pudiera aceptar pagar una tarifa fija por sus servicios, o pedirle al juez que decida si debo paga y la cantidad. Si le pido al juez que decida si debo paga y la cantidad por los servicios del Defensor Público, entiendo que la tarifa establecida por el Condado es de $95 por hora, por cada hora trabajada en mi caso. Si renuncio al derecho a una audiencia, yo acepto pagar $125 por representación en un caso de delitos menores y $175 por un caso de delitos mayor.',
    initial: 'POR FAVOR ELIJA UNA OPCIÓN E INICIAL',
    no_reimburse:
      'YO NO quiero una audiencia de reembolso; Estoy de acuerdo en pagar $125 si soy acusado de un delito menor (misdeameanor) y $175 si soy acusado de un delito mayor (felonía).',
    hearing:
      'Yo quiero que un juez decida si debo pagar y cuánto por servicios legales. El Defensor Público no me representará en esta audiencia y su función será presentar la información necesaria para hacer un pedido de reembolso. El Tribunal puede ordenar la audiencia de reembolso cuando el caso termine, y hasta seis meses después de que el caso termine. Si no estoy de acuerdo con la cantidad fijada por el tribunal en la audiencia, debo informar al tribunal inmediatamente que me opongo a la cantidad y mis razones por las cuales estoy desacuerdo.',
  },
}

interface ExpungementFinanceOptionsProps {
  expungeInfo: ExpungementInfo
  handleChange: ({
    target, // eslint-disable-line no-unused-vars
  }: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void
  animationClass: string
}

const ExpungementFinanceOptions = ({
  expungeInfo,
  handleChange,
  animationClass,
}: ExpungementFinanceOptionsProps) => {
  const optRef: MutableRefObject<HTMLDivElement> = useRef()
  const { language } = useLanguage()

  useIntersectionStyle(optRef, animationClass)

  const { payment, info, initial, no_reimburse, hearing } = copy[language]

  return (
    <Card ref={optRef}>
      <Paragraph size="med-text" color="highlight">
        {payment}
      </Paragraph>
      <Paragraph>{info}</Paragraph>
      <hr className={HR} />
      <section>
        <label htmlFor="hearing_option_no_reimbursement">{no_reimburse}</label>
        <Input
          type="radio"
          onChange={handleChange}
          name="hearing_or_no"
          value="hearing_option_judge_hearing"
          id="hearing_option_no_reimbursement"
        />
      </section>
      <hr className={HR} />
      <section>
        <label htmlFor="hearing_option_no_reimbursement">{hearing}</label>
        <Input
          type="radio"
          onChange={handleChange}
          name="hearing_or_no"
          value="hearing_option_no_reimbursement"
          id="hearing_option_judge_hearing"
        />
      </section>
      <section>
        <label
          htmlFor="hearing_option_initals"
          className={
            expungeInfo?.hearing_option_no_reimbursement ||
            expungeInfo?.hearing_option_judge_hearing
              ? Selected
              : Deslected
          }
        >
          {initial}
        </label>
        <Input
          onChange={handleChange}
          type="text"
          id="hearing_option_initals"
        />
      </section>
    </Card>
  )
}

export default ExpungementFinanceOptions
