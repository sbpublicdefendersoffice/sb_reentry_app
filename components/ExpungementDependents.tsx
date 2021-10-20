import { useRef, MutableRefObject, ChangeEvent } from 'react'

import { CopyHolder } from '../types'
import { Card, Paragraph, Input } from '../ui'
import { useLanguage, useIntersectionStyle } from '../hooks'

const copy: CopyHolder = {
  english: {
    dependents: 'Dependents',
    number: 'Number of Dependents',
    relationship: 'Dependent Relationship and Age',
  },
  spanish: {
    dependents: 'Dependientes',
    number: 'Cuantos dependientes',
    relationship: 'Relación Dependiente y Edad',
  },
}

interface ExpungementDependentsProps {
  handleChange: ({
    target, // eslint-disable-line no-unused-vars
  }: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void
  animationClass: string
}

// dependents
// number_of_dependents, dependent_relationship_and_age,

const ExpungementDependents = ({
  handleChange,
  animationClass,
}: ExpungementDependentsProps) => {
  const dependRef: MutableRefObject<HTMLDivElement> = useRef()
  const { language } = useLanguage()

  useIntersectionStyle(dependRef, animationClass)

  const { dependents, number, relationship } = copy[language]

  return (
    <Card ref={dependRef}>
      <Paragraph size="med-text" color="highlight">
        {dependents}
      </Paragraph>
      <section>
        <label htmlFor="number_of_dependents">{number}</label>
        <Input
          onChange={handleChange}
          type="number"
          id="number_of_dependents"
        />
        <label htmlFor="dependent_relationship_and_age">{relationship}</label>
        <Input
          onChange={handleChange}
          type="text"
          id="dependent_relationship_and_age"
        />
      </section>
    </Card>
  )
}

export default ExpungementDependents
