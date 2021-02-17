import { useState, useEffect } from 'react'

import { fetchRecordsByCategory } from '../services/GET'
import useLanguage from './useLanguage'

import { TranslatedRecordResponse, OrgRecord } from '../types/records'

const sortByName = (a: OrgRecord, b: OrgRecord): number =>
  a.fields.org_name?.localeCompare(b.fields.org_name)

const useMultipleListRecords = (category: string) => {
  const [
    fetchedRecords,
    setFetchedRecords,
  ] = useState<TranslatedRecordResponse | null>(null)

  const { language } = useLanguage()

  useEffect(() => {
    if (category && language) {
      fetchRecordsByCategory(category, setFetchedRecords, language)
    }
  }, [category, language])

  useEffect(() => {
    if (fetchedRecords) {
      const tempRecords = fetchedRecords

      //@ts-ignore
      tempRecords.records.sort(sortByName)
      tempRecords.category = category.replaceAll(' ', '')

      setFetchedRecords(tempRecords)

      if (language === 'spanish') {
        console.log(fetchedRecords)
      }
    }
  }, [fetchedRecords])

  return { fetchedRecords, setFetchedRecords }
}

export default useMultipleListRecords
