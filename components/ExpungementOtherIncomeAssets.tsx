import { useRef, MutableRefObject, ChangeEvent } from 'react'

import { CopyHolder } from '../types'
import { Card, Paragraph, Input } from '../ui'
import { useLanguage, useIntersectionStyle } from '../hooks'

const copy: CopyHolder = {
  english: {
    income: 'Other Income / Assets (Self & Spouse)',
    cSupport: 'Child Support',
    disability: 'Disability',
    social: 'Social Security Payments',
    welfare: 'Welfare',
    amount: 'Amount',
    real_estate: 'Real Estate',
    yes: 'Yes',
    checking: 'Amount in checking account',
    savings: 'Amount in savings account',
    cash: 'Cash on Hand',
    other: 'Other Income or assets valued at',
  },
  spanish: {
    income: 'Otros Ingresos/bienes mensuales (propios y de esposo(a))',
    cSupport: 'Manutencion de Hijos',
    disability: 'Compensación por incapacidad',
    social: 'Pagos recibidos de Seguro Social',
    welfare: 'Asistencia',
    amount: 'Monto',
    real_estate: 'Bienes Raíces',
    yes: 'Si',
    checking: 'Saldo en cuenta de Cheques',
    savings: 'Saldo en cuenta de Ahorros',
    cash: 'Dinero en Efectivo',
    other: 'Otros ingresos o valor de otros bienes',
  },
}

import styles from './ExpungementForm.module.css'
const { LabelMargin } = styles

interface ExpungementOtherIncomeAssetsProps {
  handleChange: ({
    target, // eslint-disable-line no-unused-vars
  }: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void
  animationClass: string
}

const ExpungementOtherIncomeAssets = ({
  handleChange,
  animationClass,
}: ExpungementOtherIncomeAssetsProps) => {
  const assetRef: MutableRefObject<HTMLDivElement> = useRef()
  const { language } = useLanguage()

  useIntersectionStyle(assetRef, animationClass)

  const {
    income,
    cSupport,
    disability,
    social,
    welfare,
    amount,
    real_estate,
    yes,
    checking,
    savings,
    cash,
    other,
  } = copy[language]

  return (
    <Card ref={assetRef}>
      <Paragraph size="med-text" color="highlight">
        {income}
      </Paragraph>
      <section>
        <label htmlFor="Textfield-0">{cSupport} $</label>
        <Input onChange={handleChange} type="number" id="Textfield-0" />
      </section>
      <section>
        <label htmlFor="Textfield-2">{disability} $</label>
        <Input onChange={handleChange} type="number" id="Textfield-2" />
      </section>
      <section>
        <label htmlFor="Textfield-4">{social} $</label>
        <Input onChange={handleChange} type="number" id="Textfield-4" />
      </section>
      <section>
        <label className={LabelMargin}>{welfare}</label>
        <label htmlFor="AFDC">AFDC</label>
        <Input onChange={handleChange} type="checkbox" id="AFDC" />
        <label htmlFor="FS">FS</label>
        <Input onChange={handleChange} type="checkbox" id="FS" />
        <label htmlFor="Textfield-6">{amount} $</label>
        <Input onChange={handleChange} type="number" id="Textfield-6" />
      </section>
      <section>
        <label htmlFor="Textfield-8">SSI/SSP/GR $</label>
        <Input onChange={handleChange} type="number" id="Textfield-8" />
      </section>
      <section>
        <label className={LabelMargin}>{real_estate}</label>
        <label htmlFor="real_estate_yes">{yes}</label>
        <Input
          onChange={handleChange}
          type="radio"
          id="real_estate_yes"
          name="Real Estate"
          value="Real Estate_Yes_On"
        />
        <label htmlFor="real_estate_no">No</label>
        <Input type="radio" id="real_estate_no" name="Real Estate" />
        <Input onChange={handleChange} type="number" id="Textfield-9" />
      </section>
      <section>
        <label htmlFor="Textfield-11">{checking} $</label>
        <Input onChange={handleChange} type="number" id="Textfield-11" />
      </section>
      <section>
        <label htmlFor="Textfield-12">{savings} $</label>
        <Input onChange={handleChange} type="number" id="Textfield-12" />
      </section>
      <section>
        <label htmlFor="Textfield-15">{cash} $</label>
        <Input onChange={handleChange} type="number" id="Textfield-15" />
      </section>
      <section>
        <label htmlFor="Other Income or assets valued at">{other} $</label>
        <Input
          onChange={handleChange}
          type="number"
          id="Other Income or assets valued at"
        />
      </section>
    </Card>
  )
}

export default ExpungementOtherIncomeAssets
