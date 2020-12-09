import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'

import { OrgRecord } from '../../types/records'

import { fetchSingleOrgRecord } from '../../services/GET'

const IdPage = () => {
  const [
    singleFetchedRecord,
    setSingleFetchedRecord,
  ] = useState<OrgRecord | null>(null)
  const { query } = useRouter()

  useEffect(() => {
    fetchSingleOrgRecord(String(query?.id), setSingleFetchedRecord)
  }, [query])

  return (
    <>
      {singleFetchedRecord &&
        Object.entries(singleFetchedRecord.fields).map(([key, value]) => (
          <p key={key}>
            {key}: {value.toString()}
          </p>
        ))}
    </>
  )
}

export default IdPage
