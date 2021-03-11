import {
  useState,
  useEffect,
  ChangeEvent,
  Dispatch,
  SetStateAction,
} from 'react'

import Checkbox from '../ui/Checkbox'
import { citiesByCountyRegion } from '../constants/maps'
import { CopyHolder, ENGLISH } from '../types/language'
import { LocationRecord } from '../types/records'
import useLanguage from '../hooks/useLanguage'

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

type VisibilityAsArray = [string, boolean]

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

const CityFilter = ({ latLongInfo, setLatLongInfo }: CityFilterProps) => {
  const { language } = useLanguage()
  const activeCopy = copy[language]

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

      const visibilityEntries: VisibilityAsArray[] = Object.entries(
        newVisibilityState,
      )
      const regionIsVisible = (region: VisibilityAsArray): boolean => region[1]

      if (visibilityEntries.every(regionIsVisible))
        setLatLongInfo(originalLocInfo)
      else {
        const citiesToRemove: string[] = visibilityEntries.reduce(
          (
            arrOfCities: string[],
            currentEntry: VisibilityAsArray,
          ): string[] => {
            if (!currentEntry[1])
              arrOfCities = [
                ...arrOfCities,
                ...citiesByCountyRegion[currentEntry[0]],
              ]
            return arrOfCities
          },
          [],
        )
        const filteredCities: LocationRecord[] = originalLocInfo.filter(
          (record: LocationRecord) => !citiesToRemove.includes(record.city),
        )

        setLatLongInfo(filteredCities)
      }
    }
  }

  return (
    <form
      className={styles.CityFilter}
      style={{ width: `${language === ENGLISH ? 7.25 : 8.5}rem` }}
    >
      <div className={styles.CheckboxHolder}>
        <label className={styles.Label} htmlFor="southCounty">
          {activeCopy.southCounty}
        </label>
        <Checkbox
          checked={isRegionVisible.southCounty}
          onChange={handleCheck}
          id="southCounty"
        />
      </div>
      <div className={styles.CheckboxHolder}>
        <label className={styles.Label} htmlFor="centralCounty">
          {activeCopy.centralCounty}
        </label>
        <Checkbox
          checked={isRegionVisible.centralCounty}
          onChange={handleCheck}
          id="centralCounty"
        />
      </div>
      <div className={styles.CheckboxHolder}>
        <label className={styles.Label} htmlFor="northCounty">
          {activeCopy.northCounty}
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
