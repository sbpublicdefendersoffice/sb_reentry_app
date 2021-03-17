import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'

import { POST } from '../helpers/validators'
import { SortedRecord } from '../types/records'
import useLanguage from '../hooks/useLanguage'

const useSingleRecord = () => {
  const { asPath } = useRouter()
  const { language } = useLanguage()

  const [sortedRecord, setSortedRecord] = useState<SortedRecord | null>(null)

  const requestParams: string[] = asPath.slice(1).split('/')
  const isRequestReady: boolean = Boolean(requestParams.length)
  const category: string = requestParams[0]
  const id: string = requestParams[1]

  useEffect(() => {
    const airtableApiRouteFetch = async () => {
      if (isRequestReady && id !== '[id]' && language) {
        const apiRequest = await fetch('/api/singleairtablerecord', {
          method: POST,
          body: JSON.stringify({ id, category, language }),
        })

        const apiResponse = await apiRequest.json()

        setSortedRecord(apiResponse)
      }
    }
    airtableApiRouteFetch()
  }, [isRequestReady, id, language])

  return { sortedRecord }
}

export default useSingleRecord
