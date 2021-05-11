import {
  SetStateAction,
  ChangeEvent,
  Dispatch,
  useState,
  useEffect,
} from 'react'

import { Input } from '../ui'
import Tooltip from './Tooltip'

import { OrgRecord, TranslatedRecordResponse } from '../types/records'
import { searchCopy } from '../constants/copy'

import useLanguage from '../hooks/useLanguage'

export interface FetchedDataSearchProps {
  displayCategory: string
  originalRecords: OrgRecord[]
  setRecords: Dispatch<SetStateAction<TranslatedRecordResponse>>
}

import styles from './FetchedDataSearch.module.css'

const FetchedDataSearch = ({
  displayCategory,
  originalRecords,
  setRecords,
}: FetchedDataSearchProps) => {
  const { language } = useLanguage()
  const activeCopy = searchCopy[language]

  const [savedOriginalRecords, setSavedOriginalRecords] =
    useState<OrgRecord[] | null>(null)

  useEffect(() => {
    if (originalRecords) setSavedOriginalRecords(originalRecords)
  }, [])

  const handleChange = ({ target }: ChangeEvent<HTMLInputElement>): void => {
    const { value } = target
    if (savedOriginalRecords) {
      if (value) {
        setRecords(previousState => ({
          ...previousState,
          records: savedOriginalRecords.filter(record =>
            record.fields?.org_tags?.join('').includes(value.toLowerCase()),
          ),
        }))
      } else
        setRecords(previousState => ({
          ...previousState,
          records: savedOriginalRecords,
        }))
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
