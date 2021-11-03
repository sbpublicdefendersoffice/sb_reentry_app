import {
  useState,
  FormEvent,
  ChangeEvent,
  MutableRefObject,
  useRef,
} from 'react'
import { useRouter } from 'next/router'

import { useLanguage, useIntersectionStyle, useToast } from '../hooks'
import { validations, states } from '../constants'
import { ExpungementInfo, CopyHolder, Validation } from '../types'
import {
  //   ExpungementMainInfo,
  //   ExpungementProbationInfo,
  //   ExpungementMaritalAndVeteranStatus,
  //   ExpungementDependents,
  //   ExpungementCaseInfo,
  //   ExpungementEmploymentAndIncome,
  //   ExpungementMonthlyExpenses,
  //   ExpungementOtherIncomeAssets,
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
    marital: 'Are you married or do you have a legal domestic partner?',
    single: 'I am single',
    married: 'I am married',
    separated: 'I am separated',
    divorced: 'I am divorced',
    commonlaw: 'I have a common-law partner',
    case_felony: 'My Case Was A Felony',
    case_misdemeanor: 'My Case Was A Misdemeanor',
    dont_know: "I Don't Know",
    case_type: 'Do you know what kind of legal case you had?',
    marijuana: 'Was your case marijuana related?',
    numbers: 'What were your case numbers, if you know?',
    county: 'Were You Convicted in Santa Barbara County?',
    currently_on_probation: 'Are you currently on probation or parole?',
    where: 'If you are on probation or parole, what county is it in?',
    dependents: 'How many people depend on your financial support?',
    income:
      "What is your regular income? If you have one, include your partner's income as well",
    frequency: 'How frequently do you receive income?',
    week: 'Weekly',
    month: 'Monthly',
    income_source: 'Where does your income come from?',
    savings: 'How much money do you have saved?',
    unemployment_benefits: 'Do you collect unemployment benefits?',
    expenses:
      'About how much do you spend each month on things like rent, groceries, utilities, medical expenses, or childcare expenses?',
    total: 'Total expenses',
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
    marital: '¿Eres casado o tienes pareja legal?',
    single: 'Estoy soltero',
    married: 'Estoy casado',
    separated: 'Estoy separado',
    divorced: 'Estoy divorciado',
    commonlaw: 'Tengo un socio de hecho',
    case_felony: 'Mi caso fue un delito grave',
    case_misdemeanor: 'Mi caso fue un delito menor',
    dont_know: 'No sé',
    case_type: '¿Sabes qué tipo de caso legal tuviste?',
    marijuana: '¿Estuvo relacionado tu caso con la marihuana?',
    numbers: '¿Cuáles fueron sus números de caso, si lo sabe?',
    county: '¿Fue condenado en el condado de Santa Bárbara?',
    currently_on_probation:
      '¿Está actualmente en libertad condicional o en libertad condicional?',
    where:
      'Si está en libertad condicional o en libertad condicional, ¿en qué condado se encuentra?',
    dependents: '¿Cuántas personas dependen de su apoyo financiero?',
    income:
      '¿Cuál es su ingreso regular? Si tiene uno, incluya también los ingresos de su pareja',
    frequency: '¿Con qué frecuencia recibe ingresos?',
    week: 'Semanalmente',
    month: 'Mensual',
    income_source: '¿De dónde provienen sus ingresos?',
    savings: '¿Cuánto dinero has ahorrado?',
    unemployment_benefits: '¿Cobran prestaciones por desempleo?',
    expenses:
      '¿Aproximadamente cuánto gasta cada mes en cosas como alquiler, comestibles, servicios públicos, gastos médicos o gastos de cuidado de niños?',
    total: 'Gastos totales',
  },
}

const { Load, Field, RadioCard } = styles

const ExpungementForm = () => {
  const { push } = useRouter()
  const { setToast } = useToast()
  const formRef: MutableRefObject<HTMLDivElement> = useRef()
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
    marital,
    single,
    married,
    separated,
    divorced,
    commonlaw,
    case_felony,
    case_misdemeanor,
    dont_know,
    case_type,
    marijuana,
    numbers,
    county,
    currently_on_probation,
    where,
    dependents,
    income,
    frequency,
    week,
    month,
    income_source,
    savings,
    unemployment_benefits,
    expenses,
    total,
  } = copy[language]

  const [expungeInfo, setExpungeInfo] = useState<ExpungementInfo | null>(null)

  useIntersectionStyle(formRef, Load)

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
    else {
      if (id === 'Textfield-14')
        setExpungeInfo(val => ({ ...val, 'Textfield-13': total, [id]: value }))
      else setExpungeInfo(val => ({ ...val, [id]: value }))
    }
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
      <Card ref={formRef} className={styles.Card}>
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
        <section className={Field}>
          <label>{marital}</label>
          <Card className={RadioCard}>
            <label htmlFor="marital_status_single">{single}</label>
            <Input
              onChange={handleChange}
              type="radio"
              name="Marital Status"
              value="Marital Status_Single_On"
              id="marital_status_single"
            />
            <label htmlFor="marital_status_married">{married}</label>
            <Input
              onChange={handleChange}
              type="radio"
              name="Marital Status"
              value="Marital Status_Married_On"
              id="marital_status_married"
            />
            <label htmlFor="marital_status_separated">{separated}</label>
            <Input
              onChange={handleChange}
              type="radio"
              name="Marital Status"
              value="Marital Status_Separated_On"
              id="marital_status_separated"
            />
            <label htmlFor="marital_status_divorced">{divorced}</label>
            <Input
              onChange={handleChange}
              type="radio"
              name="Marital Status"
              value="Marital Status_Divorced_On"
              id="marital_status_divorced"
            />
            <label htmlFor="marital_status_commonlaw">{commonlaw}</label>
            <Input
              onChange={handleChange}
              type="radio"
              name="Marital Status"
              value="Marital Status_CommonLaw_On"
              id="marital_status_commonlaw"
            />
          </Card>
        </section>
        <section className={Field}>
          <label>{case_type}</label>
          <Card className={RadioCard}>
            <label htmlFor="Felony">{case_felony}</label>
            <Input onChange={handleChange} type="checkbox" id="Felony" />
            <label htmlFor="Misdemeanor">{case_misdemeanor}</label>
            <Input onChange={handleChange} type="checkbox" id="Misdemeanor" />
            <label htmlFor="Unsure">{dont_know}</label>
            <Input onChange={handleChange} type="checkbox" id="Unsure" />
          </Card>
        </section>
        <section className={Field}>
          <label>{marijuana}</label>
          <Card className={RadioCard}>
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
          </Card>
        </section>
        <section className={Field}>
          <label htmlFor="Case Numbers if known">{numbers}</label>
          <Input
            onChange={handleChange}
            type="text"
            id="Case Numbers if known"
          />
        </section>
        <section className={Field}>
          <label>{county}</label>
          <Card className={RadioCard}>
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
          </Card>
        </section>
        <section className={Field}>
          <label>{currently_on_probation}</label>
          <Card className={RadioCard}>
            <label htmlFor="current_probation_yes">{yes}</label>
            <Input
              onChange={handleChange}
              type="radio"
              name="Are you currently on probation or parole"
              value="Are you currently on probation or parole_yes_On"
              id="current_probation_yes"
            />
            <label htmlFor="current_probation_no">No</label>
            <Input
              onChange={handleChange}
              type="radio"
              name="Are you currently on probation or parole"
              value="Are you currently on probation or parole_no_On"
              id="current_probation_no"
            />
            <label htmlFor="current_probation_unsure">{dont_know}</label>
            <Input
              onChange={handleChange}
              type="radio"
              name="Are you currently on probation or parole"
              value="Are you currently on probation or parole_unsure If yes where_On"
              id="current_probation_unsure"
            />
          </Card>
        </section>
        <section className={Field}>
          <label htmlFor="unsure If yes where">{where}</label>
          <Input onChange={handleChange} type="text" id="unsure If yes where" />
        </section>
        <section className={Field}>
          <label htmlFor="Number of Dependents">{dependents}</label>
          <Input
            onChange={handleChange}
            type="number"
            id="Number of Dependents"
          />
        </section>
        <section className={Field}>
          <label htmlFor="Take Home Pay">{income}</label>
          <Input onChange={handleChange} type="number" id="Take Home Pay" />
        </section>
        <section className={Field}>
          <label>{frequency}</label>
          <Card className={RadioCard}>
            <label htmlFor="Weekly">{week}</label>
            <Input onChange={handleChange} type="checkbox" id="Weekly" />
            <label htmlFor="Monthly-0">{month}</label>
            <Input onChange={handleChange} type="checkbox" id="Monthly-0" />
          </Card>
        </section>
        <section className={Field}>
          <label htmlFor="Employer Name">{income_source}</label>
          <Input onChange={handleChange} type="text" id="Employer Name" />
        </section>
        <section className={Field}>
          <label htmlFor="Textfield-12">{savings}</label>
          <Input onChange={handleChange} type="number" id="Textfield-12" />
        </section>
        <section className={Field}>
          <label>{unemployment_benefits}</label>
          <Card className={RadioCard}>
            <label htmlFor="unemployed_benefits_yes">{yes}</label>
            <Input
              onChange={handleChange}
              type="radio"
              name="Unemployment Benefits"
              value="Unemployment Benefits_Yes_On"
              id="unemployed_benefits_yes"
            />
            <label htmlFor="unemployed_benefits_no">No</label>
            <Input
              onChange={handleChange}
              type="radio"
              name="Unemployment Benefits"
              value="Unemployment Benefits_No Amount_On"
              id="unemployed_benefits_no"
            />
          </Card>
        </section>
        <section className={Field}>
          <label htmlFor="Textfield-14">{expenses}</label>
          <Input onChange={handleChange} type="number" id="Textfield-14" />
        </section>
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
      <ExpungementSignature
        setExpungeInfo={setExpungeInfo}
        expungeInfo={expungeInfo}
        handleChange={handleChange}
        animationClass={Load}
      />
      <Button disabled={!expungeInfo?.certified} role="button" type="submit">
        {submit}
      </Button>
    </form>
  )
}

export default ExpungementForm
