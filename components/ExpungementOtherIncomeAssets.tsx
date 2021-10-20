import { useRef, MutableRefObject, ChangeEvent } from 'react'

import { CopyHolder, ExpungementInfo } from '../types'
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
    location: 'Located at',
    value: 'Value',
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
    location: 'Ubicado en',
    value: 'Valor',
    checking: 'Saldo en cuenta de Cheques',
    savings: 'Saldo en cuenta de Ahorros',
    cash: 'Dinero en Efectivo',
    other: 'Otros ingresos o valor de otros bienes',
  },
}

import styles from './ExpungementForm.module.css'
const { LabelMargin, Selected, Deslected } = styles

interface ExpungementOtherIncomeAssetsProps {
  expungeInfo: ExpungementInfo
  handleChange: ({
    target, // eslint-disable-line no-unused-vars
  }: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void
  animationClass: string
}

const ExpungementOtherIncomeAssets = ({
  expungeInfo,
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
    location,
    value,
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
        <label htmlFor="other_income_child_support">{cSupport} $</label>
        <Input
          onChange={handleChange}
          type="number"
          id="other_income_child_support"
        />
        <label htmlFor="other_income_disability">{disability} $</label>
        <Input
          onChange={handleChange}
          type="number"
          id="other_income_disability"
        />
      </section>
      <section>
        <label htmlFor="other_income_social_security">{social} $</label>
        <Input
          onChange={handleChange}
          type="number"
          id="other_income_social_security"
        />
        <label className={LabelMargin}>{welfare}</label>
        <label htmlFor="other_income_welfare_amount">{amount} $</label>
        <Input
          onChange={handleChange}
          type="number"
          id="other_income_welfare_amount"
        />
        <label htmlFor="other_income_welfare_afdc">AFDC</label>
        <Input
          onChange={handleChange}
          type="checkbox"
          id="other_income_welfare_afdc"
        />
        <label htmlFor="other_income_welfare_fs">FS</label>
        <Input
          onChange={handleChange}
          type="checkbox"
          id="other_income_welfare_fs"
        />
      </section>
      <section>
        <label htmlFor="other_income_social_security" className={LabelMargin}>
          {real_estate}
        </label>
        <label htmlFor="other_income_real_estate_yes">{yes}</label>
        <Input
          onChange={handleChange}
          type="radio"
          name="real_estate_yes_or_no"
          value="other_income_real_estate_no"
          id="other_income_real_estate_yes"
        />
        <label htmlFor="other_income_real_estate_no">No</label>
        <Input
          onChange={handleChange}
          type="radio"
          name="real_estate_yes_or_no"
          value="other_income_real_estate_yes"
          id="other_income_real_estate_no"
        />
        <label
          htmlFor="other_income_real_estate_address"
          className={
            expungeInfo?.other_income_real_estate_yes ? Selected : Deslected
          }
        >
          {location}
        </label>
        <Input
          onChange={handleChange}
          disabled={!expungeInfo?.other_income_real_estate_yes}
          type="text"
          id="other_income_real_estate_address"
        />
        <label
          htmlFor="other_income_real_estate_value"
          className={
            expungeInfo?.other_income_real_estate_yes ? Selected : Deslected
          }
        >
          {value} $
        </label>
        <Input
          onChange={handleChange}
          disabled={!expungeInfo?.other_income_real_estate_yes}
          type="number"
          id="other_income_real_estate_value"
        />
      </section>
      <section>
        <label htmlFor="other_income_checking">{checking} $</label>
        <Input
          onChange={handleChange}
          type="number"
          id="other_income_savings"
        />
        <label htmlFor="other_income_checking">{savings} $</label>
        <Input
          onChange={handleChange}
          type="number"
          id="other_income_savings"
        />
      </section>
      <section>
        <label htmlFor="other_income_ssi_ssp_gr">SSI/SSP/GR $</label>
        <Input
          onChange={handleChange}
          type="number"
          id="other_income_ssi_ssp_gr"
        />
        <label htmlFor="oother_income_cash">{cash} $</label>
        <Input onChange={handleChange} type="number" id="other_income_cash" />
      </section>
      <section>
        <label htmlFor="other_income_checking">{checking} $</label>
        <Input
          onChange={handleChange}
          type="number"
          id="other_income_checking"
        />
        <label htmlFor="other_income_savings">{savings} $</label>
        <Input
          onChange={handleChange}
          type="number"
          id="other_income_savings"
        />
      </section>
      <section>
        <label htmlFor="other_income_value_of_assets">{other} $</label>
        <Input
          onChange={handleChange}
          type="number"
          id="other_income_value_of_assets"
        />
      </section>
    </Card>
  )
}

export default ExpungementOtherIncomeAssets
