import { SetStateAction, Dispatch } from 'react'
import { useRouter } from 'next/router'

import { Search } from '../components'
import { RecordListing, Details } from '../ui'

import { TranslatedRecordResponse } from '../types/records'

import styles from './RecordPane.module.css'

interface RecordPaneProps {
  displayCategory: string
  routeCategory: string
  orgInfo: TranslatedRecordResponse
  setRecords: Dispatch<SetStateAction<TranslatedRecordResponse>>
}

const RecordPane = ({
  displayCategory,
  routeCategory,
  orgInfo,
  setRecords,
}: RecordPaneProps) => {
  const { push, route } = useRouter()

  const lowCategory: string = routeCategory.toLowerCase()
  const url: string = `/${lowCategory.replace(' ', '')}`

  const pushToCategory = () => {
    if (url !== route) push(url, url)
  }

  return (
    <div className={styles.RecordPane} role="list">
      <h2 className={styles.title} onClick={pushToCategory}>
        {displayCategory}
      </h2>
      {orgInfo && (
        <Search originalRecords={orgInfo.records} setRecords={setRecords} />
      )}
      <Details
        className={styles.details}
        open
        summary={`${displayCategory} Records`}
      >
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
      </Details>
    </div>
  )
}

export default RecordPane
