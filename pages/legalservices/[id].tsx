import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Head from 'next/head'

import { OrgRecordDisplay, RecordPane } from '../../components'
import { SortedRecord } from '../../types/records'
import { fetchSingleOrgRecord } from '../../services/GET'

const substanceUse: string = 'Substance Use'

const IdPage = () => {
  const [
    singleFetchedRecord,
    setSingleFetchedRecord,
  ] = useState<SortedRecord | null>(null)
  const { query } = useRouter()
  const { id } = query

  useEffect(() => {
    if (id) fetchSingleOrgRecord(String(id), setSingleFetchedRecord)
  }, [id])

  return (
    <>
      {singleFetchedRecord && (
        <>
          <Head>
            <title>{`Santa Barbara Reentry | ${singleFetchedRecord.name}`}</title>
          </Head>
          <RecordPane category={substanceUse} />
          <OrgRecordDisplay singleFetchedRecord={singleFetchedRecord} />
        </>
      )}
    </>
  )
}

export default IdPage
