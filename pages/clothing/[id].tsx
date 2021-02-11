import Head from 'next/head'
import { useState, useEffect } from 'react'

import useSingleRecord from '../../hooks/useSingleRecord'
import { TranslatedRecordResponse } from '../../types/records'
import { fetchRecordsByCategory } from '../../services/GET'

import { OrgRecordDisplay, RecordPane } from '../../components'

const category: string = 'Clothing'

const IdPage = () => {
  const [
    fetchedRecords,
    setFetchedRecords,
  ] = useState<TranslatedRecordResponse | null>(null)

  const lowCategory: string = category.toLowerCase()

  useEffect((): void => {
    fetchRecordsByCategory(lowCategory, setFetchedRecords)
  }, [])

  const { singleFetchedRecord } = useSingleRecord()

  return (
    <>
      {singleFetchedRecord && (
        <>
          <Head>
            <title>{`Santa Barbara Reentry | ${singleFetchedRecord.name}`}</title>
          </Head>
          <RecordPane
            orgInfo={fetchedRecords}
            category={category}
            setRecords={setFetchedRecords}
          />
          <OrgRecordDisplay singleFetchedRecord={singleFetchedRecord} />
        </>
      )}
    </>
  )
}

export default IdPage
