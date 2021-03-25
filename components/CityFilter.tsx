import { ChangeEvent, Dispatch } from 'react'

import { ENGLISH } from '../constants'
import { CopyHolder, FilterMapAction, CountyVisibilityFilter } from '../types'
import useLanguage from '../hooks/useLanguage'

import styles from './CityFilter.module.css'

interface CityFilterProps {
  setLocRecordsToFilter: Dispatch<FilterMapAction>
  regionVisibility: CountyVisibilityFilter
}

const copy: CopyHolder = {
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
  setLocRecordsToFilter,
  regionVisibility,
}: CityFilterProps) => {
  const { language } = useLanguage()
  const activeCopy = copy[language]

  const handleCheck = (e: ChangeEvent<HTMLInputElement>): void =>
    setLocRecordsToFilter({
      filterName: 'regionVisibility',
      value: {
        ...regionVisibility,
        [e.target.id]: !regionVisibility[e.target.id],
      },
    })

  return (
    <form
      className={styles.CityFilter}
      style={{ width: `${language === ENGLISH ? 7.25 : 8.5}rem` }}
    >
      {Object.keys(regionVisibility).map((region: string) => (
        <div key={region} className={styles.CheckboxHolder}>
          <label className={styles.Label} htmlFor={region}>
            {activeCopy[region]}
          </label>
          <input
            type="checkbox"
            checked={regionVisibility[region]}
            onChange={handleCheck}
            id={region}
          />
        </div>
      ))}
    </form>
  )
}

export default CityFilter
