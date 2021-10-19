import { useRef, MutableRefObject, ChangeEvent } from 'react'

import { CopyHolder } from '../types'
import { Card, Paragraph, Input } from '../ui'
import { useLanguage, useIntersectionStyle } from '../hooks'

import styles from './ExpungementForm.module.css'

const copy: CopyHolder = {
  english: {
    probation_and_fees: 'Probation and Restitution',
    currently_on_probation:
      'Are you currently on probation in this county or another county?',
    yes: 'Yes',
    when_and_where:
      'If yes, please state where and when you were granted probation',
    arrests:
      'Have you had any arrests or convictions since you were last granted probation?',
    charges: 'If yes, please list case numbers and charges',
    fines: 'Do you currently owe any fines, fees, or restitution?',
    how_much: 'If yes, how much?',
  },
  spanish: {
    probation_and_fees: 'Libertad Condicional y Restitución',
    currently_on_probation:
      '¿Está actualmente en libertad condicional en este condado o en otro condado?',
    yes: 'Si',
    when_and_where:
      'Si es así, indique dónde y cuándo se le concedió la libertad condicional',
    arrests:
      '¿Ha tenido arrestos o condenas desde la última vez que se le concedió la libertad condicional?',
    charges: 'Si es así, enumere los números de caso y los cargos',
    fines: '¿Actualmente adeuda alguna multa, tarifa o restitución?',
    how_much: 'Si es así, ¿cuánto?',
  },
}

interface ExpungementProbationInfoProps {
  handleChange: ({
    target, // eslint-disable-line no-unused-vars
  }: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void
  animationClass: string
}

const ExpungementProbationInfo = ({
  handleChange,
  animationClass,
}: ExpungementProbationInfoProps) => {
  const proRef: MutableRefObject<HTMLDivElement> = useRef()
  const { language } = useLanguage()

  const {
    probation_and_fees,
    currently_on_probation,
    yes,
    when_and_where,
    arrests,
    charges,
    fines,
    how_much,
  } = copy[language]

  useIntersectionStyle(proRef, animationClass)

  return (
    <Card ref={proRef}>
      <Paragraph size="med-text" color="highlight">
        {probation_and_fees}
      </Paragraph>
      <section>
        <label className={styles.LabelMargin}>{currently_on_probation}</label>
        <label htmlFor="current_probation_yes">{yes}</label>
        <Input
          onChange={handleChange}
          type="radio"
          name="on_probation"
          value="current_probation_no"
          id="current_probation_yes"
        />
        <label htmlFor="current_probation_no">No</label>
        <Input
          onChange={handleChange}
          type="radio"
          name="on_probation"
          value="current_probation_yes"
          id="current_probation_no"
        />
        <label htmlFor="current_probation_info">{when_and_where}</label>
        <Input
          onChange={handleChange}
          type="text"
          id="current_probation_info"
        />
      </section>
      <section>
        <label className={styles.LabelMargin}>{arrests}</label>
        <label htmlFor="arrests_since_probation_yes">{yes}</label>
        <Input
          onChange={handleChange}
          type="radio"
          name="arrests_since_probation"
          value="arrests_since_probation_no"
          id="arrests_since_probation_yes"
        />
        <label htmlFor="arrests_since_probation_no">No</label>
        <Input
          onChange={handleChange}
          type="radio"
          name="arrests_since_probation"
          value="arrests_since_probation_yes"
          id="arrests_since_probation_no"
        />
        <label htmlFor="arrests_since_probation_info">{charges}</label>
        <Input
          onChange={handleChange}
          type="text"
          id="arrests_since_probation_info"
        />
      </section>
      <section>
        <label className={styles.LabelMargin}>{fines}</label>
        <label htmlFor="owe_money_yes">{yes}</label>
        <Input
          onChange={handleChange}
          type="radio"
          name="owe_money"
          value="owe_money_no"
          id="owe_money_yes"
        />
        <label htmlFor="owe_money_no">No</label>
        <Input
          onChange={handleChange}
          type="radio"
          name="owe_money"
          value="owe_money_yes"
          id="owe_money_no"
        />
        <label htmlFor="owe_money_amount">{how_much} $</label>
        <Input onChange={handleChange} type="number" id="owe_money_amount" />
      </section>
    </Card>
  )
}

export default ExpungementProbationInfo
