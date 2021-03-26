import { Fragment, Dispatch, ChangeEvent } from 'react'

import { RADIUS_DISTANCE } from '../constants/maps'
import { CopyHolder, LocationRecord, FilterMapAction } from '../types'
import useLanguage from '../hooks/useLanguage'
import styles from './ProximityFilter.module.css'

interface ProximityFilterProps {
  coords: GeolocationCoordinates
  locationsToFilter: LocationRecord[]
  setLocRecordsToFilter: Dispatch<FilterMapAction>
  radiusDistance: number
}

const proximityValues: number[] = [1, 2, 5, 10, 15, 20, 50]

const copy: CopyHolder = {
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
    <div className={styles.ProximityFilter}>
      <label className={styles.Label} htmlFor="proximity-select">
        {activeCopy.located}
      </label>
      <select
        value={radiusDistance}
        className={styles.Select}
        id="proximity-select"
        onChange={handleChange}
      >
        <option value={1000}>-----</option>
        {proximityValues.map((proxVal: number) => (
          <Fragment key={proxVal}>
            <option value={proxVal}>
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
