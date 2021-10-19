import { useRef, MutableRefObject, ChangeEvent, Fragment } from 'react'

import { CopyHolder } from '../types'
import { Card, Paragraph, Input } from '../ui'
import { useLanguage, useIntersectionStyle } from '../hooks'

import styles from './ExpungementForm.module.css'

const copy: CopyHolder = {
  english: {
    caseInfo: 'Case Information',
    case_number: 'Case Number',
    case_attorney: 'Attorney',
    case_charges: 'Charges',
    case_felony: 'Felony',
    case_misdemeanor: 'Misdemeanor',
    case_date_convicted: 'Date Convicted',
    on_probation: 'Were you placed on probation?',
    probation_duration: 'If yes, for how long?',
    probation_violation: 'Did you ever violate your probation?',
    yes: 'Yes',
  },
  spanish: {
    caseInfo: 'Información del caso',
    case_number: 'Número de caso',
    case_attorney: 'Abogado',
    case_charges: 'Cargos',
    case_felony: 'Delito Grave',
    case_misdemeanor: 'Delito Menor',
    case_date_convicted: 'Fecha de Condena',
    on_probation: '¿Fue puesto en libertad condicional?',
    probation_duration: 'Si es asi, por cuanto tiempo?',
    probation_violation: '¿Alguna vez violó su libertad condicional?',
    yes: 'Si',
  },
}

interface ExpungementCaseInfoProps {
  handleChange: ({
    target, // eslint-disable-line no-unused-vars
  }: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void
  animationClass: string
}

const ExpungementCaseInfo = ({
  handleChange,
  animationClass,
}: ExpungementCaseInfoProps) => {
  const caseRef: MutableRefObject<HTMLDivElement> = useRef()
  const { language } = useLanguage()

  const {
    caseInfo,
    case_number,
    case_charges,
    case_attorney,
    case_felony,
    case_misdemeanor,
    case_date_convicted,
    on_probation,
    probation_duration,
    probation_violation,
    yes,
  } = copy[language]

  useIntersectionStyle(caseRef, animationClass)

  return (
    <Card ref={caseRef}>
      <Paragraph size="med-text" color="highlight">
        {caseInfo}
      </Paragraph>
      {[1, 2, 3].map((i: number) => (
        <Fragment key={i}>
          <section>
            <label htmlFor={`case_num_${i}`}>{case_number}</label>
            <Input onChange={handleChange} type="text" id={`case_num_${i}`} />
            <label htmlFor={`case_attorney_${i}`}>{case_attorney}</label>
            <Input
              onChange={handleChange}
              type="text"
              id={`case_attorney_${i}`}
            />
          </section>
          <section>
            <label htmlFor={`case_charges_${i}`}>{case_charges}</label>
            <Input
              onChange={handleChange}
              type="text"
              id={`case_charges_${i}`}
            />
            <label htmlFor={`case_felony_${i}`}>{case_felony}</label>
            <Input
              onChange={handleChange}
              type="radio"
              name={`felony_or_misdemeanor_${i}`}
              value={`case_misdemeanor_${i}`}
              id={`case_felony_${i}`}
            />
            <label htmlFor={`case_misdemeanor_${i}`}>{case_misdemeanor}</label>
            <Input
              onChange={handleChange}
              type="radio"
              name={`felony_or_misdemeanor_${i}`}
              value={`case_felony_${i}`}
              id={`case_misdemeanor_${i}`}
            />
          </section>
          <section>
            <label htmlFor={`case_date_convicted_${i}`}>
              {case_date_convicted}
            </label>
            <Input
              onChange={handleChange}
              type="date"
              id={`case_date_convicted_${i}`}
            />
          </section>
          <section>
            <label className={styles.LabelMargin}>{on_probation}</label>
            <label htmlFor={`case_probation_formal_${i}`}>Formal</label>
            <Input
              onChange={handleChange}
              type="radio"
              name={`formal_or_informal_${i}`}
              value={`case_probation_informal_${i}`}
              id={`case_probation_formal_${i}`}
            />
            <label htmlFor={`case_probation_informal_${i}`}>Informal</label>
            <Input
              onChange={handleChange}
              type="radio"
              name={`formal_or_informal_${i}`}
              value={`case_probation_formal_${i}`}
              id={`case_probation_informal_${i}`}
            />
            <label htmlFor={`case_probation_duration_${i}`}>
              {probation_duration}
            </label>
            <Input
              onChange={handleChange}
              type="text"
              id={`case_probation_duration_${i}`}
            />
          </section>
          <section>
            <label className={styles.LabelMargin}>{probation_violation}</label>
            <label htmlFor={`case_probation_violate_${i}`}>{yes}</label>
            <Input
              onChange={handleChange}
              type="radio"
              name={`violate_or_no_${i}`}
              value={`case_probation_no_violate_${i}`}
              id={`case_probation_violate_${i}`}
            />
            <label htmlFor={`case_probation_no_violate_${i}`}>No</label>
            <Input
              onChange={handleChange}
              type="radio"
              name={`violate_or_no_${i}`}
              value={`case_probation_violate_${i}`}
              id={`case_probation_no_violate_${i}`}
            />
          </section>
          {i !== 3 && <hr className={styles.HR} />}
        </Fragment>
      ))}
    </Card>
  )
}

export default ExpungementCaseInfo
