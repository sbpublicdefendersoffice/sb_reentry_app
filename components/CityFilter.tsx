import {
  useState,
  useEffect,
  ChangeEvent,
  Dispatch,
  SetStateAction,
} from 'react'

import { citiesByCountyRegion, ENGLISH } from '../constants'
import { CopyHolder, LocationRecord } from '../types'
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
      const regionIsVisible = (region: VisibilityAsArray): boolean => {
        const isRegionVisible: boolean = region[1]
        return isRegionVisible
      }

      if (visibilityEntries.every(regionIsVisible))
        setLatLongInfo(originalLocInfo)
      else {
        const citiesToRemove: string[] = visibilityEntries.reduce(
          (
            arrOfCities: string[],
            currentEntry: VisibilityAsArray,
          ): string[] => {
            const [region, visible] = currentEntry

            if (!visible)
              arrOfCities = [...arrOfCities, ...citiesByCountyRegion[region]]
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
      {Object.keys(isRegionVisible).map((region: string) => (
        <div key={region} className={styles.CheckboxHolder}>
          <label className={styles.Label} htmlFor={region}>
            {activeCopy[region]}
          </label>
          <input
            type="checkbox"
            checked={isRegionVisible[region]}
            onChange={handleCheck}
            id={region}
          />
        </div>
      ))}
    </form>
  )
}

export default CityFilter
