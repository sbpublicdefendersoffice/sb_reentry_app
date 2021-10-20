import {
  useState,
  useRef,
  FormEvent,
  ChangeEvent,
  MutableRefObject,
} from 'react'

import { useLanguage, useIntersectionStyle } from '../hooks'
import { ExpungementInfo, CopyHolder } from '../types'
import {
  ExpungementMainInfo,
  ExpungementCaseInfo,
  ExpungementProbationInfo,
  ExpungementMaritalAndVeteranStatus,
} from './'

import styles from './ExpungementForm.module.css'

import { Title, Button, Card, Paragraph } from '../ui'

//sign for both
// day, month, year, location, signature

// dependents
// number_of_dependents, dependent_relationship_and_age,

// for employment pay period, convert the boolean into a p/w p/m string

// employment, self
// employer, employer_address, time_at_job, supervisor, take_home_pay (have a per week, per month here too), unemployed, unemployed_benefits_yes, unemployed_benefits_no, unemployed_benefits_amount,

// employment, partner
// partner_employer, partner_employer_address, partner_time_at_job, partner_supervisor, partner_take_home_pay (have a per week, per month here too), partner_unemployed, partner_unemployed_benefits_yes, partner_unemployed_benefits_no, partner_unemployed_benefits_amount

// expenses
// expenses_rent, expenses_utilities, expenses_food, expenses_mortgage, expenses_child_support, expenses_vehicle_payment, expenses_vehicle_insurance, expenses_other_expense_one_description, expenses_other_expense_one_amount, expenses_other_expense_two_description, expenses_other_expense_two_amount,

// other income
// other_income_child_support, other_income_disability, other_income_social_security, other_income_welfare_afdc, other_income_welfare_fs, other_income_welfare_amount, other_income_ssi_ssp_gr, other_income_real_estate_yes, other_income_real_estate_no, other_income_real_estate_address, other_income_real_estate_value, other_income_checking, other_income_savings, other_income_cash, other_income_value_of_assets,

//hearing_option_initals, hearing_option_no_reimbursement, hearing_option_judge_hearing, date, signature,

const copy: CopyHolder = {
  english: {
    title: 'Apply for Criminal Record Expungement',
    submit: 'Submit Information',
    uptrust: 'Uptrust Enrollment',
    enroll:
      'I would like to be enrolled in Uptrust to receive text messages about upcoming court hearings and office appointments',
  },
  spanish: {
    title: 'Solicite la eliminación de antecedentes penales',
    submit: 'Enviar información',
    uptrust: 'Inscripción Uptrust',
    enroll:
      'Yo quisiera inscribirme en Uptrust para recibir mensajes de texto acerca de la proxima audiencias judiciales y citas en la oficina',
  },
}

const { Load } = styles

const ExpungementForm = () => {
  const uptrustRef: MutableRefObject<HTMLDivElement> = useRef()
  const { language } = useLanguage()
  const { title, submit, uptrust, enroll } = copy[language]

  const [expungeInfo, setExpungeInfo] = useState<ExpungementInfo | null>(null)

  useIntersectionStyle(uptrustRef, Load)

  const submitExpungementForm = async (
    e: FormEvent<HTMLFormElement>,
  ): Promise<void> => {
    e.preventDefault()
    //remember to send state and zip as state_and_zip
    // fill out charged with from case charges info
    console.log(expungeInfo)
  }

  const handleChange = ({
    target,
  }: ChangeEvent<HTMLInputElement | HTMLSelectElement>): void => {
    // @ts-ignore
    const { id, value, checked } = target
    if (checked) {
      const falseRadioVals: { [value: string]: boolean } = value
        .split(';')
        .reduce((obj, str) => {
          obj[str] = false
          return obj
        }, {})

      setExpungeInfo(val => ({
        ...val,
        ...falseRadioVals,
        [id]: true,
      }))
    } else setExpungeInfo(val => ({ ...val, [id]: value }))
  }

  return (
    <form className={styles.ExpungementForm} onSubmit={submitExpungementForm}>
      <Title>{title}</Title>
      <ExpungementMainInfo
        expungeInfo={expungeInfo}
        setExpungeInfo={setExpungeInfo}
        animationClass={Load}
      />
      <Card ref={uptrustRef}>
        <Paragraph size="med-text" color="highlight">
          {uptrust}
        </Paragraph>
        <label htmlFor="uptrust_enroll" className={styles.LabelMargin}>
          {enroll}
        </label>
        <input
          type="checkbox"
          onChange={() =>
            setExpungeInfo(val => ({
              ...val,
              uptrust_enroll: !Boolean(val?.uptrust_enroll),
            }))
          }
        />
      </Card>
      <ExpungementMaritalAndVeteranStatus
        handleChange={handleChange}
        animationClass={Load}
      />
      <ExpungementCaseInfo handleChange={handleChange} animationClass={Load} />
      <ExpungementProbationInfo
        handleChange={handleChange}
        animationClass={Load}
      />
      <Button role="button" type="submit">
        {submit}
      </Button>
    </form>
  )
}

export default ExpungementForm
