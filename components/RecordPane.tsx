import { SetStateAction, Dispatch } from 'react'
import { useRouter } from 'next/router'

import { Search } from '../components'
import { Button, RecordListing } from '../ui'

import { TranslatedRecordResponse } from '../types/records'
import { fetchRecordsByCategory } from '../services/GET'

import styles from './RecordPane.module.css'

interface RecordPaneProps {
  category: string
  orgInfo: TranslatedRecordResponse
  setRecords: Dispatch<SetStateAction<TranslatedRecordResponse>>
}

const RecordPane = ({ category, orgInfo, setRecords }: RecordPaneProps) => {
  const lowCategory: string = category.toLowerCase()

  const url: string = lowCategory.replace(' ', '')

  const { push } = useRouter()

  return (
    <div className={`${styles.RecordPane} ${styles.infoPage}`} role="list">
      <h2>{category}</h2>
      {orgInfo && (
        <Search originalRecords={orgInfo.records} setRecords={setRecords} />
      )}
      {orgInfo?.offset && (
        <Button
          onClick={() =>
            fetchRecordsByCategory(lowCategory, setRecords, orgInfo?.offset)
          }
        >
          Fetch More Records
        </Button>
      )}
      {Boolean(orgInfo?.records?.length) && (
        <>
          {orgInfo?.records?.map(record => (
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
