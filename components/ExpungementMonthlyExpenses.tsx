import { useRef, MutableRefObject, ChangeEvent } from 'react'

import { CopyHolder } from '../types'
import { Card, Paragraph, Input } from '../ui'
import { useLanguage, useIntersectionStyle } from '../hooks'

const copy: CopyHolder = {
  english: {
    expenses: 'Monthly Expenses (Self & Spouse)',
    rent: 'Rent',
    utilities: 'Utilities',
    food: 'Food',
    mortgage: 'Mortgage',
    cSupport: 'Child Support',
    vehicle: 'Vehicle Loan/Purchase Payment',
    insurance: 'Vehicle Insurance Payment',
    other: 'Other Expenses (Please Describe)',
    amount: 'Amount',
  },
  spanish: {
    expenses: 'Gastos mensuales (propios y de esposo(a))',
    rent: 'Alquilar',
    utilities: 'Utilidades',
    food: 'Comida',
    mortgage: 'Hipoteca',
    cSupport: 'Manutencion de Hijos',
    vehicle: 'Préstamo de Vehículo',
    insurance: 'Pago del Seguro del Vehículo',
    other: 'Otros gastos (describa)',
    amount: 'Monto',
  },
}

interface ExpungementMonthlyExpensesProps {
  handleChange: ({
    target, // eslint-disable-line no-unused-vars
  }: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void
  animationClass: string
}

const ExpungementMonthlyExpenses = ({
  handleChange,
  animationClass,
}: ExpungementMonthlyExpensesProps) => {
  const expenseRef: MutableRefObject<HTMLDivElement> = useRef()
  const { language } = useLanguage()

  useIntersectionStyle(expenseRef, animationClass)

  const {
    expenses,
    rent,
    utilities,
    food,
    mortgage,
    cSupport,
    vehicle,
    insurance,
    other,
    amount,
  } = copy[language]

  return (
    <Card ref={expenseRef}>
      <Paragraph size="med-text" color="highlight">
        {expenses}
      </Paragraph>
      <section>
        <label htmlFor="Textfield">{rent} $</label>
        <Input onChange={handleChange} type="number" id="Textfield" />
        <label htmlFor="Textfield-1">{utilities} $</label>
        <Input onChange={handleChange} type="number" id="Textfield-1" />
      </section>
      <section>
        <label htmlFor="Textfield-3">{food} $</label>
        <Input onChange={handleChange} type="number" id="Textfield-3" />
        <label htmlFor="Textfield-5">{mortgage} $</label>
        <Input onChange={handleChange} type="number" id="Textfield-5" />
      </section>
      <section>
        <label htmlFor="Textfield-7">{cSupport} $</label>
        <Input onChange={handleChange} type="number" id="Textfield-7" />
        <label htmlFor="Vehicle LoansPayment Monthly">{vehicle} $</label>
        <Input
          onChange={handleChange}
          type="number"
          id="Vehicle LoansPayment Monthly"
        />
      </section>
      <section>
        <label htmlFor="Textfield-10">{insurance} $</label>
        <Input onChange={handleChange} type="number" id="Textfield-10" />
      </section>
      <section>
        <label htmlFor="Textfield-13">{other}</label>
        <Input onChange={handleChange} type="text" id="Textfield-13" />
        <label htmlFor="Textfield-14">{amount} $</label>
        <Input onChange={handleChange} type="number" id="Textfield-14" />
      </section>
    </Card>
  )
}

export default ExpungementMonthlyExpenses
