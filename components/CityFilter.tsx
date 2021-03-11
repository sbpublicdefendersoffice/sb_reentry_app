import { ChangeEvent, useState } from 'react'

import Checkbox from '../ui/Checkbox'

import styles from './CityFilter.module.css'

interface CountyVisibilityFilter {
  southCounty: boolean
  centralCounty: boolean
  northCounty: boolean
}

const checkedState: CountyVisibilityFilter = {
  southCounty: true,
  centralCounty: true,
  northCounty: true,
}

// TODO: pass down state and set up holding original state and filtering pattern, style checkbox ui component

const CityFilter = () => {
  const [
    isRegionVisible,
    setIsRegionVisible,
  ] = useState<CountyVisibilityFilter>(checkedState)

  const handleCheck = (e: ChangeEvent<HTMLInputElement>): void =>
    setIsRegionVisible({
      ...isRegionVisible,
      [e.target.id]: !isRegionVisible[e.target.id],
    })

  return (
    <form className={styles.CityFilter}>
      <div className={styles.CheckboxHolder}>
        <label className={styles.Label} htmlFor="southCounty">
          South County
        </label>
        <Checkbox
          checked={isRegionVisible.southCounty}
          onChange={handleCheck}
          id="southCounty"
        />
      </div>
      <div className={styles.CheckboxHolder}>
        <label className={styles.Label} htmlFor="centralCounty">
          Central County
        </label>
        <Checkbox
          checked={isRegionVisible.centralCounty}
          onChange={handleCheck}
          id="centralCounty"
        />
      </div>
      <div className={styles.CheckboxHolder}>
        <label className={styles.Label} htmlFor="northCounty">
          North County
        </label>
        <Checkbox
          checked={isRegionVisible.northCounty}
          onChange={handleCheck}
          id="northCounty"
        />
      </div>
    </form>
  )
}

export default CityFilter
