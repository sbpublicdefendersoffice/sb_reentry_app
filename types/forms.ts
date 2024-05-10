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
  'Place of Birth': string
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
  Race?: string
  Gender?: string
  Pronouns?: string
  'Different Race Please State'?: 'string'
  'Different Identity Please State'?: 'string'
  'Different Pronouns Please State'?: 'string'
  SSN: 'string'
  'Drivers LicesnseState ID': 'string'
  CheckBox1?: boolean //english option
  CheckBox2?: boolean //spanish option
  CheckBox3?: boolean //mixteco option
  CheckBox4?: boolean //other option

  CheckBox5?: boolean //yes option for primary phone voice message
  CheckBox6?: boolean //no option for primary phone voice message
  CheckBox7?: boolean //yes option for alt phone voice message
  CheckBox8?: boolean //no option for alt phone voice message

  CheckBox9?: boolean //email comm. option
  CheckBox10?: boolean //phone comm. option
  CheckBox11?: boolean //text comm. option

  CheckBox12?: boolean //yes option current probation
  CheckBox13?: boolean //no option current probation
  CheckBox14?: boolean //unsure option current probation

  CheckBox15?: boolean //employment option
  CheckBox16?: boolean //housing option
  CheckBox17?: boolean //goverment option
  CheckBox18?: boolean //licensing option
  CheckBox19?: boolean //other option

  CheckBox20?: boolean //yes SB option
  CheckBox21?: boolean //no SB option

  CheckBox22?: boolean //Sb location option
  CheckBox23?: boolean //santa maria location option
  CheckBox24?: boolean //lompoc location option

  CheckBox25?: boolean //felony conviction option
  CheckBox26?: boolean //misdemeanor conviction option
  CheckBox27?: boolean //unsure conviction option
  CheckBox28?: boolean //yes marijuana option
  CheckBox29?: boolean //no marijuana option

  CheckBox38?: boolean //american indian/ alaskan native
  CheckBox39?: boolean //Black or african american option
  CheckBox40?: boolean //pacific islander option
  CheckBox41?: boolean //asian option
  CheckBox42?: boolean //hispanic option
  CheckBox43?: boolean //white option
  CheckBox44?: boolean //middle eastern option
  CheckBox45?: boolean //other race option
  CheckBox46?: boolean //decline race option

  CheckBox47?: boolean //female gender option
  CheckBox48?: boolean //male gender option
  CheckBox49?: boolean //trans female gender option
  CheckBox50?: boolean //trans male gender option
  CheckBox51?: boolean //non binary gender option
  CheckBox52?: boolean //other gender option
  CheckBox53?: boolean //decline gender option

  CheckBox54?: boolean //she pronoun option
  CheckBox55?: boolean //he pronoun option
  CheckBox56?: boolean //they pronoun option
  CheckBox57?: boolean //other pronoun option
  CheckBox58?: boolean //decline pronoun option

  CheckBox59?: boolean //single marital option
  CheckBox60?: boolean //married marital option
  CheckBox61?: boolean //separated marital option
  CheckBox62?: boolean //divorce marital option
  CheckBox63?: boolean //common law marital option

  Checkbox64?: boolean //monthly pay option
  Checkbox65?: boolean //weekly pay option
  Checkbox66?: boolean //bi-weekly pay option
  Checkbox67?: boolean //annually pay option

  CheckBox72?: boolean //yes real estate option
  CheckBox73?: boolean //no real estate option
}

export interface ExpungeFormInfo extends ExpungementInfo {
  'State  Zip': string
  'Mailing Address': string
  language: Language
  'Home Phone': string
  clientId: number
}
