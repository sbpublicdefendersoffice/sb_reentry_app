import { useRef, MutableRefObject, ChangeEvent } from 'react'

import { CopyHolder } from '../types'
import { Card, Paragraph, Input } from '../ui'
import { useLanguage, useIntersectionStyle } from '../hooks'

// marital status
// marital_status_single, marital_status_married,  marital_status_separated, marital_status_divorced,marital_status_commonlaw

// military experience
// veteran_yes, veteran_no, military_branch, discharge_date,

const copy: CopyHolder = {
  english: {
    status: 'Marital and Veteran Status',
    marital: 'Marital and Veteran Status',
  },
  spanish: { status: 'Estado Civil y Veterano', marital: 'Estado Civil' },
}

import styles from './ExpungementForm.module.css'

interface ExpungementMaritalAndVeteranStatus {
  handleChange: ({
    target, // eslint-disable-line no-unused-vars
  }: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void
  animationClass: string
}

const ExpungementMaritalAndVeteranStatus = ({
  handleChange,
  animationClass,
}: ExpungementMaritalAndVeteranStatus) => {
  const vetRef: MutableRefObject<HTMLDivElement> = useRef()
  const { language } = useLanguage()

  const { status, marital } = copy[language]

  return (
    <Card ref={vetRef}>
      <Paragraph size="med-text" color="highlight">
        {status}
      </Paragraph>
      <section>
        <label className={styles.LabelMargin}>{marital}</label>
        {/* <label htmlFor="current_probation_yes"></label>
        <Input
          onChange={handleChange}
          type="radio"
          name="on_probation"
          value="current_probation_no"
          id="current_probation_yes"
        /> */}
      </section>
    </Card>
  )
}

export default ExpungementMaritalAndVeteranStatus
