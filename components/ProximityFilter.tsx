import {
  Fragment,
  Dispatch,
  SetStateAction,
  ChangeEvent,
  useState,
  useEffect,
} from 'react'

import { CopyHolder, LocationRecord } from '../types'
import { useLanguage, useLocation } from '../hooks'
import { isDistanceInBounds } from '../helpers/location'
import styles from './ProximityFilter.module.css'

interface ProximityFilterProps {
  locInfoToCalculateDistance: LocationRecord[]
  setLatLongInfo: Dispatch<SetStateAction<LocationRecord[]>>
}

const proximityValues: number[] = [1, 2, 5, 10, 20]

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
  locInfoToCalculateDistance,
  setLatLongInfo,
}: ProximityFilterProps) => {
  const { language } = useLanguage()
  const { coords } = useLocation()

  const [originalLocInfo, setOriginalLocInfo] = useState<
    LocationRecord[] | null
  >(null)

  useEffect((): void => {
    if (locInfoToCalculateDistance)
      setOriginalLocInfo(locInfoToCalculateDistance)
  }, [])

  const activeCopy = copy[language]

  const handleChange = (e: ChangeEvent<HTMLSelectElement>): void => {
    const { value } = e.target
    if (value)
      setLatLongInfo((locRecords: LocationRecord[]) =>
        locRecords.filter((record: LocationRecord) =>
          isDistanceInBounds(
            [coords.latitude, coords.longitude],
            [record.latitude, record.longitude],
            parseInt(value),
          ),
        ),
      )
    else setLatLongInfo(originalLocInfo)
  }

  return (
    originalLocInfo && (
      <div className={styles.ProximityFilter}>
        <label className={styles.Label} htmlFor="proximity-select">
          {activeCopy.located}
        </label>
        <select id="proximity-select" onChange={handleChange}>
          <option value={''}>-----</option>
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
  )
}

export default ProximityFilter
