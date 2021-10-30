export interface FieldInfo {
  box_width?: number
  x?: number
  y?: number
  radioOrBooleanVals?: {
    [key: string]: {
      x: number
      y: number
    }
  }
}

export interface Fields {
  [field_name: string]: {
    english?: FieldInfo
    spanish?: FieldInfo
  }
}

export interface Validation {
  field: string
  error: {
    english: string
    spanish: string
  }
}

export interface ExpungementInfo {
  name: string
  email: string
  dob: string
  ssn: string
  license?: string
  city: string
  state?: string
  zip?: number
  state_and_zip?: string
  full_address?: string
  home_phone?: string
  work_phone?: string
  cell_phone?: string
  preferred_phone?: string
  case_num_1?: string
  case_attorney_1?: string
  case_charges_1?: string
  case_felony_1?: boolean
  case_misdemeanor_1?: boolean
  case_date_convicted_1?: string
  case_probation_formal_1?: boolean
  case_probation_informal_1?: boolean
  case_probation_duration_1?: string
  case_probation_violate_1?: boolean
  case_probation_no_violate_1?: boolean
  case_num_2?: string
  case_attorney_2?: string
  case_charges_2?: string
  case_felony_2?: boolean
  case_misdemeanor_2?: boolean
  case_date_convicted_2?: string
  case_probation_formal_2?: boolean
  case_probation_informal_2?: boolean
  case_probation_duration_2?: string
  case_probation_violate_2?: boolean
  case_probation_no_violate_2?: boolean
  case_num_3?: string
  case_attorney_3?: string
  case_charges_3?: string
  case_felony_3?: boolean
  case_misdemeanor_3?: boolean
  case_date_convicted_3?: string
  case_probation_formal_3?: boolean
  case_probation_informal_3?: boolean
  case_probation_duration_3?: string
  case_probation_violate_3?: boolean
  case_probation_no_violate_3?: boolean
  current_probation_yes: boolean
  current_probation_no: boolean
  current_probation_info?: string
  arrests_since_probation_yes: boolean
  arrests_since_probation_no: boolean
  arrests_since_probation_info?: string
  owe_money_yes: boolean
  owe_money_no: boolean
  owe_money_amount?: string
  day: string
  month: string
  year: string
  location: string
  signature: string
  uptrust_enroll?: boolean
  charged_with?: string
  marital_status_single?: boolean
  marital_status_married?: boolean
  marital_status_separated?: boolean
  marital_status_divorced?: boolean
  marital_status_commonlaw?: boolean
  veteran_yes?: boolean
  veteran_no?: boolean
  military_branch?: string
  discharge_date?: string
  number_of_dependents: number
  dependent_relationship_and_age?: string
  employer?: string
  employer_address?: string
  time_at_job?: string
  supervisor?: string
  take_home_pay?: number
  pay_per_week?: boolean
  pay_per_month?: boolean
  unemployed: boolean
  unemployed_benefits_yes?: boolean
  unemployed_benefits_no?: boolean
  unemployed_benefits_amount?: string
  partner_employer?: string
  partner_employer_address?: string
  partner_time_at_job?: string
  partner_supervisor?: string
  partner_take_home_pay?: number
  partner_pay_per_week?: boolean
  partner_pay_per_month?: boolean
  partner_unemployed: boolean
  partner_unemployed_benefits_yes?: boolean
  partner_unemployed_benefits_no?: boolean
  partner_unemployed_benefits_amount?: string
  expenses_rent?: number
  expenses_utilities?: number
  expenses_food?: number
  expenses_mortgage?: number
  expenses_child_support?: number
  expenses_vehicle_payment?: number
  expenses_vehicle_insurance?: number
  expenses_other_expense_one_description?: string
  expenses_other_expense_one_amount?: number
  expenses_other_expense_two_description?: string
  expenses_other_expense_two_amount?: number
  other_income_child_support?: number
  other_income_disability?: number
  other_income_social_security?: number
  other_income_welfare_afdc?: boolean
  other_income_welfare_fs?: boolean
  other_income_welfare_amount?: number
  other_income_ssi_ssp_gr?: number
  other_income_real_estate_yes?: boolean
  other_income_real_estate_no?: boolean
  other_income_real_estate_address?: string
  other_income_real_estate_value?: number
  other_income_checking?: number
  other_income_savings?: number
  other_income_cash?: number
  other_income_value_of_assets?: number
  hearing_option_initals: string
  hearing_option_no_reimbursement: boolean
  hearing_option_judge_hearing: boolean
  date: string
}
