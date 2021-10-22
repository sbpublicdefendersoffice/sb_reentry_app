import { Fields } from '../types'

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
        true: { x: 145, y: 543 },
      },
    },
    spanish: {
      radioOrBooleanVals: {
        true: { x: 145, y: 543 },
      },
    },
  },
  marital_status: {
    english: {
      radioOrBooleanVals: {
        Single: { x: 91, y: 519 },
        Married: { x: 135, y: 519 },
        Separated: { x: 188, y: 519 },
        Divorced: { x: 254, y: 519 },
        'Common-Law': { x: 313, y: 519 },
      },
    },
    spanish: {
      radioOrBooleanVals: {
        Single: { x: 122, y: 501 },
        Married: { x: 178, y: 501 },
        Separated: { x: 229, y: 501 },
        Divorced: { x: 294, y: 501 },
        'Common-Law': { x: 362, y: 501 },
      },
    },
  },
  veteran: {
    english: {
      radioOrBooleanVals: {
        true: { x: 117, y: 487 },
        false: { x: 148, y: 487 },
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
  // name: {
  //   english: { box_width: 195, x: 25, y: 667 },
  //   spanish: { box_width: 190, x: 30, y: 660 },
  // },
  // dob: {
  //   english: { box_width: 180, x: 230, y: 667 },
  //   spanish: { box_width: 170, x: 230, y: 660 },
  // },
  // ssn: {
  //   english: { box_width: 160, x: 420, y: 667 },
  //   spanish: { box_width: 170, x: 410, y: 660 },
  // },
  // address: {
  //   english: { box_width: 200, x: 95, y: 642 },
  //   spanish: { box_width: 135, x: 150, y: 633 },
  // },
  // city: {
  //   english: { box_width: 110, x: 325, y: 642 },
  //   spanish: { box_width: 70, x: 330, y: 633 },
  // },
  // state_and_zip: {
  //   english: { box_width: 75, x: 505, y: 642 },
  //   spanish: { box_width: 65, x: 515, y: 633 },
  // },
  // home_phone: {
  //   english: { box_width: 180, x: 80, y: 620 },
  //   spanish: { box_width: 145, x: 80, y: 613 },
  // },
  // work_phone: {
  //   english: { box_width: 80, x: 325, y: 620 },
  //   spanish: { box_width: 120, x: 280, y: 613 },
  // },
  // cell_phone: {
  //   english: { box_width: 115, x: 462, y: 620 },
  //   spanish: { box_width: 135, x: 443, y: 613 },
  // },
  // uptrust_enroll: {
  //   english: { x: 43, y: 608 },
  //   spanish: { x: 43, y: 601 },
  // },
  // charged_with: {
  //   english: { box_width: 470, x: 104, y: 584 },
  //   spanish: { box_width: 495, x: 80, y: 566 },
  // },
  // marital_status_single: {
  //   english: { x: 95, y: 572 },
  //   spanish: { x: 123, y: 555 },
  // },
  // marital_status_married: {
  //   english: { x: 148, y: 572 },
  //   spanish: { x: 184, y: 555 },
  // },
  // marital_status_separated: {
  //   english: { x: 213, y: 572 },
  //   spanish: { x: 249, y: 555 },
  // },
  // marital_status_divorced: {
  //   english: { x: 285, y: 572 },
  //   spanish: { x: 323, y: 555 },
  // },
  // marital_status_commonlaw: {
  //   english: { x: 349, y: 572 },
  //   spanish: { x: 401, y: 555 },
  // },
  // veteran_yes: {
  //   english: { x: 68, y: 561 },
  //   spanish: { x: 115, y: 543 },
  // },
  // veteran_no: {
  //   english: { x: 114, y: 561 },
  //   spanish: { x: 151, y: 543 },
  // },
  // military_branch: {
  //   english: { box_width: 88, x: 325, y: 561 },
  //   spanish: { box_width: 95, x: 330, y: 543 },
  // },
  // discharge_date: {
  //   english: { box_width: 88, x: 489, y: 561 },
  //   spanish: { box_width: 85, x: 493, y: 543 },
  // },
  // number_of_dependents: {
  //   english: { box_width: 53, x: 129, y: 537 },
  //   spanish: { box_width: 50, x: 131, y: 518 },
  // },
  // dependent_relationship_and_age: {
  //   english: { box_width: 290, x: 288, y: 537 },
  //   spanish: { box_width: 310, x: 266, y: 518 },
  // },
  // employer: {
  //   english: { box_width: 230, x: 70, y: 513 },
  //   spanish: { box_width: 222, x: 80, y: 495 },
  // },
  // partner_employer: {
  //   english: { box_width: 195, x: 382, y: 513 },
  //   spanish: { box_width: 151, x: 426, y: 495 },
  // },
  // employer_address: {
  //   english: { box_width: 240, x: 65, y: 489 },
  //   spanish: { box_width: 230, x: 72, y: 471 },
  // },
  // partner_employer_address: {
  //   english: { box_width: 225, x: 352, y: 489 },
  //   spanish: { box_width: 222, x: 355, y: 471 },
  // },
  // time_at_job: {
  //   english: { box_width: 60, x: 106, y: 458 },
  //   spanish: { box_width: 43, x: 122, y: 441 },
  // },
  // supervisor: {
  //   english: { box_width: 86, x: 218, y: 458 },
  //   spanish: { box_width: 83, x: 219, y: 441 },
  // },
  // partner_time_at_job: {
  //   english: { box_width: 45, x: 394, y: 458 },
  //   spanish: { box_width: 35, x: 406, y: 441 },
  // },
  // partner_supervisor: {
  //   english: { box_width: 80, x: 495, y: 458 },
  //   spanish: { box_width: 82, x: 495, y: 441 },
  // },
  // take_home_pay: {
  //   english: { box_width: 147, x: 103, y: 435 },
  //   spanish: { box_width: 64, x: 102, y: 419 },
  // },
  // partner_take_home_pay: {
  //   english: { box_width: 188, x: 390, y: 435 },
  //   spanish: { box_width: 57, x: 384, y: 419 },
  // },
  // unemployed: {
  //   english: { x: 175, y: 423 },
  //   spanish: { x: 175, y: 428 },
  // },
  // unemployed_benefits_yes: {
  //   english: { x: 178, y: 413 },
  //   spanish: { x: 175, y: 418 },
  // },
  // unemployed_benefits_no: {
  //   english: { x: 208, y: 413 },
  //   spanish: { x: 197, y: 418 },
  // },
  // unemployed_benefits_amount: {
  //   english: { box_width: 58, x: 244, y: 413 },
  //   spanish: { box_width: 76, x: 227, y: 418 },
  // },
  // partner_unemployed: {
  //   english: { x: 452, y: 423 },
  //   spanish: { x: 451, y: 428 },
  // },
  // partner_unemployed_benefits_yes: {
  //   english: { x: 453, y: 413 },
  //   spanish: { x: 451, y: 418 },
  // },
  // partner_unemployed_benefits_no: {
  //   english: { x: 483, y: 413 },
  //   spanish: { x: 475, y: 418 },
  // },
  // partner_unemployed_benefits_amount: {
  //   english: { box_width: 58, x: 519, y: 413 },
  //   spanish: { box_width: 70, x: 508, y: 418 },
  // },
  // expenses_rent: {
  //   english: { box_width: 70, x: 232, y: 390 },
  //   spanish: { box_width: 70, x: 232, y: 395 },
  // },
  // expenses_utilities: {
  //   english: { box_width: 70, x: 232, y: 379 },
  //   spanish: { box_width: 70, x: 232, y: 385 },
  // },
  // expenses_food: {
  //   english: { box_width: 70, x: 232, y: 367 },
  //   spanish: { box_width: 70, x: 232, y: 373 },
  // },
  // expenses_mortgage: {
  //   english: { box_width: 70, x: 232, y: 356 },
  //   spanish: { box_width: 70, x: 232, y: 362 },
  // },
  // expenses_child_support: {
  //   english: { box_width: 70, x: 232, y: 345 },
  //   spanish: { box_width: 70, x: 232, y: 351 },
  // },
  // expenses_vehicle_payment: {
  //   english: { box_width: 70, x: 232, y: 327 },
  //   spanish: { box_width: 70, x: 232, y: 331 },
  // },
  // expenses_vehicle_insurance: {
  //   english: { box_width: 70, x: 232, y: 314 },
  //   spanish: { box_width: 70, x: 232, y: 320 },
  // },
  // expenses_other_expense_one_description: {
  //   english: { box_width: 188, x: 25, y: 292 },
  //   spanish: { box_width: 188, x: 29, y: 298 },
  // },
  // expenses_other_expense_one_amount: {
  //   english: { box_width: 70, x: 232, y: 292 },
  //   spanish: { box_width: 70, x: 232, y: 298 },
  // },
  // expenses_other_expense_two_description: {
  //   english: { box_width: 188, x: 25, y: 282 },
  //   spanish: { box_width: 188, x: 29, y: 287 },
  // },
  // expenses_other_expense_two_amount: {
  //   english: { box_width: 70, x: 232, y: 282 },
  //   spanish: { box_width: 70, x: 232, y: 287 },
  // },
  // other_income_child_support: {
  //   english: { box_width: 70, x: 512, y: 390 },
  //   spanish: { box_width: 70, x: 512, y: 395 },
  // },
  // other_income_disability: {
  //   english: { box_width: 70, x: 512, y: 379 },
  //   spanish: { box_width: 70, x: 512, y: 385 },
  // },
  // other_income_social_security: {
  //   english: { box_width: 70, x: 512, y: 367 },
  //   spanish: { box_width: 70, x: 512, y: 373 },
  // },
  // other_income_welfare_afdc: {
  //   english: { x: 381, y: 358 },
  //   spanish: { x: 394, y: 362 },
  // },
  // other_income_welfare_fs: {
  //   english: { x: 411, y: 358 },
  //   spanish: { x: 423, y: 362 },
  // },
  // other_income_welfare_amount: {
  //   english: { box_width: 70, x: 512, y: 356 },
  //   spanish: { box_width: 70, x: 512, y: 362 },
  // },
  // other_income_ssi_ssp_gr: {
  //   english: { box_width: 70, x: 512, y: 345 },
  //   spanish: { box_width: 70, x: 512, y: 351 },
  // },
  // other_income_real_estate_yes: {
  //   english: { x: 381, y: 337 },
  //   spanish: { x: 419, y: 341 },
  // },
  // other_income_real_estate_no: {
  //   english: { x: 412, y: 337 },
  //   spanish: { x: 443, y: 341 },
  // },
  // other_income_real_estate_address: {
  //   english: { box_width: 136, x: 361, y: 327 },
  //   spanish: { box_width: 133, x: 363, y: 331 },
  // },
  // other_income_real_estate_value: {
  //   english: { box_width: 70, x: 512, y: 327 },
  //   spanish: { box_width: 70, x: 512, y: 331 },
  // },
  // other_income_checking: {
  //   english: { box_width: 70, x: 512, y: 314 },
  //   spanish: { box_width: 70, x: 512, y: 320 },
  // },
  // other_income_savings: {
  //   english: { box_width: 70, x: 512, y: 303 },
  //   spanish: { box_width: 70, x: 512, y: 309 },
  // },
  // other_income_cash: {
  //   english: { box_width: 70, x: 512, y: 292 },
  //   spanish: { box_width: 70, x: 512, y: 298 },
  // },
  // other_income_value_of_assets: {
  //   english: { box_width: 70, x: 512, y: 282 },
  //   spanish: { box_width: 70, x: 512, y: 287 },
  // },
  // hearing_option_initals: {
  //   english: { box_width: 350, x: 230, y: 188 },
  //   spanish: { box_width: 395, x: 185, y: 194 },
  // },
  // hearing_option_no_reimbursement: {
  //   english: { x: 38, y: 178 },
  //   spanish: { x: 38, y: 183 },
  // },
  // hearing_option_judge_hearing: {
  //   english: { x: 38, y: 169 },
  //   spanish: { x: 38, y: 163 },
  // },
  // date: {
  //   english: { box_width: 107, x: 62, y: 65 },
  //   spanish: { box_width: 107, x: 64, y: 59 },
  // },
  // signature: {
  //   english: { box_width: 328, x: 218, y: 65 },
  //   spanish: { box_width: 322, x: 216, y: 59 },
  // },
}
