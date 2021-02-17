import { useState, useEffect } from 'react'

import { fetchRecordsByCategory } from '../services/GET'
import useLanguage from './useLanguage'

import { TranslatedRecordResponse, OrgRecord } from '../types/records'

const sortByName = (a: OrgRecord, b: OrgRecord): number =>
  a.fields.org_name?.localeCompare(b.fields.org_name)

const useMultipleListRecords = (category: string) => {
  const [
    unsortedRecords,
    setUnsortedRecords,
  ] = useState<TranslatedRecordResponse | null>(null)

  const [
    fetchedRecords,
    setFetchedRecords,
  ] = useState<TranslatedRecordResponse | null>(null)

  const { language } = useLanguage()

  useEffect(() => {
    if (category && language) {
      fetchRecordsByCategory(category, setUnsortedRecords, language)
    }
  }, [category, language])

  useEffect(() => {
    if (unsortedRecords) {
      const tempRecords = unsortedRecords

      //@ts-ignore
      tempRecords.records.sort(sortByName)
      tempRecords.category = category.replaceAll(' ', '')

      //TODO: fix below temp hack for spanish language records
      if (language === 'spanish') {
        tempRecords.records.map((record: OrgRecord) => {
          record.fields.org_name = record.fields.org_name_spanish
          record.fields.org_tags = record.fields.org_tags_spanish

          return record
        })
      }

      setFetchedRecords(tempRecords)
    }
  }, [unsortedRecords])

  return { fetchedRecords, setFetchedRecords }
}

export default useMultipleListRecords
