import { useState, useEffect } from 'react'

import useLanguage from './useLanguage'

import { POST } from '../helpers/validators'
import { TranslatedRecordResponse } from '../types/records'

const useMultipleListRecords = (category: string) => {
  const { language } = useLanguage()

  const [
    fetchedRecords,
    setFetchedRecords,
  ] = useState<TranslatedRecordResponse | null>(null)

  useEffect(() => {
    const airtableApiRouteFetch = async () => {
      if (category && language) {
        const apiRequest = await fetch('/api/airtablerecordsbycategory', {
          method: POST,
          body: JSON.stringify({ category, language }),
        })

        const apiResponse: TranslatedRecordResponse = await apiRequest.json()

        setFetchedRecords(apiResponse)
      }
    }
    airtableApiRouteFetch()
  }, [category, language])

  return { fetchedRecords, setFetchedRecords }
}

export default useMultipleListRecords
