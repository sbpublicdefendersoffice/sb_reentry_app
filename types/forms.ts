import { Language } from './language'

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
  id: string
  inputId: string
}

export interface ExpungementInfo {
  'Full Name': string
  'Any other names that might be on your record'?: string
  'Social Security No'?: string
  'Date of Birth': string
  RaceEthnicity: string
  English?: boolean
  Spanish?: boolean
  'M ixteco'?: boolean
  Other?: boolean
  'Other-0'?: string
  'Phone Number'?: string
  'Is it okay to leave a voice message'?: string
  'Alternate Number'?: string
  'alt number Is it okay to leave a voice message'?: string
  Address: string
  City: string
  state: string
  zip?: string
  'Email Address'?: string
  Email?: boolean
  Phone?: boolean
  Text?: boolean
  Employment?: boolean
  Housing?: boolean
  'Government Benefits'?: boolean
  Licensing?: boolean
  'Other-1'?: string
  3?: boolean // this is the current checkbox form value for uptrust enrollment
  4?: boolean // this is the current checkbox form value for experienceing homelessness
  5?: boolean // this is the current checkbox form value for not experienceing homelessness
  'Marital Status'?: string
  'Are you a veteran'?: string
  'If yes which branch'?: string
  'Discharge Date'?: string
  Felony?: boolean
  Misdemeanor?: boolean
  Unsure?: boolean
  'Was it marijuana related'?: string
  'Case Numbers if known'?: string
  'Convicted in Santa Barbara County'?: string
  'City Convicted In'?: string
  'Are you currently on probation or parole'?: string
  'Are you currently experiencing homelessness'?: string
  'unsure If yes where'?: string
  'Granted probation'?: string
  'Completed probation with no violations'?: string
  'I paid all finesfeesrestitution'?: string
  'Number of Dependents'?: string
  'Relationship and Ages'?: string
  'Employer Name'?: string
  'Address-0'?: string
  'Length of Time'?: string
  Supervisor?: string
  'Take Home Pay'?: string
  'Weekly Take Home Pay'?: boolean
  Monthly?: boolean
  'Unemployment Benefits'?: string
  'No Amount'?: string
  'Employer Name-0'?: string
  'Address-1'?: string
  'Length of Time-0'?: string
  'Supervisor-0'?: string
  'Weekly Take Home Pay-0'?: string
  Weekly?: boolean
  'Monthly-0'?: boolean
  'Unemployment Benefits-0'?: string
  'No Amount-0'?: string
  Textfield?: string
  'Textfield-1'?: string
  'Textfield-3'?: string
  'Textfield-5'?: string
  'Textfield-7'?: string
  'Vehicle LoansPayment Monthly'?: string
  'Textfield-10'?: string
  'Textfield-13'?: string
  'Textfield-14'?: string
  'Textfield-0'?: string
  'Textfield-2'?: string
  'Textfield-4'?: string
  AFDC?: boolean
  FS?: boolean
  'Textfield-6'?: string
  'Textfield-8'?: string
  'Real Estate'?: string
  'Textfield-9'?: string
  'Textfield-11'?: string
  'Textfield-12'?: string
  'Textfield-15'?: string
  'Other Income or assets valued at'?: string
  37?: boolean //new form value for monthly pay checkbox
  38?: boolean //new form value for weekly pay checkbox
  39?: boolean //new form value for bi-weekly pay checkbox
  40?: boolean //new form value for annually pay checkbox
  45?: boolean //new form value for real estate yes
  46?: boolean //new form value for real estate no
  'I would like to be enrolled in Uptrust to receive'?: boolean
  'show-other'?: boolean
  'Is English your primary language'?: string
  immigration?: boolean
  additionalInfo?: string
  Expense?: string
  Date: string
  Signature: string
  certified: boolean
}

export interface ExpungeFormInfo extends ExpungementInfo {
  'State  Zip': string
  'Mailing Address': string
  language: Language
  'Home Phone': string
  clientId: number
}
