import {
  SetStateAction,
  ChangeEvent,
  Dispatch,
  useState,
  useEffect,
} from 'react'

import { Input } from '../ui'
import Tooltip from './Tooltip'

import { PGOrganizationResponse } from '../types/'
import { searchCopy } from '../constants/copy'

import useLanguage from '../hooks/useLanguage'

export interface FetchedDataSearchProps {
  displayCategory: string
  originalRecords: PGOrganizationResponse[]
  setRecords: Dispatch<SetStateAction<PGOrganizationResponse[]>>
}

import styles from './FetchedDataSearch.module.css'

const FetchedDataSearch = ({
  displayCategory,
  originalRecords,
  setRecords,
}: FetchedDataSearchProps) => {
  const { language } = useLanguage()
  const activeCopy = searchCopy[language]

  const [savedOriginalRecords, setSavedOriginalRecords] = useState<
    PGOrganizationResponse[] | null
  >(null)

  useEffect(() => {
    if (originalRecords) setSavedOriginalRecords(originalRecords)
  }, [])

  const handleChange = ({ target }: ChangeEvent<HTMLInputElement>): void => {
    const { value } = target
    if (savedOriginalRecords) {
      if (value) {
        setRecords(
          savedOriginalRecords.filter(record =>
            record[`tags_${language}`]?.join('').includes(value.toLowerCase()),
          ),
        )
      } else setRecords(savedOriginalRecords)
    }
  }

  return (
    <div role="searchbox" className={styles.FetchedDataSearch}>
      <label className={styles.Label} htmlFor="category-search">
        Search Fetched Data
      </label>
      <Input
        data-testid="FetchedDataSearch"
        type="search"
        id="category-search"
        className={styles.Input}
        onChange={handleChange}
        placeholder={`${activeCopy.search} ${displayCategory}...`}
        role="search"
      />
      <Tooltip>{activeCopy.tooltip}</Tooltip>
    </div>
  )
}

export default FetchedDataSearch
