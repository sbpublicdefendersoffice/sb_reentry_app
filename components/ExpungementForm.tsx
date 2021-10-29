import {
  useState,
  useRef,
  FormEvent,
  ChangeEvent,
  MutableRefObject,
} from 'react'

import { useLanguage, useIntersectionStyle, useToast } from '../hooks'
import { ExpungementInfo, CopyHolder } from '../types'
import {
  ExpungementMainInfo,
  ExpungementProbationInfo,
  ExpungementMaritalAndVeteranStatus,
  ExpungementDependents,
  ExpungementCaseInfo,
  ExpungementEmploymentAndIncome,
  ExpungementMonthlyExpenses,
  ExpungementOtherIncomeAssets,
  ExpungementSignature,
} from './'

import styles from './ExpungementForm.module.css'

import { Title, Button, Card, Paragraph, Input } from '../ui'

const copy: CopyHolder = {
  english: {
    title: 'Apply for Criminal Record Expungement',
    elgible: 'You are not eligible for this relief if',
    one: 'You are serving a sentence, are on probation, or are charged with a crime',
    two: 'You have not complied with the terms and conditions of probation',
    three:
      'If it has been less than a year since your date of conviction and you were not granted probation',
    four: 'You went to prison for this offense',
    submit: 'Submit Information',
    uptrust: 'Uptrust Enrollment',
    enroll:
      'I would like to be enrolled in Uptrust to receive text messages about upcoming court hearings and office appointments',
  },
  spanish: {
    title: 'Solicite la eliminación de antecedentes penales',
    elgible: 'No es elegible para este alivio si',
    one: 'Está cumpliendo una sentencia, está en libertad condicional o está acusado de un delito',
    two: 'No ha cumplido con los términos y condiciones de la libertad condicional',
    three:
      'Si ha pasado menos de un año desde la fecha de su condena y no se le concedió libertad condicional',
    four: 'Fuiste a prisión por este delito',
    submit: 'Enviar información',
    uptrust: 'Inscripción Uptrust',
    enroll:
      'Yo quisiera inscribirme en Uptrust para recibir mensajes de texto acerca de la proxima audiencias judiciales y citas en la oficina',
  },
}

const { Load } = styles

const ExpungementForm = () => {
  const { setToast } = useToast()
  const uptrustRef: MutableRefObject<HTMLDivElement> = useRef()
  const { language } = useLanguage()
  const { title, submit, uptrust, enroll, elgible, one, two, three, four } =
    copy[language]

  const [expungeInfo, setExpungeInfo] = useState<ExpungementInfo | null>(null)

  useIntersectionStyle(uptrustRef, Load)

  const submitExpungementForm = async (
    e: FormEvent<HTMLFormElement>,
  ): Promise<void> => {
    e.preventDefault()
    // further styling and options needed for input types
    // when done, remember to make TWO interfaces for form data held in state and send to backend
    // set address fields to required. I will ask Amanda what fields they need to be required
    // need to figure out how to set today's date in state easily
    // pass down date in state to signature
    // do server and client side validation, including for negative numbers

    //@ts-ignore
    const { Address, City, state, zip } = expungeInfo
    const stateAndZip = `${state || 'CA'}, ${zip}`

    const sendForm: Response = await fetch('/api/recordClearance', {
      method: 'POST',
      body: JSON.stringify({
        'Mailing Address': `${Address} ${City} ${stateAndZip}`,
        'State  Zip': stateAndZip,
        language,
        ...expungeInfo,
      }),
    })

    const res = await sendForm.json()
    setToast(res.statusCode)
  }

  const handleChange = ({
    target,
  }: ChangeEvent<HTMLInputElement | HTMLSelectElement>): void => {
    const { id, value, type, name } = target
    if (type === 'radio') {
      setExpungeInfo(val => ({ ...val, [name]: value }))
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
      <Paragraph color="highlight" size="heading-text">
        {elgible}
      </Paragraph>
      <Paragraph size="med-text">1) {one}</Paragraph>
      <Paragraph size="med-text">2) {two}</Paragraph>
      <Paragraph size="med-text">3) {three}</Paragraph>
      <Paragraph size="med-text">4) {four}</Paragraph>
      <ExpungementMainInfo
        //@ts-ignore
        otherLang={expungeInfo?.Other}
        handleChange={handleChange}
        animationClass={Load}
      />
      <Card ref={uptrustRef}>
        <Paragraph size="med-text" color="highlight">
          {uptrust}
        </Paragraph>
        <div style={{ textAlign: 'center' }}>
          <label
            htmlFor="I would like to be enrolled in Uptrust to receive"
            className={styles.LabelMargin}
          >
            {enroll}
          </label>
          <Input
            type="checkbox"
            id="I would like to be enrolled in Uptrust to receive"
            onChange={handleChange}
          />
        </div>
      </Card>
      <ExpungementMaritalAndVeteranStatus
        //@ts-ignore
        applicantIsVeteran={
          expungeInfo?.['Are you a veteran'] === 'Are you a veteran_Yes_On'
        }
        handleChange={handleChange}
        animationClass={Load}
      />
      <ExpungementCaseInfo
        //@ts-ignore
        convictedInCounty={
          expungeInfo?.['Convicted in Santa Barbara County'] ===
          'Convicted in Santa Barbara County_yes_On'
        }
        handleChange={handleChange}
        animationClass={Load}
      />
      <ExpungementProbationInfo
        handleChange={handleChange}
        animationClass={Load}
      />
      <ExpungementDependents
        handleChange={handleChange}
        animationClass={Load}
      />
      <ExpungementEmploymentAndIncome
        handleChange={handleChange}
        animationClass={Load}
      />
      <ExpungementMonthlyExpenses
        handleChange={handleChange}
        animationClass={Load}
      />
      <ExpungementOtherIncomeAssets
        handleChange={handleChange}
        animationClass={Load}
      />
      <ExpungementSignature
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
