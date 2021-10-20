import { useRef, MutableRefObject, ChangeEvent } from 'react'

import { CopyHolder, ExpungementInfo } from '../types'
import { Card, Paragraph, Input } from '../ui'
import { useLanguage, useIntersectionStyle } from '../hooks'

import styles from './ExpungementForm.module.css'
const { LabelMargin, Selected, Deslected, HR } = styles

const copy: CopyHolder = {
  english: {
    employ: 'Employment and Income',
    employer_name: 'Employer',
    address: 'Employer Address',
    duration: 'Length of Time at Job',
    pay: 'Take Home Pay',
    week: 'Per Week',
    month: 'Per Month',
    unemployed: 'Unemployed',
    benefits: 'Benefits',
    yes: 'Yes',
    amount: 'Benefits Amount',
    partner_employ: 'Partner Employment and Income',
  },
  spanish: {
    employ: 'Empleo e Ingresos',
    employer_name: 'Empleador',
    address: 'Dirección del empleado',
    duration: 'Tiempo en el trabajo',
    pay: 'Salario Neto',
    week: 'Por Semana',
    month: 'Per Mensual',
    unemployed: 'Desempleados',
    benefits: 'Beneficios',
    yes: 'Si',
    amount: 'Monto de Beneficios',
    partner_employ: 'Empleo e Ingresos de Socios',
  },
}

interface ExpungementEmploymentAndIncomeProps {
  expungeInfo: ExpungementInfo
  handleChange: ({
    target, // eslint-disable-line no-unused-vars
  }: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void
  animationClass: string
}

const ExpungementEmploymentAndIncome = ({
  expungeInfo,
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
    unemployed,
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
        <label htmlFor="employer">{employer_name}</label>
        <Input onChange={handleChange} type="text" id="employer" />
        <label htmlFor="employer_address">{address}</label>
        <Input onChange={handleChange} type="text" id="employer_address" />
      </section>
      <section>
        <label htmlFor="time_at_job">{duration}</label>
        <Input onChange={handleChange} type="text" id="time_at_job" />
        <label htmlFor="supervisor">Supervisor</label>
        <Input onChange={handleChange} type="text" id="supervisor" />
      </section>
      <section>
        <label htmlFor="take_home_pay">{pay} $</label>
        <Input onChange={handleChange} type="number" id="take_home_pay" />
        <label htmlFor="pay_per_week">{week}</label>
        <Input
          onChange={handleChange}
          type="radio"
          name="week_or_month"
          value="pay_per_month"
          id="pay_per_week"
        />
        <label htmlFor="pay_per_month">{month}</label>
        <Input
          onChange={handleChange}
          type="radio"
          name="week_or_month"
          value="pay_per_week"
          id="pay_per_month"
        />
      </section>
      <section>
        <label htmlFor="unemployed">{unemployed}</label>
        <Input onChange={handleChange} type="checkbox" id="unemployed" />
        <label
          className={`${LabelMargin} ${
            expungeInfo?.unemployed ? Selected : Deslected
          }`}
        >
          {benefits}
        </label>
        <label
          htmlFor="unemployed_benefits_yes"
          className={expungeInfo?.unemployed ? Selected : Deslected}
        >
          {yes}
        </label>
        <Input
          onChange={handleChange}
          type="radio"
          name="benefits_or_no"
          disabled={!expungeInfo?.unemployed}
          value="unemployed_benefits_no"
          id="unemployed_benefits_yes"
        />
        <label
          htmlFor="unemployed_benefits_no"
          className={expungeInfo?.unemployed ? Selected : Deslected}
        >
          No
        </label>
        <Input
          onChange={handleChange}
          type="radio"
          name="benefits_or_no"
          disabled={!expungeInfo?.unemployed}
          value="unemployed_benefits_yes"
          id="unemployed_benefits_no"
        />
        <label
          htmlFor="unemployed_benefits_amount"
          className={
            expungeInfo?.unemployed && expungeInfo?.unemployed_benefits_yes
              ? Selected
              : Deslected
          }
        >
          {amount} $
        </label>
        <Input
          onChange={handleChange}
          disabled={
            !expungeInfo?.unemployed && expungeInfo?.unemployed_benefits_yes
          }
          type="number"
          id="unemployed_benefits_amount"
        />
      </section>
      <hr className={HR} />
      <Paragraph size="med-text" color="highlight">
        {partner_employ}
      </Paragraph>
      <section>
        <label htmlFor="partner_employer">{employer_name}</label>
        <Input onChange={handleChange} type="text" id="partner_employer" />
        <label htmlFor="partner_employer_address">{address}</label>
        <Input
          onChange={handleChange}
          type="text"
          id="partner_employer_address"
        />
      </section>
      <section>
        <label htmlFor="partner_time_at_job">{duration}</label>
        <Input onChange={handleChange} type="text" id="partner_time_at_job" />
        <label htmlFor="partner_supervisor">Supervisor</label>
        <Input onChange={handleChange} type="text" id="partner_supervisor" />
      </section>
      <section>
        <label htmlFor="partner_take_home_pay">{pay} $</label>
        <Input
          onChange={handleChange}
          type="number"
          id="partner_take_home_pay"
        />
        <label htmlFor="partner_pay_per_week">{week}</label>
        <Input
          onChange={handleChange}
          type="radio"
          name="partner_week_or_month"
          value="partner_pay_per_month"
          id="partner_pay_per_week"
        />
        <label htmlFor="pay_per_month">{month}</label>
        <Input
          onChange={handleChange}
          type="radio"
          name="partner_week_or_month"
          value="partner_pay_per_week"
          id="partner_pay_per_month"
        />
      </section>
      <section>
        <label htmlFor="partner_unemployed">{unemployed}</label>
        <Input
          onChange={handleChange}
          type="checkbox"
          id="partner_unemployed"
        />
        <label
          className={`${LabelMargin} ${
            expungeInfo?.partner_unemployed ? Selected : Deslected
          }`}
        >
          {benefits}
        </label>
        <label
          htmlFor="partner_unemployed_benefits_yes"
          className={expungeInfo?.partner_unemployed ? Selected : Deslected}
        >
          {yes}
        </label>
        <Input
          onChange={handleChange}
          type="radio"
          name="partner_benefits_or_no"
          disabled={!expungeInfo?.partner_unemployed}
          value="partner_unemployed_benefits_no"
          id="partner_unemployed_benefits_yes"
        />
        <label
          htmlFor="partner_unemployed_benefits_no"
          className={expungeInfo?.partner_unemployed ? Selected : Deslected}
        >
          No
        </label>
        <Input
          onChange={handleChange}
          type="radio"
          name="partner_benefits_or_no"
          disabled={!expungeInfo?.partner_unemployed}
          value="partner_unemployed_benefits_yes"
          id="partner_unemployed_benefits_no"
        />
        <label
          htmlFor="partner_unemployed_benefits_amount"
          className={
            expungeInfo?.partner_unemployed &&
            expungeInfo?.partner_unemployed_benefits_yes
              ? Selected
              : Deslected
          }
        >
          {amount} $
        </label>
        <Input
          onChange={handleChange}
          disabled={
            !expungeInfo?.partner_unemployed &&
            expungeInfo?.partner_unemployed_benefits_yes
          }
          type="number"
          id="partner_unemployed_benefits_amount"
        />
      </section>
    </Card>
  )
}

export default ExpungementEmploymentAndIncome
