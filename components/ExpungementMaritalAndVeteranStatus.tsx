import { useRef, MutableRefObject, ChangeEvent } from 'react'

import { CopyHolder } from '../types'
import { Card, Paragraph, Input } from '../ui'
import { useLanguage, useIntersectionStyle } from '../hooks'

const copy: CopyHolder = {
  english: {
    status: 'Marital and Veteran Status',
    marital: 'Marital Status',
    single: 'Single',
    married: 'Married',
    separated: 'Separated',
    divorced: 'Divorced',
    commonlaw: 'Common-law',
    veteran: 'Are you a veteran?',
    yes: 'Yes',
    branch: 'If so, what branch did you serve in?',
    discharge: 'Discharge Date',
  },
  spanish: {
    status: 'Estado Civil y Veterano',
    marital: 'Estado Civil',
    single: 'Soltero',
    married: 'Casado',
    separated: 'Separado',
    divorced: 'Divorciado',
    commonlaw: 'Viviendo juntos',
    veteran: '¿Eres un veterano?',
    yes: 'Si',
    branch: 'Si es así, ¿en qué rama sirvió?',
    discharge: 'Fecha de alta',
  },
}

import styles from './ExpungementForm.module.css'

interface ExpungementMaritalAndVeteranStatusProps {
  handleChange: ({
    target, // eslint-disable-line no-unused-vars
  }: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void
  animationClass: string
}

const ExpungementMaritalAndVeteranStatus = ({
  handleChange,
  animationClass,
}: ExpungementMaritalAndVeteranStatusProps) => {
  const vetRef: MutableRefObject<HTMLDivElement> = useRef()
  const { language } = useLanguage()

  useIntersectionStyle(vetRef, animationClass)

  const {
    status,
    marital,
    single,
    married,
    separated,
    divorced,
    commonlaw,
    veteran,
    yes,
    branch,
    discharge,
  } = copy[language]

  return (
    <Card ref={vetRef}>
      <Paragraph size="med-text" color="highlight">
        {status}
      </Paragraph>
      <section>
        <label className={styles.LabelMargin}>{marital}</label>
        <label htmlFor="marital_status_single">{single}</label>
        <Input
          onChange={handleChange}
          type="radio"
          name="Marital Status"
          value="Marital Status_Single_On"
          id="marital_status_single"
        />
        <label htmlFor="marital_status_married">{married}</label>
        <Input
          onChange={handleChange}
          type="radio"
          name="Marital Status"
          value="Marital Status_Married_On"
          id="marital_status_married"
        />
        <label htmlFor="marital_status_separated">{separated}</label>
        <Input
          onChange={handleChange}
          type="radio"
          name="Marital Status"
          value="Marital Status_Separated_On"
          id="marital_status_separated"
        />
        <label htmlFor="marital_status_divorced">{divorced}</label>
        <Input
          onChange={handleChange}
          type="radio"
          name="Marital Status"
          value="Marital Status_Divorced_On"
          id="marital_status_divorced"
        />
        <label htmlFor="marital_status_commonlaw">{commonlaw}</label>
        <Input
          onChange={handleChange}
          type="radio"
          name="Marital Status"
          value="Marital Status_CommonLaw_On"
          id="marital_status_commonlaw"
        />
      </section>
      <section>
        <label className={styles.LabelMargin}>{veteran}</label>
        <label htmlFor="veteran_yes">{yes}</label>
        <Input
          onChange={handleChange}
          type="radio"
          name="Are you a veteran"
          value="Are you a veteran_Yes_On"
          id="veteran_yes"
        />
        <label htmlFor="veteran_no">No</label>
        <Input
          onChange={handleChange}
          type="radio"
          name="Are you a veteran"
          value="Are you a veteran_No_On"
          id="veteran_no"
        />
        <label htmlFor="If yes which branch">{branch}</label>
        <Input onChange={handleChange} type="text" id="If yes which branch" />
      </section>
      <section>
        <label htmlFor="Discharge Date">{discharge}</label>
        <Input onChange={handleChange} type="date" id="Discharge Date" />
      </section>
    </Card>
  )
}

export default ExpungementMaritalAndVeteranStatus
