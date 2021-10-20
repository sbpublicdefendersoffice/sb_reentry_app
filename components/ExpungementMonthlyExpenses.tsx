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
        <label htmlFor="expenses_rent">{rent} $</label>
        <Input onChange={handleChange} type="number" id="expenses_rent" />
        <label htmlFor="expenses_utilities">{utilities} $</label>
        <Input onChange={handleChange} type="number" id="expenses_utilities" />
      </section>
      <section>
        <label htmlFor="expenses_food">{food} $</label>
        <Input onChange={handleChange} type="number" id="expenses_food" />
        <label htmlFor="expenses_mortgage">{mortgage} $</label>
        <Input onChange={handleChange} type="number" id="expenses_mortgage" />
      </section>
      <section>
        <label htmlFor="expenses_child_support">{cSupport} $</label>
        <Input
          onChange={handleChange}
          type="number"
          id="expenses_child_support"
        />
        <label htmlFor="expenses_vehicle_payment">{vehicle} $</label>
        <Input
          onChange={handleChange}
          type="number"
          id="expenses_vehicle_payment"
        />
      </section>
      <section>
        <label htmlFor="expenses_vehicle_insurance">{insurance} $</label>
        <Input
          onChange={handleChange}
          type="number"
          id="expenses_vehicle_insurance"
        />
      </section>
      <section>
        <label htmlFor="expenses_vehicle_insurance">{insurance} $</label>
        <Input
          onChange={handleChange}
          type="number"
          id="expenses_vehicle_insurance"
        />
      </section>
      <section>
        <label htmlFor="expenses_other_expense_one_description">
          {other} $
        </label>
        <Input
          onChange={handleChange}
          type="text"
          id="expenses_other_expense_one_description"
        />
        <label htmlFor="expenses_other_expense_one_amount">{amount} $</label>
        <Input
          onChange={handleChange}
          type="number"
          id="expenses_other_expense_one_amount"
        />
      </section>
      <section>
        <label htmlFor="expenses_other_expense_one_description">
          {other} $
        </label>
        <Input
          onChange={handleChange}
          type="text"
          id="expenses_other_expense_two_description"
        />
        <label htmlFor="expenses_other_expense_two_amount">{amount} $</label>
        <Input
          onChange={handleChange}
          type="number"
          id="expenses_other_expense_two_amount"
        />
      </section>
    </Card>
  )
}

export default ExpungementMonthlyExpenses
