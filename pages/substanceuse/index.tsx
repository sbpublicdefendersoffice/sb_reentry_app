import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Head from 'next/head'

import { Search } from '../../components'
import { Button, RecordListing } from '../../ui'

import { TranslatedRecordResponse } from '../../types/records'
import { fetchRecordsByCategory } from '../../services/GET'

const substanceUse = 'Substance Use'

const SubstanceUse = () => {
  const [
    fetchedRecords,
    setFetchedRecords,
  ] = useState<TranslatedRecordResponse | null>(null)

  useEffect((): void => {
    fetchRecordsByCategory(substanceUse.toLowerCase(), setFetchedRecords)
  }, [])

  const { back, push } = useRouter()

  return (
    <>
      <Head>
        <title>{substanceUse}</title>
      </Head>
      <h2>{substanceUse}</h2>
      <Button block onClick={back}>
        Back
      </Button>
      {fetchedRecords && (
        <Search
          originalRecords={fetchedRecords.records}
          setRecords={setFetchedRecords}
        />
      )}
      {Boolean(fetchedRecords?.records?.length) && (
        <>
          {fetchedRecords?.records?.map(record => (
            <RecordListing
              key={record.id}
              title={record.id}
              interactive
              onClick={e =>
                // @ts-ignore
                push('/substanceuse/[id]', `/substanceuse/${e.target.title}`)
              }
            >
              {record.fields.org_name}
            </RecordListing>
          ))}
        </>
      )}
      {fetchedRecords?.offset && (
        <Button
          onClick={() =>
            fetchRecordsByCategory(
              substanceUse.toLowerCase(),
              setFetchedRecords,
              fetchedRecords?.offset,
            )
          }
        >
          Fetch More Records
        </Button>
      )}
      {/* TODO: Have to fix teh back button refetching problem somehow, perhaps have these records in a global context to never have to fetch more than once? */}
    </>
  )
}

export default SubstanceUse
