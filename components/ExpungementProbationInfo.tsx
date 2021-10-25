import { useRef, MutableRefObject, ChangeEvent } from 'react'

import { CopyHolder } from '../types'
import { Card, Paragraph, Input } from '../ui'
import { useLanguage, useIntersectionStyle } from '../hooks'

import styles from './ExpungementForm.module.css'

const copy: CopyHolder = {
  english: {
    probation_and_fees: 'Probation and Restitution',
    currently_on_probation: 'Are you currently on probation or parole?',
    yes: 'Yes',
    when_and_where: 'If yes, where?',
    fines: 'I paid all fines/fees/restitution',
    unsure: 'Unsure',
  },
  spanish: {
    probation_and_fees: 'Libertad Condicional y Restitución',
    currently_on_probation:
      '¿Está actualmente en libertad condicional o en libertad condicional?',
    yes: 'Si',
    when_and_where: '¿Si es así, donde?',
    fines: 'Pagué todas las multas / tarifas / restitución',
    unsure: 'Inseguro',
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
    fines,
    unsure,
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
          name="Are you currently on probation or parole"
          value="Are you currently on probation or parole_yes_On"
          id="current_probation_yes"
        />
        <label htmlFor="current_probation_no">No</label>
        <Input
          onChange={handleChange}
          type="radio"
          name="Are you currently on probation or parole"
          value="Are you currently on probation or parole_no_On"
          id="current_probation_no"
        />
        <label htmlFor="current_probation_unsure">{unsure}</label>
        <Input
          onChange={handleChange}
          type="radio"
          name="Are you currently on probation or parole"
          value="Are you currently on probation or parole_unsure If yes where_On"
          id="current_probation_unsure"
        />
        <label htmlFor="unsure If yes where">{when_and_where}</label>
        <Input onChange={handleChange} type="text" id="unsure If yes where" />
      </section>
      <section>
        <label className={styles.LabelMargin}>{fines}</label>
        <label htmlFor="owe_money_yes">{yes}</label>
        <Input
          onChange={handleChange}
          type="radio"
          name="I paid all finesfeesrestitution"
          value="I paid all finesfeesrestitution_yes_On"
          id="owe_money_yes"
        />
        <label htmlFor="owe_money_no">No</label>
        <Input
          onChange={handleChange}
          type="radio"
          name="I paid all finesfeesrestitution"
          value="I paid all finesfeesrestitution_no_On"
          id="owe_money_no"
        />
        <label htmlFor="owe_money_unsure">{unsure}</label>
        <Input
          onChange={handleChange}
          type="radio"
          name="I paid all finesfeesrestitution"
          value="I paid all finesfeesrestitution_unsure_On"
          id="owe_money_unsure"
        />
      </section>
    </Card>
  )
}

export default ExpungementProbationInfo
