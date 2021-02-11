import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'

import { SortedRecord } from '../types/records'
import { fetchSingleOrgRecord } from '../services/GET'

const useSingleRecord = () => {
  const [
    singleFetchedRecord,
    setSingleFetchedRecord,
  ] = useState<SortedRecord | null>(null)

  const { asPath } = useRouter()

  const requestParams: string[] = asPath.slice(1).split('/')
  const requestReady: number = requestParams.length
  const category: string = requestParams[0]
  const id: string = requestParams[1]

  useEffect(() => {
    if (requestReady && id !== '[id]')
      fetchSingleOrgRecord(category, id, setSingleFetchedRecord)
  }, [requestReady, id])

  return { singleFetchedRecord }
}

export default useSingleRecord
