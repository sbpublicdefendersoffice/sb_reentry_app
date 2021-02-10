import Head from 'next/head'
import { useState, useEffect } from 'react'

import { TranslatedRecordResponse } from '../../types/records'
import { fetchRecordsByCategory } from '../../services/GET'

import { RecordPane } from '../../components'

const category: string = 'Resource Directory'

const SubstanceUse = () => {
  const [
    fetchedRecords,
    setFetchedRecords,
  ] = useState<TranslatedRecordResponse | null>(null)

  const lowCategory: string = category.toLowerCase()

  useEffect((): void => {
    fetchRecordsByCategory(lowCategory, setFetchedRecords)
  }, [])

  return (
    <>
      <Head>
        <title>{`Santa Barbara Reentry | ${category}`}</title>
      </Head>
      <RecordPane
        orgInfo={fetchedRecords}
        category={category}
        setRecords={setFetchedRecords}
      />
    </>
  )
}

export default SubstanceUse
