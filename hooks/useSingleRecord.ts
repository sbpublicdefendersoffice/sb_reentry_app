import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'

import { SortedRecord } from '../types/records'
import { fetchSingleOrgRecord } from '../services/GET'

const useSingleRecord = () => {
  const [
    singleFetchedRecord,
    setSingleFetchedRecord,
  ] = useState<SortedRecord | null>(null)

  const { query } = useRouter()
  const { id } = query

  useEffect(() => {
    if (id) fetchSingleOrgRecord(String(id), setSingleFetchedRecord)
  }, [id])

  return { singleFetchedRecord }
}

export default useSingleRecord
