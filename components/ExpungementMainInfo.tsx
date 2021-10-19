import {
  useRef,
  Dispatch,
  SetStateAction,
  MutableRefObject,
  ChangeEvent,
} from 'react'

import styles from './ExpungementForm.module.css'
const { LabelMargin, Selected, Deslected } = styles

import { states } from '../constants'
import { ExpungementInfo, CopyHolder } from '../types'
import { useLanguage, useIntersectionStyle } from '../hooks'
import { Card, Paragraph, Input } from '../ui'

interface ExpungementMainInfoProps {
  expungeInfo: ExpungementInfo
  setExpungeInfo: Dispatch<SetStateAction<ExpungementInfo>>
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
    license: "ID/Driver's License #",
    home_phone: 'Home Phone',
    work_phone: 'Work Phone',
    cell_phone: 'Cell Phone',
    preferred_phone: 'Please call me on my:',
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
    license: 'Número de identificación',
    home_phone: 'Teléfono de casa',
    work_phone: 'Teléfono del trabajo',
    cell_phone: 'Teléfono móvil',
    preferred_phone: 'Por favor llámame a mi:',
  },
}

const ExpungementMainInfo = ({
  expungeInfo,
  setExpungeInfo,
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
    license,
    home_phone,
    work_phone,
    cell_phone,
    preferred_phone,
  } = copy[language]

  useIntersectionStyle(infoRef, animationClass)

  const handleChange = ({
    target,
  }: ChangeEvent<HTMLInputElement | HTMLSelectElement>): void => {
    // @ts-ignore
    const { id, value, checked, name } = target
    if (checked) setExpungeInfo(val => ({ ...val, [name]: val[value] }))
    else setExpungeInfo(val => ({ ...val, [id]: value }))
  }

  return (
    <Card ref={infoRef}>
      <Paragraph size="med-text" color="highlight">
        {info}
      </Paragraph>
      <section>
        <label htmlFor="name">{name}</label>
        <Input onChange={handleChange} type="text" id="name" />
        <label htmlFor="ssn">{ssn}</label>
        <Input
          onChange={handleChange}
          type="text"
          id="ssn"
          placeholder="555-55-5555"
          required
          pattern="\d{3}-?\d{2}-?\d{4}"
        />
        <label htmlFor="dob">{dob}</label>
        <Input onChange={handleChange} type="date" id="dob" />
      </section>
      <section>
        <label htmlFor="address">{address}</label>
        <Input onChange={handleChange} type="text" id="address" />
        <label htmlFor="city">{city}</label>
        <Input onChange={handleChange} type="text" id="city" />
        <label htmlFor="state">{state}</label>
        <select onChange={handleChange} id="state">
          {states.map((state: string, i: number) => (
            <option
              key={i}
              value={state}
              selected={state === 'CA' ? true : false}
            >
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
        <label htmlFor="home_phone">{home_phone}</label>
        <Input onChange={handleChange} type="tel" id="home_phone" />
        <label htmlFor="work_phone">{work_phone}</label>
        <Input onChange={handleChange} type="tel" id="work_phone" />
        <label htmlFor="cell_phone">{cell_phone}</label>
        <Input onChange={handleChange} type="tel" id="cell_phone" />
      </section>
      <section>
        <label className={LabelMargin}>{preferred_phone}</label>
        <label
          htmlFor="home_phone_radio"
          className={expungeInfo?.home_phone ? Selected : Deslected}
        >
          {home_phone}
        </label>
        <Input
          onChange={handleChange}
          type="radio"
          disabled={!expungeInfo?.home_phone}
          name="preferred_phone"
          value="home_phone"
          id="home_phone_radio"
        />
        <label
          htmlFor="work_phone_radio"
          className={expungeInfo?.work_phone ? Selected : Deslected}
        >
          {work_phone}
        </label>
        <Input
          onChange={handleChange}
          type="radio"
          disabled={!expungeInfo?.work_phone}
          name="preferred_phone"
          value="work_phone"
          id="work_phone_radio"
        />
        <label
          htmlFor="cell_phone_radio"
          className={expungeInfo?.cell_phone ? Selected : Deslected}
        >
          {cell_phone}
        </label>
        <Input
          onChange={handleChange}
          type="radio"
          disabled={!expungeInfo?.cell_phone}
          name="preferred_phone"
          value="cell_phone"
          id="cell_phone_radio"
        />
        <label htmlFor="license">{license}</label>
        <Input onChange={handleChange} type="text" id="license" />
      </section>
    </Card>
  )
}

export default ExpungementMainInfo
