import { useState, FormEvent } from 'react'

import { useLanguage } from '../hooks'
import { ExpungementInfo, CopyHolder } from '../types'
import { ExpungementMainInfo, ExpungementCaseInfo } from './'

import styles from './ExpungementForm.module.css'

import { Title, Button } from '../ui'

// probation:
// current_probation_yes, current_probation_no, current_probation_info, arrests_since_probation_yes, arrests_since_probation_no, arrests_since_probation_info, owe_money_yes, owe_money_no, owe_money_amount

//sign for both
// day, month, year, location, signature

// uptrust_enroll, charged_with

// marital status
// marital_status_single, marital_status_married,  marital_status_separated, marital_status_divorced,marital_status_commonlaw

// military experience
// veteran_yes, veteran_no, military_branch, discharge_date,

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
  },
  spanish: {
    title: 'Solicite la eliminación de antecedentes penales',
    submit: 'Enviar información',
  },
}

const { load } = styles

const ExpungementForm = () => {
  const { language } = useLanguage()
  const { title, submit } = copy[language]

  const [expungeInfo, setExpungeInfo] = useState<ExpungementInfo | null>(null)

  const submitExpungementForm = async (
    e: FormEvent<HTMLFormElement>,
  ): Promise<void> => {
    e.preventDefault()
    //remember to send state and zip as state_and_zip
    console.log(expungeInfo)
  }

  return (
    <form className={styles.ExpungementForm} onSubmit={submitExpungementForm}>
      <Title>{title}</Title>
      <ExpungementMainInfo
        expungeInfo={expungeInfo}
        setExpungeInfo={setExpungeInfo}
        animationClass={load}
      />
      <ExpungementCaseInfo
        setExpungeInfo={setExpungeInfo}
        animationClass={load}
      />
      <Button role="button" type="submit">
        {submit}
      </Button>
    </form>
  )
}

export default ExpungementForm
