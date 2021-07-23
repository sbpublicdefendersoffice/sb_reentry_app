import { Fragment, Dispatch, ChangeEvent } from 'react'

import { RADIUS_DISTANCE } from '../constants/maps'
import {
  CopyHolder,
  FilterMapAction,
  SantaBarbaraCountyCoords,
  PGOrgPlusLocation,
} from '../types'
import useLanguage from '../hooks/useLanguage'
import styles from './ProximityFilter.module.css'

export interface ProximityFilterProps {
  coords: SantaBarbaraCountyCoords
  locationsToFilter: PGOrgPlusLocation[]
  setLocRecordsToFilter: Dispatch<FilterMapAction>
  radiusDistance: number
}

export const proximityValues: number[] = [1, 2, 5, 10, 15, 20, 50]

export const copy: CopyHolder = {
  english: {
    located: 'Located within',
    mile: 'mile',
  },
  spanish: {
    located: 'Situado dentro de',
    mile: 'milla',
  },
}

const ProximityFilter = ({
  coords,
  locationsToFilter,
  setLocRecordsToFilter,
  radiusDistance,
}: ProximityFilterProps) => {
  const { language } = useLanguage()

  const activeCopy = copy[language]

  const handleChange = (e: ChangeEvent<HTMLSelectElement>): void => {
    const newRadiusDistance: number = Number(e.target.value)
    setLocRecordsToFilter({
      filterName: RADIUS_DISTANCE,
      value: { newRadiusDistance, coords },
      locationsToFilter,
    })
  }

  return (
    <div role="menu" className={styles.ProximityFilter}>
      <label role="note" className={styles.Label} htmlFor="proximity-select">
        {activeCopy.located}
      </label>
      <select
        role="group"
        value={radiusDistance}
        className={styles.Select}
        id="proximity-select"
        onChange={handleChange}
      >
        <option role="option" value={1000}>
          -----
        </option>
        {proximityValues.map((proxVal: number) => (
          <Fragment key={proxVal}>
            <option role="option" value={proxVal}>
              {proxVal} {activeCopy.mile}
              {proxVal !== 1 && 's'}
            </option>
          </Fragment>
        ))}
      </select>
    </div>
  )
}

export default ProximityFilter
