import { useRef, MutableRefObject, ChangeEvent } from 'react'

import { CopyHolder } from '../types'
import { Card, Paragraph, Input } from '../ui'
import { useLanguage, useIntersectionStyle } from '../hooks'

import styles from './ExpungementForm.module.css'
const { LabelMargin, TitleLabel } = styles

const copy: CopyHolder = {
  english: {
    numbers: 'Case Numbers, if known',
    caseInfo: 'Case Information',
    case_felony: 'My Case Was A Felony',
    case_misdemeanor: 'My Case Was A Misdemeanor',
    yes: 'Yes',
    unsure: 'Unsure',
    marijuana: 'Was it Marijuana Related?',
    county: 'Were You Convicted in Santa Barbara County?',
    city: 'If so, what city?',
  },
  spanish: {
    numbers: 'Números de Caso, si se Conocen',
    caseInfo: 'Información del caso',
    case_felony: 'Mi caso fue un delito grave',
    case_misdemeanor: 'Mi caso fue un delito menor',
    yes: 'Si',
    unsure: 'Inseguro',
    marijuana: '¿Estaba relacionado con la marihuana?',
    county: '¿Fue condenado en el condado de Santa Bárbara?',
    city: 'Si es así, ¿qué ciudad?',
  },
}

interface ExpungementCaseInfoProps {
  convictedInCounty: boolean
  handleChange: ({
    target, // eslint-disable-line no-unused-vars
  }: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void
  animationClass: string
}

const ExpungementCaseInfo = ({
  convictedInCounty,
  handleChange,
  animationClass,
}: ExpungementCaseInfoProps) => {
  const caseRef: MutableRefObject<HTMLDivElement> = useRef()
  const { language } = useLanguage()

  const {
    caseInfo,
    case_felony,
    case_misdemeanor,
    yes,
    unsure,
    marijuana,
    numbers,
    county,
    city,
  } = copy[language]

  useIntersectionStyle(caseRef, animationClass)

  return (
    <Card ref={caseRef}>
      <Paragraph size="med-text" color="highlight">
        {caseInfo}
      </Paragraph>
      <section>
        <label htmlFor="Felony">{case_felony}</label>
        <Input onChange={handleChange} type="checkbox" id="Felony" />
        <label htmlFor="Misdemeanor">{case_misdemeanor}</label>
        <Input onChange={handleChange} type="checkbox" id="Misdemeanor" />
        <label htmlFor="Unsure">{unsure}</label>
        <Input onChange={handleChange} type="checkbox" id="Unsure" />
      </section>
      <section>
        <label className={`${LabelMargin} ${TitleLabel}`}>{marijuana}</label>
        <label htmlFor="marijuana_related_yes">{yes}</label>
        <Input
          onChange={handleChange}
          type="radio"
          name="Was it marijuana related"
          value="Was it marijuana related_yes_On"
          id="marijuana_related_yes"
        />
        <label htmlFor="marijuana_related_no">No</label>
        <Input
          onChange={handleChange}
          type="radio"
          name="Was it marijuana related"
          value="Was it marijuana related_no_On"
          id="marijuana_related_no"
        />
      </section>
      <section>
        <label className={TitleLabel} htmlFor="Case Numbers if known">
          {numbers}
        </label>
        <Input onChange={handleChange} type="text" id="Case Numbers if known" />
      </section>
      <section>
        <label className={`${LabelMargin} ${TitleLabel}`}>{county}</label>
        <label htmlFor="convicted_in_sb_yes">{yes}</label>
        <Input
          onChange={handleChange}
          type="radio"
          name="Convicted in Santa Barbara County"
          value="Convicted in Santa Barbara County_yes_On"
          id="convicted_in_sb_yes"
        />
        <label htmlFor="convicted_in_sb_no">No</label>
        <Input
          onChange={handleChange}
          type="radio"
          name="Convicted in Santa Barbara County"
          value="Convicted in Santa Barbara County_no If yes_On"
          id="convicted_in_sb_no"
        />
      </section>
      <section>
        <label className={`${LabelMargin} ${TitleLabel}`}>{city}</label>
        <label htmlFor="convicted_in_city_sb">Santa Barbara</label>
        <Input
          disabled={!convictedInCounty}
          onChange={handleChange}
          type="radio"
          name="City Convicted In"
          value="Convicted in Santa Barbara County_Santa Barbara_On"
          id="convicted_in_city_sb"
        />
        <label htmlFor="convicted_in_city_sm">Santa Maria</label>
        <Input
          disabled={!convictedInCounty}
          onChange={handleChange}
          type="radio"
          name="City Convicted In"
          value="Convicted in Santa Barbara County_Santa Maria_On"
          id="convicted_in_city_sm"
        />
        <label htmlFor="convicted_in_city_lom">Lompoc</label>
        <Input
          disabled={!convictedInCounty}
          onChange={handleChange}
          type="radio"
          name="City Convicted In"
          value="Convicted in Santa Barbara County_Lompoc_On"
          id="convicted_in_city_lom"
        />
      </section>
    </Card>
  )
}

export default ExpungementCaseInfo
