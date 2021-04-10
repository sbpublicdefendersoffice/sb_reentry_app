import { ChangeEvent, Dispatch, ReactNode } from 'react'

import { ENGLISH, REGION_VISIBILITY } from '../constants'
import {
  CopyHolder,
  FilterMapAction,
  CountyVisibilityFilter,
  LocationRecord,
} from '../types'
import useLanguage from '../hooks/useLanguage'

import styles from './CityFilter.module.css'

export interface CityFilterProps {
  locationsToFilter: LocationRecord[]
  setLocRecordsToFilter: Dispatch<FilterMapAction>
  regionVisibility: CountyVisibilityFilter
  children?: ReactNode
}

export const copy: CopyHolder = {
  english: {
    southCounty: 'South County',
    centralCounty: 'Central County',
    northCounty: 'North County',
  },
  spanish: {
    southCounty: 'Condado del sur',
    centralCounty: 'Condado central',
    northCounty: 'Condado del norte',
  },
}

const CityFilter = ({
  locationsToFilter,
  setLocRecordsToFilter,
  regionVisibility,
  children,
}: CityFilterProps) => {
  const { language } = useLanguage()
  const activeCopy = copy[language]

  const handleCheck = (e: ChangeEvent<HTMLInputElement>): void => {
    const { id } = e.target

    setLocRecordsToFilter({
      filterName: REGION_VISIBILITY,
      value: {
        ...regionVisibility,
        [id]: !regionVisibility[id],
      },
      locationsToFilter,
    })
  }

  return (
    <form
      role="form"
      className={styles.CityFilter}
      style={{ width: `${language === ENGLISH ? 7.25 : 8.5}rem` }}
    >
      {Object.keys(regionVisibility).map((region: string) => (
        <div key={region} className={styles.CheckboxHolder}>
          <label role="label" className={styles.Label} htmlFor={region}>
            {activeCopy[region]}
          </label>
          <input
            role="checkbox"
            type="checkbox"
            checked={regionVisibility[region]}
            onChange={handleCheck}
            id={region}
          />
        </div>
      ))}
      {children}
    </form>
  )
}

export default CityFilter
