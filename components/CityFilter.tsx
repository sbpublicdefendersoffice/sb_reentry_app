import {
  useState,
  useEffect,
  ChangeEvent,
  Dispatch,
  SetStateAction,
} from 'react'

import Checkbox from '../ui/Checkbox'
import { citiesByCountyRegion } from '../constants/maps'
import { LocationRecord } from '../types/records'

import styles from './CityFilter.module.css'

interface CityFilterProps {
  latLongInfo: LocationRecord[]
  setLatLongInfo: Dispatch<SetStateAction<LocationRecord[]>>
}

interface CountyVisibilityFilter {
  southCounty: boolean
  centralCounty: boolean
  northCounty: boolean
}

const CityFilter = ({ latLongInfo, setLatLongInfo }: CityFilterProps) => {
  const [
    isRegionVisible,
    setIsRegionVisible,
  ] = useState<CountyVisibilityFilter>({
    southCounty: true,
    centralCounty: true,
    northCounty: true,
  })

  const [originalLocInfo, setOriginalLocInfo] = useState<
    LocationRecord[] | null
  >(null)

  useEffect((): void => {
    if (latLongInfo) setOriginalLocInfo(latLongInfo)
  }, [])

  const handleCheck = (e: ChangeEvent<HTMLInputElement>): void => {
    if (originalLocInfo) {
      const newVisibilityState: CountyVisibilityFilter = {
        ...isRegionVisible,
        [e.target.id]: !isRegionVisible[e.target.id],
      }

      setIsRegionVisible(newVisibilityState)

      const visibilityEntries: [string, boolean][] = Object.entries(
        newVisibilityState,
      )
      const regionIsVisible = (region: [string, boolean]): boolean => region[1]

      if (visibilityEntries.every(regionIsVisible))
        setLatLongInfo(originalLocInfo)
      else {
        const citiesToRemove: string[] = visibilityEntries.reduce(
          (arrOfCities: string[], currentEntry) => {
            if (!currentEntry[1])
              arrOfCities = [
                ...arrOfCities,
                ...citiesByCountyRegion[currentEntry[0]],
              ]
            return arrOfCities
          },
          [],
        )
        const filteredCities = originalLocInfo.filter(
          record => !citiesToRemove.includes(record.city),
        )
        setLatLongInfo(filteredCities)
      }
    }
  }

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
