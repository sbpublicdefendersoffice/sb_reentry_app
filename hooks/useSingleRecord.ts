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

  useEffect(() => {
    if (requestReady)
      fetchSingleOrgRecord(
        requestParams[0],
        requestParams[1],
        setSingleFetchedRecord,
      )
  }, [requestReady])

  return { singleFetchedRecord }
}

export default useSingleRecord
