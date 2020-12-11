import {
  SetStateAction,
  ChangeEvent,
  Dispatch,
  useState,
  useEffect,
} from 'react'
import { OrgRecord } from '../types/records'

import styles from './Search.module.css'

interface SearchProps {
  originalRecords: OrgRecord[]
  setRecords: Dispatch<SetStateAction<OrgRecord[]>>
}

const Search = ({ originalRecords, setRecords }: SearchProps) => {
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
        setRecords(
          savedOriginalRecords.filter(record =>
            record.fields?.org_tags?.join('').includes(value.toLowerCase()),
          ),
        )
      } else setRecords(savedOriginalRecords)
    }
  }

  return (
    <input
      className={styles.Search}
      onChange={handleChange}
      placeholder="Search..."
    />
  )
}

export default Search
