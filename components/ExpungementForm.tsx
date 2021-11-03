import {
  useState,
  useRef,
  FormEvent,
  ChangeEvent,
  MutableRefObject,
} from 'react'
import { useRouter } from 'next/router'

import { useLanguage, useIntersectionStyle, useToast } from '../hooks'
import { validations, states } from '../constants'
import { ExpungementInfo, CopyHolder, Validation } from '../types'
// import {
//   ExpungementMainInfo,
//   ExpungementProbationInfo,
//   ExpungementMaritalAndVeteranStatus,
//   ExpungementDependents,
//   ExpungementCaseInfo,
//   ExpungementEmploymentAndIncome,
//   ExpungementMonthlyExpenses,
//   ExpungementOtherIncomeAssets,
//   ExpungementSignature,
// } from './'

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
    success:
      "Form has been submitted to be sent to the Public Defender's office",
    name: 'What is your full name?',
    alias: 'Are there any other names that might be on your record?',
    ssn: "If you have one, what's your Social Security number?",
    dob: 'What is your Date of Birth?',
    primary_phone: 'What is your phone number?',
    leave_message: 'May we leave a message at this number?',
    yes: 'Yes',
    alternate_number: 'Is there another phone number we can reach you at?',
    leave_message_alt: 'May we leave a message at this other number?',
    address: 'Street Address',
    city: 'City',
    state: 'State',
    zip: 'Zip Code',
    email: 'If you have one, what is your email address?',
    communicate: 'How would you like us to get in touch with you?',
    phone: 'Phone',
    text: 'Text',
    purpose: 'What is your primary purpose for applying?',
    employment: 'Employment',
    housing: 'Housing',
    benefits: 'Government Benefits',
    licensing: 'Licensing',
    other: 'Other',
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
    success:
      'El formulario ha sido enviado para ser enviado a la oficina del Defensor Público.',
    name: '¿Cuál es su nombre completo?',
    alias: '¿Hay otros nombres que podrían estar en su registro?',
    ssn: 'Si tiene uno, ¿cuál es su número de seguro social?',
    dob: '¿Cuál es tu fecha de nacimiento?',
    primary_phone: '¿Cuál es tu número de teléfono?',
    leave_message: '¿Podemos dejar un mensaje en este número?',
    yes: 'Si',
    alternate_number:
      '¿Hay otro número de teléfono al que podamos localizarle?',
    leave_message_alt: '¿Podemos dejar un mensaje en este otro número?',
    address: 'Dirección',
    city: 'Ciudad',
    state: 'Estado',
    zip: 'Código Postal',
    email: 'Si tiene uno, ¿cuál es su dirección de correo electrónico?',
    communicate: '¿Cómo le gustaría que nos pusiéramos en contacto con usted?',
    phone: 'Teléfono',
    text: 'Texto',
    purpose: '¿Cuál es su propósito principal para postularse?',
    employment: 'Empleo',
    housing: 'Alojamiento',
    benefits: 'Beneficios del gobierno',
    licensing: 'Licencia',
    other: 'Otro',
  },
}

const { Load, Field, RadioCard } = styles

const ExpungementForm = () => {
  const { push } = useRouter()
  const { setToast } = useToast()
  const uptrustRef: MutableRefObject<HTMLDivElement> = useRef()
  const { language } = useLanguage()
  const {
    title,
    submit,
    uptrust,
    enroll,
    elgible,
    one,
    two,
    three,
    four,
    success,
    name,
    alias,
    ssn,
    dob,
    primary_phone,
    yes,
    leave_message,
    alternate_number,
    leave_message_alt,
    address,
    city,
    state,
    zip,
    email,
    communicate,
    phone,
    text,
    purpose,
    employment,
    housing,
    benefits,
    licensing,
    other,
  } = copy[language]

  const [expungeInfo, setExpungeInfo] = useState<ExpungementInfo | null>(null)

  useIntersectionStyle(uptrustRef, Load)

  const submitExpungementForm = async (
    e: FormEvent<HTMLFormElement>,
  ): Promise<void> => {
    e.preventDefault()
    try {
      validations.forEach((v: Validation): void => {
        const { error, field, id } = v
        if (!expungeInfo[field]) throw new Error(`${error[language]}&&#${id}`)
      })

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
      if (res.error) throw new Error(res.error)
      else setToast(success)
    } catch (err) {
      const [msg, id] = err.message.split('&&')
      setToast(msg)
      push(id, id, { shallow: true })
    }
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
      <Card className={styles.Card}>
        <section className={Field}>
          <label htmlFor="Full Name">{name}</label>
          <Input onChange={handleChange} type="text" id="Full Name" />
        </section>
        <section className={Field}>
          <label htmlFor="Any other names that might be on your record">
            {alias}
          </label>
          <Input
            onChange={handleChange}
            type="text"
            id="Any other names that might be on your record"
          />
        </section>
        <section className={Field}>
          <label htmlFor="Social Security No">{ssn}</label>
          <Input
            onChange={handleChange}
            type="text"
            id="Social Security No"
            placeholder="555-55-5555"
          />
        </section>
        <section className={Field}>
          <label htmlFor="Date of Birth">{dob}</label>
          <Input onChange={handleChange} type="date" id="Date of Birth" />
        </section>
        <section className={Field}>
          <label htmlFor="Phone Number">{primary_phone}</label>
          <Input onChange={handleChange} type="tel" id="Phone Number" />
        </section>
        <section className={Field}>
          <label>{leave_message}</label>
          <Card className={RadioCard}>
            <label htmlFor="primary_phone_yes">{yes}</label>
            <Input
              onChange={handleChange}
              type="radio"
              name="Is it okay to leave a voice message"
              value="Is it okay to leave a voice message_yes_On"
              id="primary_phone_yes"
            />
            <label htmlFor="primary_phone_no">No</label>
            <Input
              onChange={handleChange}
              type="radio"
              name="Is it okay to leave a voice message"
              value="Is it okay to leave a voice message_no_On"
              id="primary_phone_no"
            />
          </Card>
        </section>
        <section className={Field}>
          <label htmlFor="Alternate Number">{alternate_number}</label>
          <Input onChange={handleChange} type="tel" id="Alternate Number" />
          <label>{leave_message_alt}</label>
          <Card className={RadioCard}>
            <label htmlFor="alternate_phone_yes">{yes}</label>
            <Input
              onChange={handleChange}
              type="radio"
              name="alt number Is it okay to leave a voice message"
              value="Is is okay to leave a voice message_yes_On"
              id="alternate_phone_yes"
            />
            <label htmlFor="alternate_phone_no">No</label>
            <Input
              onChange={handleChange}
              type="radio"
              name="alt number Is it okay to leave a voice message"
              value="Is is okay to leave a voice message_no_On"
              id="alternate_phone_no"
            />
          </Card>
        </section>
        <section className={Field}>
          <label htmlFor="Address">{address}</label>
          <Input onChange={handleChange} type="text" id="Address" />
        </section>
        <section className={Field}>
          <label htmlFor="City">{city}</label>
          <Input onChange={handleChange} type="text" id="City" />
        </section>
        <section className={Field}>
          <label htmlFor="state">{state}</label>
          <select onChange={handleChange} id="state" defaultValue="CA">
            {states.map((state: string, i: number) => (
              <option key={i} value={state}>
                {state}
              </option>
            ))}
          </select>
        </section>
        <section className={Field}>
          <label htmlFor="zip">{zip}</label>
          <Input
            onChange={handleChange}
            id="zip"
            type="text"
            placeholder="12345"
          />
        </section>
        <section className={Field}>
          <label htmlFor="Email Address">{email}</label>
          <Input onChange={handleChange} type="email" id="Email Address" />
        </section>
        <section className={Field}>
          <label>{communicate}</label>
          <Card className={RadioCard}>
            <label htmlFor="Email">E-mail</label>
            <Input onChange={handleChange} type="checkbox" id="Email" />
            <label htmlFor="Phone">{phone}</label>
            <Input onChange={handleChange} type="checkbox" id="Phone" />
            <label htmlFor="Text">{text}</label>
            <Input onChange={handleChange} type="checkbox" id="Text" />
          </Card>
        </section>
        <section className={Field}>
          <label>{purpose}</label>
          <Card className={RadioCard}>
            <label htmlFor="Employment">{employment}</label>
            <Input onChange={handleChange} type="checkbox" id="Employment" />
            <label htmlFor="Housing">{housing}</label>
            <Input onChange={handleChange} type="checkbox" id="Housing" />
            <label htmlFor="Government Benefits">{benefits}</label>
            <Input
              onChange={handleChange}
              type="checkbox"
              id="Government Benefits"
            />
            <label htmlFor="Licensing">{licensing}</label>
            <Input onChange={handleChange} type="checkbox" id="Licensing" />
            <label htmlFor="Other-1">{other}</label>
            <Input onChange={handleChange} id="Other-1" type="text" />
          </Card>
        </section>
        <section className={Field}>
          <label>{uptrust}</label>
          <Card className={RadioCard}>
            <label htmlFor="I would like to be enrolled in Uptrust to receive">
              {enroll}
            </label>
            <Input
              type="checkbox"
              id="I would like to be enrolled in Uptrust to receive"
              onChange={handleChange}
            />
          </Card>
        </section>
        <section className={Field}></section>
      </Card>
      {/* <ExpungementMainInfo
        otherLang={expungeInfo?.Other}
        handleChange={handleChange}
        animationClass={Load}
      /> */}
      {/* <Card ref={uptrustRef}>
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
      </Card> */}
      {/* <ExpungementMaritalAndVeteranStatus
        applicantIsVeteran={
          expungeInfo?.['Are you a veteran'] === 'Are you a veteran_Yes_On'
        }
        handleChange={handleChange}
        animationClass={Load}
      /> */}
      {/* <ExpungementCaseInfo
        convictedInCounty={
          expungeInfo?.['Convicted in Santa Barbara County'] ===
          'Convicted in Santa Barbara County_yes_On'
        }
        handleChange={handleChange}
        animationClass={Load}
      /> */}
      {/* <ExpungementProbationInfo
        probationOrParole={
          expungeInfo?.['Are you currently on probation or parole'] ===
          'Are you currently on probation or parole_yes_On'
        }
        grantedProbation={
          expungeInfo?.['Granted probation'] === 'Granted probation_yes_On'
        }
        handleChange={handleChange}
        animationClass={Load}
      /> */}
      {/* <ExpungementDependents
        hasDependents={!!Number(expungeInfo?.['Number of Dependents'])}
        handleChange={handleChange}
        animationClass={Load}
      /> */}
      {/* <ExpungementEmploymentAndIncome
        unemployment={
          expungeInfo?.['Unemployment Benefits'] ===
          'Unemployment Benefits_Yes_On'
        }
        partnerUnemployment={
          expungeInfo?.['Unemployment Benefits-0'] ===
          'Unemployment Benefits_Yes-0_On'
        }
        handleChange={handleChange}
        animationClass={Load}
      /> */}
      {/* <ExpungementMonthlyExpenses
        hasOtherExpenses={!!expungeInfo?.['Textfield-13']}
        handleChange={handleChange}
        animationClass={Load}
      /> */}
      {/* <ExpungementOtherIncomeAssets
        hasRealEstate={expungeInfo?.['Real Estate'] === 'Real Estate_Yes_On'}
        handleChange={handleChange}
        animationClass={Load}
      /> */}
      {/* <ExpungementSignature
        setExpungeInfo={setExpungeInfo}
        expungeInfo={expungeInfo}
        handleChange={handleChange}
        animationClass={Load}
      /> */}
      <Button
        disabled={!expungeInfo?.['certified']}
        role="button"
        type="submit"
      >
        {submit}
      </Button>
    </form>
  )
}

export default ExpungementForm
