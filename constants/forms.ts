import { Fields, Validation } from '../types'

export const validations: Validation[] = [
  {
    field: 'Full Name',
    error: {
      english: "Applicant's full name is required",
      spanish: 'Se requiere el nombre completo del solicitante',
    },
    id: 'name-label',
  },
  {
    field: 'Date of Birth',
    error: {
      english: 'Date of Birth must be entered for record keeping purposes',
      spanish:
        'Se debe ingresar la fecha de nacimiento para fines de mantenimiento de registros',
    },
    id: 'dob-label',
  },
  {
    field: 'Address',
    error: {
      english: 'An address is required',
      spanish: 'Se requiere una dirección',
    },
    id: 'address-label',
  },
  {
    field: 'City',
    error: {
      english: 'Enter your city of residence',
      spanish: 'Ingrese su ciudad de residencia',
    },
    id: 'city-label',
  },
  {
    field: 'zip',
    error: {
      english: 'Please enter the zip code in which you reside',
      spanish: 'Ingrese el código postal en el que reside',
    },
    id: 'zip-label',
  },
  {
    field: 'Date',
    error: {
      english: "You must enter today's date",
      spanish: 'Debes ingresar la fecha de hoy',
    },
    id: 'date-label',
  },
  {
    field: 'Signature',
    error: {
      english: 'A signature is required',
      spanish: 'Se requiere una firma',
    },
    id: 'sign-label',
  },
  {
    field: 'certified',
    error: {
      english:
        'You must click to indicate that you understand the terms and condtions of expungement',
      spanish:
        'Debe hacer clic para indicar que comprende los términos y condiciones de la eliminación de antecedentes penales.',
    },
    id: 'cert-label',
  },
]

export const states: string[] = [
  'AL',
  'AK',
  'AZ',
  'AR',
  'CA',
  'CO',
  'CT',
  'DE',
  'DC',
  'FL',
  'GA',
  'HI',
  'ID',
  'IL',
  'IN',
  'IA',
  'KS',
  'KY',
  'LA',
  'ME',
  'MD',
  'MA',
  'MI',
  'MN',
  'MS',
  'MO',
  'MT',
  'NE',
  'NV',
  'NH',
  'NJ',
  'NM',
  'NY',
  'NC',
  'ND',
  'OH',
  'OK',
  'OR',
  'PA',
  'RI',
  'SC',
  'SD',
  'TN',
  'TX',
  'UT',
  'VT',
  'VA',
  'WA',
  'WV',
  'WI',
  'WY',
]

export const applicationFormFields: Fields = {
  name: {
    english: { box_width: 490, x: 90, y: 653 },
  },
  aliases: {
    english: { box_width: 270, x: 311, y: 616 },
  },
  dob_month: {
    english: { box_width: 27, x: 109, y: 582 },
  },
  dob_day: {
    english: { box_width: 27, x: 143, y: 582 },
  },
  dob_year: {
    english: { box_width: 27, x: 177, y: 582 },
  },
  ethnicity: {
    english: { box_width: 273, x: 312, y: 582 },
  },
  primary_language: {
    english: {
      radioOrBooleanVals: {
        English: { x: 142, y: 542 },
        Spanish: { x: 197, y: 542 },
        Mixteco: { x: 257, y: 542 },
        Other: { x: 314, y: 542 },
      },
    },
  },
  primary_language_other: {
    english: { box_width: 220, x: 364, y: 543 },
  },
  primary_phone: {
    english: { box_width: 178, x: 122, y: 507 },
  },
  primary_phone_leave_message: {
    english: {
      radioOrBooleanVals: {
        true: { x: 525, y: 507 },
        false: { x: 560, y: 507 },
      },
    },
  },
  alt_phone: {
    english: { box_width: 155, x: 144, y: 472 },
  },
  alt_phone_leave_message: {
    english: {
      radioOrBooleanVals: {
        true: { x: 525, y: 472 },
        false: { x: 560, y: 472 },
      },
    },
  },
  email: {
    english: { box_width: 463, x: 118, y: 436 },
  },
  address: {
    english: { box_width: 452, x: 129, y: 401 },
  },
  communication_preference: {
    english: {
      radioOrBooleanVals: {
        Email: { x: 267, y: 362 },
        Phone: { x: 320, y: 362 },
        Text: { x: 375, y: 362 },
      },
    },
  },
  probation_current: {
    english: {
      radioOrBooleanVals: {
        yes: { x: 277, y: 326 },
        no: { x: 315, y: 326 },
        unsure: { x: 346, y: 326 },
      },
    },
  },
  probation_location: {
    english: { box_width: 98, x: 489, y: 327 },
  },
  primary_purpose: {
    english: {
      radioOrBooleanVals: {
        Employment: { x: 132, y: 292 },
        Housing: { x: 219, y: 292 },
        'Government Benefits': { x: 283, y: 292 },
        Licensing: { x: 415, y: 292 },
      },
    },
  },
  primary_purpose_other: {
    english: { box_width: 400, x: 183, y: 272 },
  },
  convicted_in_sb: {
    english: {
      radioOrBooleanVals: {
        true: { x: 241, y: 236 },
        false: { x: 276, y: 236 },
      },
    },
  },
  convicted_in: {
    english: {
      radioOrBooleanVals: {
        'Santa Barbara': { x: 353, y: 237 },
        'Santa Maria': { x: 448, y: 237 },
        Lompoc: { x: 530, y: 237 },
      },
    },
  },
  case_nums: {
    english: { box_width: 395, x: 185, y: 202 },
  },
  conviction_type: {
    english: {
      radioOrBooleanVals: {
        Felony: { x: 159, y: 165 },
        Misdemeanor: { x: 213, y: 165 },
        Unsure: { x: 306, y: 165 },
      },
    },
  },
  marijuana_related: {
    english: {
      radioOrBooleanVals: {
        true: { x: 523, y: 165 },
        false: { x: 561, y: 165 },
      },
    },
  },
  granted_probation: {
    english: {
      radioOrBooleanVals: {
        true: { x: 142, y: 129 },
        false: { x: 178, y: 129 },
      },
    },
  },
  no_probation_violation: {
    english: {
      radioOrBooleanVals: {
        yes: { x: 464, y: 129 },
        no: { x: 498, y: 129 },
        unsure: { x: 528, y: 129 },
      },
    },
  },
  paid_all_fees: {
    english: {
      radioOrBooleanVals: {
        yes: { x: 216, y: 92 },
        no: { x: 257, y: 92 },
        unsure: { x: 293, y: 92 },
      },
    },
  },
}

export const financeFormFields: Fields = {
  name: {
    english: { box_width: 221, x: 69, y: 661 },
    spanish: { box_width: 242, x: 8, y: 648 },
  },
  dob: {
    english: { box_width: 82, x: 319, y: 661 },
    spanish: { box_width: 173, x: 255, y: 648 },
  },
  ssn: {
    english: { box_width: 75, x: 526, y: 661 },
    spanish: { box_width: 158, x: 439, y: 648 },
  },
  address: {
    english: { box_width: 216, x: 60, y: 631 },
    spanish: { box_width: 242, x: 8, y: 615 },
  },
  city: {
    english: { box_width: 112, x: 323, y: 631 },
    spanish: { box_width: 173, x: 255, y: 615 },
  },
  state_zip: {
    english: { box_width: 84, x: 518, y: 631 },
    spanish: { box_width: 158, x: 439, y: 615 },
  },
  primary_phone: {
    english: { box_width: 90, x: 97, y: 595 },
    spanish: { box_width: 137, x: 113, y: 596 },
  },
  alt_phone: {
    english: { box_width: 95, x: 300, y: 595 },
    spanish: { box_width: 132, x: 385, y: 596 },
  },
  email: {
    english: { box_width: 150, x: 448, y: 595 },
    spanish: { box_width: 470, x: 129, y: 577 },
  },
  uptrust_enroll: {
    english: {
      radioOrBooleanVals: {
        true: { x: 152, y: 564 },
      },
    },
    spanish: {
      radioOrBooleanVals: {
        true: { x: 148, y: 545 },
      },
    },
  },
  marital_status: {
    english: {
      radioOrBooleanVals: {
        Single: { x: 91, y: 523 },
        Married: { x: 135, y: 523 },
        Separated: { x: 188, y: 523 },
        Divorced: { x: 254, y: 523 },
        'Common-Law': { x: 313, y: 523 },
      },
    },
    spanish: {
      radioOrBooleanVals: {
        Single: { x: 122, y: 504 },
        Married: { x: 178, y: 504 },
        Separated: { x: 229, y: 504 },
        Divorced: { x: 294, y: 504 },
        'Common-Law': { x: 362, y: 504 },
      },
    },
  },
  veteran: {
    english: {
      radioOrBooleanVals: {
        true: { x: 117, y: 489 },
        false: { x: 148, y: 489 },
      },
    },
    spanish: {
      radioOrBooleanVals: {
        true: { x: 108, y: 470 },
        false: { x: 133, y: 470 },
      },
    },
  },
  branch: {
    english: { box_width: 130, x: 301, y: 488 },
    spanish: { box_width: 108, x: 324, y: 472 },
  },
  discharge_date: {
    english: { box_width: 62, x: 540, y: 488 },
    spanish: { box_width: 76, x: 534, y: 472 },
  },
  dependents_num: {
    english: { box_width: 30, x: 144, y: 456 },
    spanish: { box_width: 37, x: 139, y: 440 },
  },
  dependents_relationship_age: {
    english: { box_width: 270, x: 329, y: 456 },
    spanish: { box_width: 310, x: 288, y: 440 },
  },
  employ_name: {
    english: { box_width: 200, x: 101, y: 413 },
    spanish: { box_width: 225, x: 74, y: 401 },
  },
  partner_employ_name: {
    english: { box_width: 200, x: 402, y: 413 },
    spanish: { box_width: 225, x: 373, y: 401 },
  },
  employ_address: {
    english: { box_width: 240, x: 58, y: 396 },
    spanish: { box_width: 232, x: 67, y: 384 },
  },
  partner_employ_address: {
    english: { box_width: 240, x: 356, y: 396 },
    spanish: { box_width: 232, x: 366, y: 384 },
  },
  employ_length: {
    english: { box_width: 43, x: 96, y: 381 },
    spanish: { box_width: 43, x: 139, y: 368 },
  },
  partner_employ_length: {
    english: { box_width: 43, x: 396, y: 381 },
    spanish: { box_width: 43, x: 439, y: 368 },
  },
  employ_supervisor: {
    english: { box_width: 76, x: 222, y: 381 },
    spanish: { box_width: 223, x: 75, y: 351 },
  },
  partner_employ_supervisor: {
    english: { box_width: 76, x: 521, y: 381 },
    spanish: { box_width: 223, x: 375, y: 351 },
  },
  employ_take_home_pay: {
    english: { box_width: 85, x: 100, y: 364 },
    spanish: { box_width: 85, x: 81, y: 335 },
  },
  employ_take_home_pay_frequency: {
    english: {
      radioOrBooleanVals: {
        Monthly: { x: 194, y: 364 },
        Weekly: { x: 248, y: 364 },
      },
    },
    spanish: {
      radioOrBooleanVals: {
        Monthly: { x: 177, y: 333 },
        Weekly: { x: 239, y: 333 },
      },
    },
  },
  partner_employ_take_home_pay: {
    english: { box_width: 85, x: 398, y: 364 },
    spanish: { box_width: 85, x: 381, y: 335 },
  },
  partner_employ_take_home_pay_frequency: {
    english: {
      radioOrBooleanVals: {
        Monthly: { x: 492, y: 361 },
        Weekly: { x: 548, y: 361 },
      },
    },
    spanish: {
      radioOrBooleanVals: {
        Monthly: { x: 477, y: 333 },
        Weekly: { x: 539, y: 333 },
      },
    },
  },
  employ_unemployment_benefits: {
    english: {
      radioOrBooleanVals: {
        true: { x: 147, y: 345 },
        false: { x: 182, y: 345 },
      },
    },
    spanish: {
      radioOrBooleanVals: {
        true: { x: 147, y: 316 },
        false: { x: 172, y: 316 },
      },
    },
  },
  employ_unemployment_benefits_amount: {
    english: { box_width: 35, x: 264, y: 347 },
    spanish: { box_width: 80, x: 220, y: 319 },
  },
  partner_employ_unemployment_benefits: {
    english: {
      radioOrBooleanVals: {
        true: { x: 447, y: 345 },
        false: { x: 482, y: 345 },
      },
    },
    spanish: {
      radioOrBooleanVals: {
        true: { x: 447, y: 316 },
        false: { x: 476, y: 316 },
      },
    },
  },
  partner_employ_unemployment_benefits_amount: {
    english: { box_width: 40, x: 563, y: 347 },
    spanish: { box_width: 80, x: 523, y: 319 },
  },
  expenses_rent: {
    english: { box_width: 85, x: 210, y: 287 },
    spanish: { box_width: 85, x: 210, y: 276 },
  },
  expenses_utilites: {
    english: { box_width: 85, x: 210, y: 268 },
    spanish: { box_width: 85, x: 210, y: 259 },
  },
  expenses_food: {
    english: { box_width: 85, x: 210, y: 252 },
    spanish: { box_width: 85, x: 210, y: 243 },
  },
  expenses_mortgage: {
    english: { box_width: 85, x: 210, y: 235 },
    spanish: { box_width: 85, x: 210, y: 226 },
  },
  expenses_child_support: {
    english: { box_width: 85, x: 210, y: 219 },
    spanish: { box_width: 85, x: 210, y: 209 },
  },
  expenses_vehicle_payment: {
    english: { box_width: 85, x: 210, y: 204 },
    spanish: { box_width: 85, x: 210, y: 194 },
  },
  expenses_vehicle_insurance: {
    english: { box_width: 85, x: 210, y: 185 },
    spanish: { box_width: 85, x: 210, y: 177 },
  },
  expenses_other_1: {
    english: { box_width: 186, x: 8, y: 154 },
    spanish: { box_width: 186, x: 8, y: 144 },
  },
  expenses_other_1_amount: {
    english: { box_width: 85, x: 210, y: 154 },
    spanish: { box_width: 85, x: 210, y: 144 },
  },
  expenses_other_2: {
    english: { box_width: 186, x: 8, y: 138 },
    spanish: { box_width: 186, x: 8, y: 128 },
  },
  expenses_other_2_amount: {
    english: { box_width: 85, x: 210, y: 138 },
    spanish: { box_width: 85, x: 210, y: 128 },
  },
  income_child_support: {
    english: { box_width: 85, x: 509, y: 287 },
    spanish: { box_width: 85, x: 509, y: 276 },
  },
  income_disability: {
    english: { box_width: 85, x: 509, y: 268 },
    spanish: { box_width: 85, x: 509, y: 259 },
  },
  income_social_security: {
    english: { box_width: 85, x: 509, y: 252 },
    spanish: { box_width: 85, x: 509, y: 243 },
  },
  income_welfare_options_afdc: {
    english: {
      radioOrBooleanVals: {
        AFDC: { x: 359, y: 236 },
      },
    },
    spanish: {
      radioOrBooleanVals: {
        AFDC: { x: 373, y: 225 },
      },
    },
  },
  income_welfare_options_fs: {
    english: {
      radioOrBooleanVals: {
        FS: { x: 404, y: 236 },
      },
    },
    spanish: {
      radioOrBooleanVals: {
        FS: { x: 413, y: 225 },
      },
    },
  },
  income_welfare_amount: {
    english: { box_width: 85, x: 509, y: 235 },
    spanish: { box_width: 85, x: 509, y: 226 },
  },
  income_ssi_ssp_gr: {
    english: { box_width: 85, x: 509, y: 219 },
    spanish: { box_width: 85, x: 509, y: 209 },
  },
  income_real_estate: {
    english: {
      radioOrBooleanVals: {
        true: { x: 376, y: 201 },
        false: { x: 409, y: 201 },
      },
    },
    spanish: {
      radioOrBooleanVals: {
        true: { x: 440, y: 189 },
        false: { x: 464, y: 189 },
      },
    },
  },
  income_real_estate_amount: {
    english: { box_width: 85, x: 509, y: 204 },
    spanish: { box_width: 85, x: 509, y: 194 },
  },
  income_checking_amount: {
    english: { box_width: 85, x: 509, y: 185 },
    spanish: { box_width: 85, x: 509, y: 177 },
  },
  income_savings_amount: {
    english: { box_width: 85, x: 509, y: 170 },
    spanish: { box_width: 85, x: 509, y: 160 },
  },
  income_cash_on_hand: {
    english: { box_width: 85, x: 509, y: 154 },
    spanish: { box_width: 85, x: 509, y: 144 },
  },
  income_other_assets: {
    english: { box_width: 85, x: 509, y: 138 },
    spanish: { box_width: 85, x: 509, y: 128 },
  },
  date: {
    english: { box_width: 104, x: 41, y: 78 },
    spanish: { box_width: 104, x: 47, y: 71 },
  },
  signature: {
    english: { box_width: 330, x: 271, y: 78 },
    spanish: { box_width: 340, x: 256, y: 71 },
  },
}
