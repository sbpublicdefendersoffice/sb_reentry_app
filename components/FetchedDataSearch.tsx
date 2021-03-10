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

interface FetchedDataSearchProps {
  originalRecords: OrgRecord[]
  setRecords: Dispatch<SetStateAction<TranslatedRecordResponse>>
}

import styles from './FetchedDataSearch.module.css'

const FetchedDataSearch = ({
  originalRecords,
  setRecords,
}: FetchedDataSearchProps) => {
  const { language } = useLanguage()
  const activeCopy = searchCopy[language]

  const [savedOriginalRecords, setSavedOriginalRecords] = useState<
    OrgRecord[] | null
  >(null)

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
    <div className={styles.FetchedDataSearch}>
      <Tooltip>{activeCopy.tooltip}</Tooltip>
      <label className={styles.Label} htmlFor="category-search">
        Send Text
      </label>
      <Input
        type="search"
        id="category-search"
        className={styles.Input}
        onChange={handleChange}
        placeholder={activeCopy.search}
        role="search"
      />
    </div>
  )
}

export default FetchedDataSearch
