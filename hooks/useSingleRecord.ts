import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'

import { POST } from '../helpers/validators'
import { PGOrganizationResponse } from '../types'
import useLanguage from '../hooks/useLanguage'

const useSingleRecord = () => {
  const { asPath } = useRouter()
  const { language } = useLanguage()

  const [sortedRecord, setSortedRecord] =
    useState<PGOrganizationResponse | null>(null)

  const requestParams: string[] = asPath.slice(1).split('/')
  const isRequestReady: boolean = Boolean(requestParams.length)
  const category: string = requestParams[0]
  const id: string = requestParams[1]

  useEffect(() => {
    const singleRecordFetch = async () => {
      if (isRequestReady && id !== '[id]' && language) {
        const apiRequest = await fetch('/api/getSingleRecord', {
          method: POST,
          body: JSON.stringify({ id, language }),
        })

        const apiResponse: PGOrganizationResponse = await apiRequest.json()
        apiResponse.single_category = category

        setSortedRecord(apiResponse)
      }
    }
    singleRecordFetch()
  }, [isRequestReady, id, language])

  return { sortedRecord }
}

export default useSingleRecord
