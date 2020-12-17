import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'

import { Search } from '../components'
import { Button, RecordListing } from '../ui'

import { TranslatedRecordResponse } from '../types/records'
import { fetchRecordsByCategory } from '../services/GET'

import styles from './RecordPane.module.css'

interface RecordPaneProps {
  category: string
}

const RecordPane = ({ category }: RecordPaneProps) => {
  const [
    fetchedRecords,
    setFetchedRecords,
  ] = useState<TranslatedRecordResponse | null>(null)

  useEffect((): void => {
    fetchRecordsByCategory(category.toLowerCase(), setFetchedRecords)
  }, [])

  const url: string = category.toLowerCase().replace(' ', '')

  const { back, push } = useRouter()
  return (
    <div className={styles.RecordPane}>
      <h2>{category}</h2>
      <Button block onClick={back}>
        Back
      </Button>

      {fetchedRecords && (
        <Search
          originalRecords={fetchedRecords.records}
          setRecords={setFetchedRecords}
        />
      )}
      {fetchedRecords?.offset && (
        <Button
          onClick={() =>
            fetchRecordsByCategory(
              category.toLowerCase(),
              setFetchedRecords,
              fetchedRecords?.offset,
            )
          }
        >
          Fetch More Records
        </Button>
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
                push(`/${url}/[id]`, `/${url}/${e.target.title}`, {
                  shallow: true,
                })
              }
            >
              {record.fields.org_name}
            </RecordListing>
          ))}
        </>
      )}
    </div>
  )
}

export default RecordPane
