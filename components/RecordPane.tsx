import { SetStateAction, Dispatch } from 'react'
import { useRouter } from 'next/router'

import { Search } from '../components'
import { RecordListing } from '../ui'

import { TranslatedRecordResponse } from '../types/records'

import styles from './RecordPane.module.css'

interface RecordPaneProps {
  category: string
  orgInfo: TranslatedRecordResponse
  setRecords: Dispatch<SetStateAction<TranslatedRecordResponse>>
}

const RecordPane = ({ category, orgInfo, setRecords }: RecordPaneProps) => {
  const { push, route } = useRouter()

  const lowCategory: string = category.toLowerCase()
  const url: string = `/${lowCategory.replace(' ', '')}`

  const pushToCategory = () => {
    if (url !== route) push(url, url)
  }

  return (
    <div className={styles.RecordPane} role="list">
      <h2 className={styles.title} onClick={pushToCategory}>
        {category}
      </h2>
      {orgInfo && (
        <Search originalRecords={orgInfo.records} setRecords={setRecords} />
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
                push(`${url}/[id]`, `${url}/${e.target.title}`)
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
