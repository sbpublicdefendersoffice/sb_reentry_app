import { useState, useEffect } from 'react'

import useLanguage from './useLanguage'

import { POST } from '../helpers/validators'
import { TranslatedRecordResponse, OrgRecord } from '../types/records'
import { SPANISH } from '../types/language'

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
    const airtableApiRouteFetch = async () => {
      if (category && language) {
        const apiRequest = await fetch('/api/multipleairtablerecords', {
          method: POST,
          body: JSON.stringify({ category, language }),
        })

        const apiResponse = await apiRequest.json()

        setUnsortedRecords(apiResponse)
      }
    }
    airtableApiRouteFetch()
  }, [category, language])

  useEffect(() => {
    if (unsortedRecords) {
      const tempRecords = unsortedRecords

      //TODO: fix below temp hack for spanish language records
      if (language === SPANISH) {
        tempRecords.records.map((record: OrgRecord) => {
          record.fields.org_name = record.fields.org_name_spanish
          record.fields.org_tags = record.fields.org_tags_spanish

          return record
        })
      }

      //@ts-ignore
      tempRecords.records.sort(sortByName)
      tempRecords.category = category.replaceAll(' ', '')

      setFetchedRecords(tempRecords)
    }
  }, [unsortedRecords])

  return { fetchedRecords, setFetchedRecords }
}

export default useMultipleListRecords
