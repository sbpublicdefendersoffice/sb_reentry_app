import { useRef, MutableRefObject, ChangeEvent } from 'react'

import styles from './ExpungementForm.module.css'
const { LabelMargin } = styles

import { states } from '../constants'
import { CopyHolder } from '../types'
import { useLanguage, useIntersectionStyle } from '../hooks'
import { Card, Paragraph, Input } from '../ui'

interface ExpungementMainInfoProps {
  handleChange: ({
    target, // eslint-disable-line no-unused-vars
  }: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void
  animationClass: string
}

const copy: CopyHolder = {
  english: {
    info: 'Identifying Information',
    name: 'Full Name',
    ssn: 'Social Security Number',
    dob: 'Date of Birth',
    address: 'Address',
    city: 'City',
    state: 'State',
    zip: 'Zip',
    primary_phone: 'Primary Phone',
    leave_message: 'Is it okay to leave a voice message',
    yes: 'Yes',
    alternate_number: 'Alternate Number',
    alias: 'Any other names that might be on your record',
    race: 'Race/Ethnicity',
    primary_lang: 'Primary Language',
    English: 'English',
    Spanish: 'Spanish',
    other: 'Other',
    phone: 'Phone',
    text: 'Text',
    communicate: 'Preferred Method of Communication',
    purpose: 'What is your primary purpose for applying?',
    employment: 'Employment',
    housing: 'Housing',
    benefits: 'Government Benefits',
    licensing: 'Licensing',
  },
  spanish: {
    info: 'Información Identificativa',
    name: 'Nombre Completo',
    ssn: 'Número de Seguridad Social',
    dob: 'Fecha de Cumpleaños',
    address: 'Dirección',
    city: 'Ciudad',
    state: 'Estado',
    zip: 'Código Postal',
    primary_phone: 'Teléfono Principal',
    leave_message: '¿Está bien dejar un mensaje de voz?',
    yes: 'Si',
    alternate_number: 'Número Alternativo',
    alias: 'Cualquier otro nombre que pueda estar en su registro',
    race: 'Raza / etnia',
    primary_lang: 'Lenguaje primario',
    English: 'Inglés',
    Spanish: 'Español',
    other: 'Otro',
    phone: 'Teléfono',
    text: 'Texto',
    communicate: 'Método de comunicación preferido',
    purpose: '¿Cuál es su propósito principal para postularse?',
    employment: 'Empleo',
    housing: 'Alojamiento',
    benefits: 'Beneficios del gobierno',
    licensing: 'Licencia',
  },
}

const ExpungementMainInfo = ({
  handleChange,
  animationClass,
}: ExpungementMainInfoProps) => {
  const infoRef: MutableRefObject<HTMLDivElement> = useRef()
  const { language } = useLanguage()

  const {
    info,
    name,
    ssn,
    dob,
    address,
    city,
    state,
    zip,
    primary_phone,
    leave_message,
    yes,
    alternate_number,
    alias,
    race,
    primary_lang,
    English,
    Spanish,
    other,
    phone,
    text,
    communicate,
    purpose,
    employment,
    housing,
    benefits,
    licensing,
  } = copy[language]

  useIntersectionStyle(infoRef, animationClass)

  return (
    <Card ref={infoRef}>
      <Paragraph size="med-text" color="highlight">
        {info}
      </Paragraph>
      <section>
        <label htmlFor="Full Name">{name}</label>
        <Input onChange={handleChange} type="text" id="Full Name" />
      </section>
      <section>
        <label htmlFor="Any other names that might be on your record">
          {alias}
        </label>
        <Input
          onChange={handleChange}
          type="text"
          id="Any other names that might be on your record"
        />
      </section>
      <section>
        <label htmlFor="Social Security No">{ssn}</label>
        <Input
          onChange={handleChange}
          type="text"
          id="Social Security No"
          placeholder="555-55-5555"
          required
          pattern="\d{3}-?\d{2}-?\d{4}"
        />
      </section>
      <section>
        <label htmlFor="Date of Birth">{dob}</label>
        <Input onChange={handleChange} type="date" id="Date of Birth" />
      </section>
      <section>
        <label htmlFor="RaceEthnicity">{race}</label>
        <Input onChange={handleChange} type="text" id="RaceEthnicity" />
      </section>
      <section>
        <label className={LabelMargin}>{primary_lang}</label>
        <label htmlFor="English">{English}</label>
        <Input onChange={handleChange} type="checkbox" id="English" />
        <label htmlFor="Spanish">{Spanish}</label>
        <Input onChange={handleChange} type="checkbox" id="Spanish" />
        <label htmlFor="M ixteco">Mixteco</label>
        <Input onChange={handleChange} type="checkbox" id="M ixteco" />
        <label htmlFor="Other">{other}</label>
        <Input onChange={handleChange} type="checkbox" id="Other" />
        <Input onChange={handleChange} type="text" id="Other-0" />
      </section>
      <section>
        <label htmlFor="Phone Number">{primary_phone}</label>
        <Input onChange={handleChange} type="tel" id="Phone Number" />
        <label className={LabelMargin}>{leave_message}</label>
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
      </section>
      <section>
        <label htmlFor="Alternate Number">{alternate_number}</label>
        <Input onChange={handleChange} type="tel" id="Alternate Number" />
        <label className={LabelMargin}>{leave_message}</label>
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
      </section>
      <section>
        <label htmlFor="Address">{address}</label>
        <Input onChange={handleChange} type="text" id="Address" required />
      </section>
      <section>
        <label htmlFor="City">{city}</label>
        <Input onChange={handleChange} type="text" id="City" required />
      </section>
      <section>
        <label htmlFor="state">{state}</label>
        <select onChange={handleChange} id="state" defaultValue="CA" required>
          {states.map((state: string, i: number) => (
            <option key={i} value={state}>
              {state}
            </option>
          ))}
        </select>
        <label htmlFor="zip">{zip}</label>
        <Input
          onChange={handleChange}
          id="zip"
          type="text"
          placeholder="12345"
          required
          pattern="\d{5}"
        />
      </section>
      <section>
        <label htmlFor="Email Address">E-mail</label>
        <Input onChange={handleChange} type="email" id="Email Address" />
      </section>
      <section>
        <label className={LabelMargin}>{communicate}</label>
        <label htmlFor="Email">E-mail</label>
        <Input onChange={handleChange} type="checkbox" id="Email" />
        <label htmlFor="Phone">{phone}</label>
        <Input onChange={handleChange} type="checkbox" id="Phone" />
        <label htmlFor="Text">{text}</label>
        <Input onChange={handleChange} type="checkbox" id="Text" />
      </section>
      <section>
        <label className={LabelMargin}>{purpose}</label>
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
      </section>
    </Card>
  )
}

export default ExpungementMainInfo
