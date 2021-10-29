import { useRef, MutableRefObject, ChangeEvent } from 'react'

import { CopyHolder } from '../types'
import { Card, Paragraph, Input } from '../ui'
import { useLanguage, useIntersectionStyle } from '../hooks'

import styles from './ExpungementForm.module.css'
const { TitleLabel } = styles

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
  hasDependents: boolean
  handleChange: ({
    target, // eslint-disable-line no-unused-vars
  }: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void
  animationClass: string
}

const ExpungementDependents = ({
  hasDependents,
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
        <label className={TitleLabel} htmlFor="Number of Dependents">
          {number}
        </label>
        <Input
          onChange={handleChange}
          type="number"
          id="Number of Dependents"
        />
      </section>
      <section>
        <label className={TitleLabel} htmlFor="Relationship and Ages">
          {relationship}
        </label>
        <Input
          disabled={!hasDependents}
          onChange={handleChange}
          type="text"
          id="Relationship and Ages"
        />
      </section>
    </Card>
  )
}

export default ExpungementDependents
