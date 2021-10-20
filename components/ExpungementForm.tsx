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
  ExpungementDependents,
  ExpungementEmploymentAndIncome,
  ExpungementFinanceOptions,
  ExpungementMonthlyExpenses,
  ExpungementOtherIncomeAssets,
} from './'

import styles from './ExpungementForm.module.css'

import { Title, Button, Card, Paragraph } from '../ui'

//sign for both
// day, month, year, location, signature

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
    // for employment pay period, convert the boolean into a p/w p/m string
    // change all number fields to not accept negative numbers
    console.log(expungeInfo)
  }

  const handleChange = ({
    target,
  }: ChangeEvent<HTMLInputElement | HTMLSelectElement>): void => {
    const { id, value, type } = target
    if (type === 'radio') {
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
    } else if (type === 'checkbox')
      setExpungeInfo(val => ({
        ...val,
        [id]: !Boolean(val?.[id]),
      }))
    else setExpungeInfo(val => ({ ...val, [id]: value }))
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
        <input type="checkbox" id="uptrust_enroll" onChange={handleChange} />
      </Card>
      <ExpungementMaritalAndVeteranStatus
        handleChange={handleChange}
        animationClass={Load}
      />
      <ExpungementDependents
        handleChange={handleChange}
        animationClass={Load}
      />
      <ExpungementCaseInfo handleChange={handleChange} animationClass={Load} />
      <ExpungementProbationInfo
        handleChange={handleChange}
        animationClass={Load}
      />
      <ExpungementEmploymentAndIncome
        expungeInfo={expungeInfo}
        handleChange={handleChange}
        animationClass={Load}
      />
      <ExpungementMonthlyExpenses
        handleChange={handleChange}
        animationClass={Load}
      />
      <ExpungementOtherIncomeAssets
        expungeInfo={expungeInfo}
        handleChange={handleChange}
        animationClass={Load}
      />
      <ExpungementFinanceOptions
        expungeInfo={expungeInfo}
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
