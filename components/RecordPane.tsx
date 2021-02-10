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

  const lowCategory: string = category.toLowerCase()

  useEffect((): void => {
    fetchRecordsByCategory(lowCategory, setFetchedRecords)
  }, [])

  const url: string = lowCategory.replace(' ', '')

  const { push } = useRouter()

  return (
    <div className={`${styles.RecordPane} ${styles.infoPage}`} role="list">
      <h2>{category}</h2>
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
              lowCategory,
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
                push(`/${url}/[id]`, `/${url}/${e.target.title}`)
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
