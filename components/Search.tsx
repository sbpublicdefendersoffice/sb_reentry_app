import {
  SetStateAction,
  ChangeEvent,
  Dispatch,
  useState,
  useEffect,
} from 'react'

import { Input } from '../ui'
import { OrgRecord, TranslatedRecordResponse } from '../types/records'

interface SearchProps {
  originalRecords: OrgRecord[]
  setRecords: Dispatch<SetStateAction<TranslatedRecordResponse>>
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

  return <Input onChange={handleChange} placeholder="Search..." />
}

export default Search
