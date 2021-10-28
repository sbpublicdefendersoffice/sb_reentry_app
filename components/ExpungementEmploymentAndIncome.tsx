import { useRef, MutableRefObject, ChangeEvent } from 'react'

import { CopyHolder } from '../types'
import { Card, Paragraph, Input } from '../ui'
import { useLanguage, useIntersectionStyle } from '../hooks'

import styles from './ExpungementForm.module.css'
const { LabelMargin, VertMargin } = styles

const copy: CopyHolder = {
  english: {
    employ: 'Employment and Income',
    employer_name: 'Employer Name',
    address: 'Employer Address',
    duration: 'Length of Time at Job',
    pay: 'Take Home Pay',
    week: 'Per Week',
    month: 'Per Month',
    benefits: 'Umemployment Benefits?',
    yes: 'Yes',
    amount: 'Benefits Amount',
    partner_employ: 'Partner Employment and Income',
  },
  spanish: {
    employ: 'Empleo e Ingresos',
    employer_name: 'Nombre del empleador',
    address: 'Dirección del empleado',
    duration: 'Tiempo en el trabajo',
    pay: 'Salario Neto',
    week: 'Por Semana',
    month: 'Per Mensual',
    benefits: 'Beneficios',
    yes: 'Si',
    amount: 'Monto de Beneficios',
    partner_employ: 'Empleo e Ingresos de Socios',
  },
}

interface ExpungementEmploymentAndIncomeProps {
  handleChange: ({
    target, // eslint-disable-line no-unused-vars
  }: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void
  animationClass: string
}

const ExpungementEmploymentAndIncome = ({
  handleChange,
  animationClass,
}: ExpungementEmploymentAndIncomeProps) => {
  const employRef: MutableRefObject<HTMLDivElement> = useRef()
  const { language } = useLanguage()

  useIntersectionStyle(employRef, animationClass)

  const {
    employ,
    employer_name,
    address,
    duration,
    pay,
    week,
    month,
    benefits,
    yes,
    amount,
    partner_employ,
  } = copy[language]

  return (
    <Card ref={employRef}>
      <Paragraph size="med-text" color="highlight">
        {employ}
      </Paragraph>
      <section>
        <label htmlFor="Employer Name">{employer_name}</label>
        <Input onChange={handleChange} type="text" id="Employer Name" />
      </section>
      <section>
        <label htmlFor="Address-0">{address}</label>
        <Input onChange={handleChange} type="text" id="Address-0" />
      </section>
      <section>
        <label htmlFor="Length of Time">{duration}</label>
        <Input onChange={handleChange} type="text" id="Length of Time" />
      </section>
      <section>
        <label htmlFor="Supervisor">Supervisor</label>
        <Input onChange={handleChange} type="text" id="Supervisor" />
      </section>
      <section>
        <label htmlFor="Take Home Pay">{pay} $</label>
        <Input onChange={handleChange} type="number" id="Take Home Pay" />
        <label htmlFor="Weekly Take Home Pay">{week}</label>
        <Input
          onChange={handleChange}
          type="checkbox"
          id="Weekly Take Home Pay"
        />
        <label htmlFor="Monthly">{month}</label>
        <Input onChange={handleChange} type="checkbox" id="Monthly" />
      </section>
      <section>
        <label className={LabelMargin}>{benefits}</label>
        <label htmlFor="unemployed_benefits_yes">{yes}</label>
        <Input
          onChange={handleChange}
          type="radio"
          name="Unemployment Benefits"
          value="Unemployment Benefits_Yes_On"
          id="unemployed_benefits_yes"
        />
        <label htmlFor="unemployed_benefits_no">No</label>
        <Input
          onChange={handleChange}
          type="radio"
          name="Unemployment Benefits"
          value="Unemployment Benefits_No Amount_On"
          id="unemployed_benefits_no"
        />
        <label htmlFor="No Amount">{amount} $</label>
        <Input onChange={handleChange} type="number" id="No Amount" />
      </section>
      <hr className={VertMargin} />
      <Paragraph size="med-text" color="highlight">
        {partner_employ}
      </Paragraph>
      <section>
        <label htmlFor="Employer Name-0">{employer_name}</label>
        <Input onChange={handleChange} type="text" id="Employer Name-0" />
      </section>
      <section>
        <label htmlFor="Address-1">{address}</label>
        <Input onChange={handleChange} type="text" id="Address-1" />
      </section>
      <section>
        <label htmlFor="Length of Time-0">{duration}</label>
        <Input onChange={handleChange} type="text" id="Length of Time-0" />
      </section>
      <section>
        <label htmlFor="Supervisor-0">Supervisor</label>
        <Input onChange={handleChange} type="text" id="Supervisor-0" />
      </section>
      <section>
        <label htmlFor="Weekly Take Home Pay-0">{pay} $</label>
        <Input
          onChange={handleChange}
          type="number"
          id="Weekly Take Home Pay-0"
        />
        <label htmlFor="Weekly">{week}</label>
        <Input onChange={handleChange} type="checkbox" id="Weekly" />
        <label htmlFor="Monthly-0">{month}</label>
        <Input onChange={handleChange} type="checkbox" id="Monthly-0" />
      </section>
      <section>
        <label className={LabelMargin}>{benefits}</label>
        <label htmlFor="unemployed_benefits_yes">{yes}</label>
        <Input
          onChange={handleChange}
          type="radio"
          name="Unemployment Benefits-0"
          value="Unemployment Benefits_Yes-0_On"
          id="unemployed_benefits_yes"
        />
        <label htmlFor="unemployed_benefits_no">No</label>
        <Input
          onChange={handleChange}
          type="radio"
          name="Unemployment Benefits-0"
          value="Unemployment Benefits_No Amount-0_On"
          id="unemployed_benefits_no"
        />
        <label htmlFor="No Amount-0">{amount} $</label>
        <Input onChange={handleChange} type="number" id="No Amount-0" />
      </section>
    </Card>
  )
}

export default ExpungementEmploymentAndIncome
