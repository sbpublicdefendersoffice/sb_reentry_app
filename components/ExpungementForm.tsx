import {
  useState,
  FormEvent,
  ChangeEvent,
  MutableRefObject,
  useRef,
  Dispatch,
  SetStateAction,
} from 'react'
import { useRouter } from 'next/router'

import { useLanguage, useIntersectionStyle, useToast } from '../hooks'
import { validations, states } from '../constants'
import { ExpungementInfo, CopyHolder, Validation } from '../types'
import ExpungementSignature from './ExpungementSignature'
import ExpungementDisclaimer from './ExpungementDisclaimer'
import ExpungementAdditionalInfoForm from './ExpungementAdditionalInfoForm'
import ExpungementDemographics from './ExpungementDemographics'

import styles from './ExpungementForm.module.css'

import { Title, Button, Card, Paragraph, Input } from '../ui'
import { FemaleSharp } from '@mui/icons-material'

const copy: CopyHolder = {
  english: {
    title: 'Apply for Fresh Start Record Expungement',
    elgible: 'You are not eligible for this relief if',
    one: 'You are currently involved in an active prosecution',
    two: 'You are currently serving a sentence in jail or prison',
    three: 'You are currently on probation',
    submit: 'Submit Information',
    uptrust: 'Uptrust Enrollment',
    enroll:
      'I would like to be enrolled in Uptrust to receive text messages about upcoming court hearings and office appointments',
    success:
      "Your application has been submitted to the Public Defender's office",
    name: 'What is your full name?',
    alias: 'Are there any other names that might be on your record?',
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
    expenses: 'About how much do you spend on your monthly expenses?',
    total: 'Total expenses',
    disclaimer:
      "Please ensure that all of the information you have filled out is correct before submitting, once submitted you will not be able to alter it without contacting the Public Defender's office directly",
    maritalExplain:
      'Your marital status may affect your eligibility for expungement',
    prop64:
      "California's Propostion 64 allows many crimes involving marijuana to be expunged",
    incomeExplain:
      'Income can include money earned from a job, unemployment benefits, social security or retirement income, food stamps or any way that you receive money on a regular schedule',
    exact:
      'If you do not have an exact figure, please estimate to the nearest hundred',
    saveExplain:
      'The amount of money you have saved may affect your eligibility for expungement',
    multiple: 'Please select all that apply',
    expenseExplain:
      'Expenses can include anything you regularly spend money on; such as rent, mortgage, groceries, utilities, medical expenses, or childcare',
    heading:
      "The Public Defender's Office helps those who need legal support in their cases",
    heading2:
      'The information you provide in this form will help us understand how we can help you',
    heading3: 'All information will be kept confidential',
    heading4:
      'If there is no answer to any of the below questions, please mark “0” or “N/A”',
    realEstate: 'Do you own a home or have a rental property?',
    realEstateExplain:
      'The amount of equity in your property may affect your eligibility for expungement',
    value: 'Value',
    homeless: 'Are you currently experiencing homelessness?',
    whatIsPrimaryLang: 'What is your primary language?',
    biWeekly: 'Bi-Weekly',
    annually: 'Annually',
    immigration: 'Immigration',
    ssn: 'What is your Social Security Number?',
    english: 'English',
    spanish: 'Spanish',
    mixteco: 'Mixteco',
    driver: 'Drivers License/State ID #?',
  },
  spanish: {
    title: 'Solicite la cancelación de antecedentes penales',
    elgible: 'No es elegible para este alivio si',
    one: 'Actualmente está involucrado en un enjuiciamiento activo',
    two: 'Actualmente está cumpliendo una sentencia en la cárcel o prisión',
    three: 'Actualmente estás en libertad condicional (probation)',
    submit: 'Enviar información',
    uptrust: 'Inscripción Uptrust',
    enroll:
      'Yo quisiera inscribirme en Uptrust para recibir mensajes de texto acerca de la proxima audiencias judiciales y citas en la oficina',
    success: 'Su solicitud ha sido enviada a la oficina del Defensor Público',
    name: '¿Cuál es su nombre completo?',
    alias: '¿Hay otros nombres que podrían estar en su registro?',
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
    expenses: '¿Aproximadamente cuánto gasta en sus gastos mensuales?',
    total: 'Gastos totales',
    disclaimer:
      'Asegúrese de que toda la información que haya completado sea correcta antes de enviarla; una vez enviada, no podrá modificarla sin comunicarse directamente con la oficina del Defensor Público.',
    maritalExplain:
      'Su estado civil puede afectar su elegibilidad para eliminación de antecedentes penales',
    prop64:
      'La Propuesta 64 de California permite eliminar muchos delitos relacionados con la marihuana',
    incomeExplain:
      'Los ingresos pueden incluir dinero ganado en un trabajo, beneficios de desempleo, seguridad social o ingresos de jubilación, cupones de alimentos o cualquier forma en que reciba dinero en un horario regular',
    exact:
      'Si no tiene una cifra exacta, por favor calcule a la centena más cercana',
    saveExplain:
      'La cantidad de dinero que ha ahorrado puede afectar su elegibilidad para la eliminación de antecedentes penales.',
    multiple: 'Por favor seleccione todas las respuestas válidas',
    expenseExplain:
      'Los gastos pueden incluir todo aquello en lo que gasta dinero habitualmente; como alquiler, hipoteca, comestibles, servicios públicos, gastos médicos o cuidado de niños',
    heading:
      'La Defensoría Pública ayuda a quienes necesitan apoyo legal en sus casos',
    heading2:
      'La información que proporcione en este formulario nos ayudará a comprender cómo podemos ayudarlo',
    heading3: 'Toda la información se mantendrá confidencial',
    heading4:
      'Si no hay respuesta a alguna de las siguientes preguntas, marque "0" o "N/A"',
    realEstate: '¿Es dueño de una casa o tiene una propiedad de alquiler?',
    realEstateExplain:
      'La cantidad de equidad en su propiedad puede afectar su elegibilidad para la eliminación de antecedentes penales',
    value: 'Valor',
    homeless: '¿Está experimentando actualmente la falta de vivienda?',
    whatIsPrimaryLang: '¿Cuál es su idioma principal?',
    biWeekly: 'Quincenal',
    annually: 'Anualmente',
    immigration: 'Inmigración',
    ssn: '¿Cuál es su número de seguro social?',
    english: 'Inglés',
    spanish: 'Español',
    mixteco: 'Mixteco',
    driver: '¿Licencia de conducir?',
  },
}

const { Load, Field, RadioCard } = styles

interface ExpungementFormProps {
  clientId: number
  setHasClientApplied: Dispatch<SetStateAction<boolean>>
  savedEmail: string
  commPrefs: string[]
}

const ExpungementForm = ({
  clientId,
  setHasClientApplied,
  savedEmail,
  commPrefs,
}: ExpungementFormProps) => {
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
    success,
    name,
    alias,
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
    // income_source,
    savings,
    // unemployment_benefits,
    expenses,
    total,
    disclaimer,
    maritalExplain,
    prop64,
    incomeExplain,
    exact,
    saveExplain,
    multiple,
    expenseExplain,
    heading,
    heading2,
    heading3,
    heading4,
    realEstate,
    realEstateExplain,
    value,
    homeless,
    primaryLang,
    whatIsPrimaryLang,
    biWeekly,
    annually,
    immigration,
    ssn,
    spanish,
    english,
    mixteco,
    driver,
  } = copy[language]

  // @ts-ignore
  const [expungeInfo, setExpungeInfo] = useState<ExpungementInfo | null>({
    Date: new Date().toISOString().substring(0, 10),
    'Email Address': savedEmail || '',
    CheckBox4: false,
    CheckBox5: false,
    CheckBox6: false,
    CheckBox7: false,
    CheckBox8: false,
    CheckBox9: commPrefs?.includes('commByEmail') || false,
    CheckBox10: commPrefs?.includes('commByPhone') || false,
    CheckBox11: commPrefs?.includes('commByText') || false,
    CheckBox19: false,
    CheckBox20: false,
    CheckBox45: false,
    CheckBox52: false,
    CheckBox57: false,
  })

  useIntersectionStyle(formRef, Load)

  const submitExpungementForm = async (
    e: FormEvent<HTMLFormElement>,
  ): Promise<void> => {
    e.preventDefault()
    try {
      let tempInfo: ExpungementInfo = expungeInfo

      validations.forEach((v: Validation): void => {
        const { error, field, id, inputId } = v

        if (field === 'Pronouns' || field === 'Gender' || field === 'Race') {
          let radios = document.getElementsByName(field)
          let isValid = false

          radios.forEach(radio => {
            if ((radio as HTMLInputElement).checked) {
              isValid = true
              return
            }
          })

          if (!isValid) {
            throw new Error(`${error[language]}&&#${id}&&${inputId}`)
          }
        } else if (!tempInfo[field])
          throw new Error(`${error[language]}&&#${id}&&${inputId}`)
      })

      if (tempInfo?.['Textfield-17']) tempInfo = { ...tempInfo, Expense: total }

      if (
        tempInfo?.['Is English your primary language'] ===
        'Is English your primary language_Yes_On'
      ) {
        tempInfo.English = true
        tempInfo.Other = false
        tempInfo['Other-0'] = ''
        tempInfo['If no what is your primary language'] = ''
      } else if (
        tempInfo?.['Is English your primary language'] ===
        'Is English your primary language_No_On'
      ) {
        tempInfo.Other = true
        tempInfo['Other-0'] =
          tempInfo['If no what is your primary language'] || ''
      }

      const { Address, City, state, zip } = tempInfo
      const stateAndZip = `${state || 'CA'}, ${zip}`
      const primaryPhone = tempInfo?.['Phone Number']

      const sendForm: Response = await fetch('/api/recordClearance', {
        method: 'POST',
        body: JSON.stringify({
          'Mailing Address': `${Address} ${City} ${stateAndZip}`,
          'State  Zip': stateAndZip,
          'Home Phone': primaryPhone || '',
          language,
          clientId,
          ...tempInfo,
        }),
      })

      console.log('\n\nAfter the api call\n\n')

      const res = await sendForm.json()
      if (res.error) throw new Error(res.error)
      else setToast(success)
      if (res?.[0]?.statusCode === 202) {
        setExpungeInfo(null)
        setHasClientApplied(true)
      }
    } catch (err) {
      const [msg, id, inputId] = err.message.split('&&')
      setToast(msg)

      const targInput = document.getElementById(inputId)
      push(id, id, { shallow: true })

      targInput.style.border = '.25rem solid red'
      setTimeout((): void => {
        targInput.style.border = 'var(--border-width) solid var(--primary)'
      }, 5000)
    }
  }

  const handleChange = ({
    target,
  }: ChangeEvent<HTMLInputElement | HTMLSelectElement>): void => {
    const { id, value, type, name } = target
    if (type === 'radio') {
      let radios = document.getElementsByName(name)
      radios.forEach(radio => {
        setExpungeInfo(val => ({
          ...val,
          [(radio as HTMLInputElement).id]: (radio as HTMLInputElement).checked,
        }))
      })
    } else if (type === 'checkbox')
      setExpungeInfo(val => ({
        ...val,
        [id]: !Boolean(val?.[id]),
      }))
    else setExpungeInfo(val => ({ ...val, [id]: value }))

    console.log(expungeInfo)
  }

  return (
    <form className={styles.ExpungementForm} onSubmit={submitExpungementForm}>
      <Title>{title}</Title>
      <Paragraph style={{ marginTop: 'var(--margin-lg)' }} size="med-text">
        {heading}
      </Paragraph>
      <Paragraph size="med-text">{heading2}</Paragraph>
      <Paragraph size="med-text">{heading3}</Paragraph>
      <Paragraph style={{ marginBottom: 'var(--margin-lg)' }} size="med-text">
        {heading4}
      </Paragraph>
      <Paragraph color="highlight" size="heading-text">
        {elgible}
      </Paragraph>
      <Paragraph size="med-text">1) {one}</Paragraph>
      <Paragraph size="med-text">2) {two}</Paragraph>
      <Paragraph size="med-text">3) {three}</Paragraph>
      <Card ref={formRef} className={styles.Card}>
        <section className={Field}>
          <label id="name-label" htmlFor="Full Name">
            {name}
          </label>
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
          <label id="dob-label" htmlFor="Date of Birth">
            {dob}
          </label>
          <Input onChange={handleChange} type="date" id="Date of Birth" />
        </section>
        <section className={Field}>
          <label htmlFor="Phone Number">{primary_phone}</label>
          <Input onChange={handleChange} type="tel" id="Phone Number" />
        </section>
        <section className={Field}>
          <label>{leave_message}</label>
          <Card className={RadioCard}>
            <label htmlFor="CheckBox5">{yes}</label>
            <Input
              onChange={handleChange}
              type="radio"
              name="voicemail1"
              value="Is it okay to leave a voice message_yes_On"
              id="CheckBox5"
            />
            <label htmlFor="CheckBox6">No</label>
            <Input
              onChange={handleChange}
              checked={expungeInfo?.CheckBox6}
              type="radio"
              name="voicemail1"
              value="Is it okay to leave a voice message_no_On"
              id="CheckBox6"
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
              name="voicemail2"
              value="Is is okay to leave a voice message_yes_On"
              id="CheckBox7"
            />
            <label htmlFor="alternate_phone_no">No</label>
            <Input
              onChange={handleChange}
              type="radio"
              name="voicemail2"
              value="Is is okay to leave a voice message_no_On"
              id="CheckBox8"
            />
          </Card>
        </section>
        <section className={Field}>
          <label id="address-label" htmlFor="Address">
            {address}
          </label>
          <Input onChange={handleChange} type="text" id="Address" />
        </section>
        <section className={Field}>
          <label id="city-label" htmlFor="City">
            {city}
          </label>
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
          <label id="zip-label" htmlFor="zip">
            {zip}
          </label>
          <Input
            onChange={handleChange}
            id="zip"
            type="text"
            placeholder="12345"
          />
        </section>
        <section className={Field}>
          <label htmlFor="Email Address">{email}</label>
          <Input
            value={expungeInfo?.['Email Address']}
            onChange={handleChange}
            type="email"
            id="Email Address"
          />
        </section>
        <section className={Field}>
          <label>{communicate}</label>
          <Paragraph color="deselected">{multiple}</Paragraph>
          <Card className={RadioCard}>
            <label htmlFor="Email">E-mail</label>
            <Input
              checked={expungeInfo?.CheckBox9}
              onChange={handleChange}
              type="checkbox"
              id="CheckBox9"
            />
            <label htmlFor="Phone">{phone}</label>
            <Input
              checked={expungeInfo?.CheckBox10}
              onChange={handleChange}
              type="checkbox"
              id="CheckBox10"
            />
            <label htmlFor="Text">{text}</label>
            <Input
              checked={expungeInfo?.CheckBox11}
              onChange={handleChange}
              type="checkbox"
              id="CheckBox11"
            />
          </Card>
        </section>
        <ExpungementDemographics
          expungeInfo={expungeInfo}
          handleChange={handleChange}
        />
        <section className={Field}>
          <label>{whatIsPrimaryLang}</label>
          <Card className={RadioCard}>
            <label htmlFor="English">{english}</label>
            <Input onChange={handleChange} type="checkbox" id="CheckBox1" />
            <label htmlFor="Spanish">{spanish}</label>
            <Input onChange={handleChange} type="checkbox" id="CheckBox2" />
            <label htmlFor="Mixteco">{mixteco}</label>
            <Input onChange={handleChange} type="checkbox" id="CheckBox3" />
            <label htmlFor="other">{other}</label>
            <Input onChange={handleChange} type="checkbox" id="CheckBox4" />
            {expungeInfo?.CheckBox4 && (
              <Input onChange={handleChange} id="Other" type="text" />
            )}
          </Card>
        </section>
        <section className={Field}>
          <label>{purpose}</label>
          <Card className={RadioCard}>
            <label htmlFor="Employment">{employment}</label>
            <Input onChange={handleChange} type="checkbox" id="CheckBox15" />
            <label htmlFor="Housing">{housing}</label>
            <Input onChange={handleChange} type="checkbox" id="CheckBox16" />
            <label htmlFor="Government Benefits">{benefits}</label>
            <Input onChange={handleChange} type="checkbox" id="CheckBox17" />
            <label htmlFor="Licensing">{licensing}</label>
            <Input onChange={handleChange} type="checkbox" id="CheckBox18" />
            <label htmlFor="show-other">{other}</label>
            <Input onChange={handleChange} type="checkbox" id="CheckBox19" />
            {expungeInfo?.CheckBox19 && (
              <Input onChange={handleChange} id="Other-0" type="text" />
            )}
          </Card>
        </section>
        <section className={Field}>
          <label>{currently_on_probation}</label>
          <Card className={RadioCard}>
            <label htmlFor="current_probation_yes">{yes}</label>
            <Input
              onChange={handleChange}
              type="radio"
              name="currentProbationParloe"
              value="Are you currently on probation or parole_yes_On"
              id="CheckBox12"
            />
            <label htmlFor="current_probation_no">No</label>
            <Input
              onChange={handleChange}
              type="radio"
              name="currentProbationParloe"
              value="Are you currently on probation or parole_no_On"
              id="CheckBox13"
            />
            <label htmlFor="current_probation_unsure">{dont_know}</label>
            <Input
              onChange={handleChange}
              type="radio"
              name="currentProbationParloe"
              value="Are you currently on probation or parole_unsure If yes where_On"
              id="CheckBox14"
            />
          </Card>
        </section>
        {(expungeInfo?.CheckBox12 || expungeInfo?.CheckBox14) && (
          <ExpungementDisclaimer />
        )}
        {expungeInfo?.CheckBox12 && (
          <>
            <section className={Field}>
              <label htmlFor="unsure If yes where">{where}</label>
              <Input
                onChange={handleChange}
                type="text"
                id="unsure If yes where"
              />
            </section>
          </>
        )}
        <section className={Field}>
          <label>{case_type}</label>
          <Card className={RadioCard}>
            <label htmlFor="Felony">{case_felony}</label>
            <Input onChange={handleChange} type="checkbox" id="CheckBox25" />
            <label htmlFor="Misdemeanor">{case_misdemeanor}</label>
            <Input onChange={handleChange} type="checkbox" id="CheckBox26" />
            <label htmlFor="Unsure">{dont_know}</label>
            <Input onChange={handleChange} type="checkbox" id="CheckBox27" />
          </Card>
        </section>
        <section className={Field}>
          <label>{marijuana}</label>
          <Paragraph color="deselected">{prop64}</Paragraph>
          <Card className={RadioCard}>
            <label htmlFor="marijuana_related_yes">{yes}</label>
            <Input
              onChange={handleChange}
              type="radio"
              name="Was it marijuana related"
              value="Was it marijuana related_yes_On"
              id="CheckBox28"
            />
            <label htmlFor="marijuana_related_no">No</label>
            <Input
              onChange={handleChange}
              type="radio"
              name="Was it marijuana related"
              value="Was it marijuana related_no_On"
              id="CheckBox29"
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
              id="CheckBox20"
            />
            <label htmlFor="convicted_in_sb_no">No</label>
            <Input
              onChange={handleChange}
              type="radio"
              name="Convicted in Santa Barbara County"
              value="Convicted in Santa Barbara County_no If yes_On"
              id="CheckBox21"
            />
          </Card>
        </section>
        {expungeInfo?.CheckBox20 && (
          <section className={Field}>
            <label>{county}</label>
            <Card className={RadioCard}>
              <label htmlFor="sb_convicted_in_sb_yes">Santa Barbara</label>
              <Input
                onChange={handleChange}
                type="radio"
                name="cityConvicted"
                id="CheckBox22"
              />
              <label htmlFor="sm_convicted_in_sb_no">Santa Maria</label>
              <Input
                onChange={handleChange}
                type="radio"
                name="cityConvicted"
                id="CheckBox23"
              />
              <label htmlFor="lom_convicted_in_sb_no">Lompoc</label>
              <Input
                onChange={handleChange}
                type="radio"
                name="cityConvicted"
                id="CheckBox24"
              />
            </Card>
          </section>
        )}
        <section className={Field}>
          <label>{marital}</label>
          <Paragraph color="deselected">{maritalExplain}</Paragraph>
          <Card className={RadioCard}>
            <label htmlFor="marital_status_single">{single}</label>
            <Input
              onChange={handleChange}
              type="radio"
              name="Marital Status"
              value="Marital Status_Single_On"
              id="CheckBox59"
            />
            <label htmlFor="marital_status_married">{married}</label>
            <Input
              onChange={handleChange}
              type="radio"
              name="Marital Status"
              value="Marital Status_Married_On"
              id="CheckBox60"
            />
            <label htmlFor="marital_status_separated">{separated}</label>
            <Input
              onChange={handleChange}
              type="radio"
              name="Marital Status"
              value="Marital Status_Separated_On"
              id="CheckBox61"
            />
            <label htmlFor="marital_status_divorced">{divorced}</label>
            <Input
              onChange={handleChange}
              type="radio"
              name="Marital Status"
              value="Marital Status_Divorced_On"
              id="CheckBox62"
            />
            <label htmlFor="marital_status_commonlaw">{commonlaw}</label>
            <Input
              onChange={handleChange}
              type="radio"
              name="Marital Status"
              value="Marital Status_CommonLaw_On"
              id="CheckBox63"
            />
          </Card>
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
          <Paragraph color="deselected">{incomeExplain}</Paragraph>
          <Paragraph color="deselected">{exact}</Paragraph>
          <Input onChange={handleChange} type="number" id="Take Home Pay" />
        </section>
        <section className={Field}>
          <label>{frequency}</label>
          <Card className={RadioCard}>
            <label htmlFor="Monthly">{month}</label>
            <Input
              onChange={handleChange}
              type="radio"
              name="pay-freq"
              id="Checkbox64"
            />
            <label htmlFor="Weekly Take Home Pay">{week}</label>
            <Input
              onChange={handleChange}
              type="radio"
              name="pay-freq"
              id="Checkbox65"
            />
            <label htmlFor="Bi-Weekly Take Home Pay">{biWeekly}</label>
            <Input
              onChange={handleChange}
              type="radio"
              name="pay-freq"
              id="Checkbox66"
            />
            <label htmlFor="Annual Take Home Pay">{annually}</label>
            <Input
              onChange={handleChange}
              type="radio"
              name="pay-freq"
              id="Checkbox67"
            />
          </Card>
        </section>
        <section className={Field}>
          <label htmlFor="Textfield-18">{savings}</label>
          <Paragraph color="deselected">{saveExplain}</Paragraph>
          <Paragraph color="deselected">{exact}</Paragraph>
          <Input onChange={handleChange} type="number" id="Textfield-18" />
        </section>
        <section className={Field}>
          <label>{realEstate}</label>
          <Paragraph color="deselected">{realEstateExplain}</Paragraph>
          <Paragraph color="deselected">{exact}</Paragraph>
          <Card className={RadioCard}>
            <label htmlFor="real_estate_yes">{yes}</label>
            <Input
              onChange={handleChange}
              type="radio"
              id="real_estate_yes"
              value="Real Estate_Yes_On"
              name="Real Estate"
            />
            <label htmlFor="real_estate_no">No</label>
            <Input
              onChange={handleChange}
              type="radio"
              id="real_estate_no"
              value="Real Estate_No_On"
              name="Real Estate"
            />
            {expungeInfo?.['Real Estate'] === 'Real Estate_Yes_On' && (
              <>
                <label htmlFor="Textfield-13">{value}</label>
                <Input
                  onChange={handleChange}
                  type="number"
                  id="Textfield-13"
                />
              </>
            )}
          </Card>
        </section>
        <section className={Field}>
          <label htmlFor="Textfield-17">{expenses}</label>
          <Paragraph color="deselected">{expenseExplain}</Paragraph>
          <Paragraph color="deselected">{exact}</Paragraph>
          <Input onChange={handleChange} type="number" id="Textfield-17" />
        </section>
        <ExpungementAdditionalInfoForm setExpungeInfo={setExpungeInfo} />
        <section className={Field}>
          <label id="SSN-label" htmlFor="SSN">
            {ssn}
          </label>
          <Input onChange={handleChange} type="text" id="SSN" />
        </section>
        <section className={Field}>
          <label id="dl-label" htmlFor="drivers license">
            {driver}
          </label>
          <Input
            onChange={handleChange}
            type="text"
            id="Drivers LicenseState ID"
          />
        </section>
      </Card>
      <ExpungementSignature
        expungeInfo={expungeInfo}
        handleChange={handleChange}
        animationClass={Load}
      />
      <Paragraph className={styles.VertMargin}>{disclaimer}</Paragraph>
      <Button disabled={!expungeInfo?.certified} role="button" type="submit">
        {submit}
      </Button>
    </form>
  )
}

export default ExpungementForm
