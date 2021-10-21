import { useRef, MutableRefObject, ChangeEvent } from 'react'

import { CopyHolder } from '../types'
import { Card, Paragraph, Input } from '../ui'
import { useLanguage, useIntersectionStyle } from '../hooks'

import styles from './ExpungementForm.module.css'

//sign for both
// day, month, year, location, signature

const copy: CopyHolder = {
  english: {
    sign: 'Sign and Date',
    disclaimer:
      'I am submitting this form to apply for the services of appointed counsel. When this case ends, this information can also be used to decide, after a hearing, whether and how much I can be ordered to pay for the legal services provided. An order to pay for legal services can be enforced as a civil judgement against my property. (Penal Code Section 987.8)',
    fees: 'It will not violate your probation or any law if you fail to pay any ordered Public Defender fees. However, the order has the same effect as a judgement in a civil action. It can be enforced by the County against you and your property like any other money judgement.',
    certify:
      'I certify under penalty of perjury under the laws of the state of California that all of the above is true and correct. I have read and understand all of the above',
  },
  spanish: {
    sign: 'Firma y Fecha',
    disclaimer:
      'Estoy presentando este formulario para solicitar los servicios de un abogado. Cuando este caso termine, esta información también puede ser utilizada para decidir, después de una audiencia, si puedo ser ordenado a pagar por los servicios legales proporcionados y cuánto. Una orden para pagar servicios legales puede ser ejecutada como un juicio civil contra mi propiedad. (Código Penal, Sección 987.8)',
    fees: 'No violara su libertad condicional ni ninguna ley si usted no paga los honorarios del Defensor Público ordenado. Sin embargo, la orden tiene el mismo efecto que un fallo en una acción civil. Puede ser impuesta por el Condado contra usted y su propiedad como cualquier otro fallo de dinero.',
    certify:
      'Yo certifico bajo pena de perjurio según las leyes del estado de California que todo lo anterior es verdadero y correcto. He leído y entiendo todo lo anterior.',
  },
}

interface ExpungementSignatureProps {
  handleChange: ({
    target, // eslint-disable-line no-unused-vars
  }: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void
  animationClass: string
}

const ExpungementSignature = ({
  handleChange,
  animationClass,
}: ExpungementSignatureProps) => {
  const signRef: MutableRefObject<HTMLDivElement> = useRef()
  const { language } = useLanguage()

  const { sign, disclaimer, fees, certify } = copy[language]

  useIntersectionStyle(signRef, animationClass)

  return (
    <Card ref={signRef}>
      <Paragraph size="med-text" color="highlight">
        {sign}
      </Paragraph>
      <Paragraph>{disclaimer}</Paragraph>
      <Paragraph>{fees}</Paragraph>
      <Paragraph>{certify}</Paragraph>
    </Card>
  )
}

export default ExpungementSignature
