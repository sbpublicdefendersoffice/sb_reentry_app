import { SetStateAction, Dispatch } from 'react'
import { useRouter } from 'next/router'

import { FetchedDataSearch, LeafLoader } from '../components'
import { Card, Details, Paragraph } from '../ui'
import useLanguage from '../hooks/useLanguage'

import { TranslatedRecordResponse } from '../types/records'
import { ENGLISH } from '../constants/language'

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
  const { language } = useLanguage()

  const lowCategory: string = routeCategory.toLowerCase()
  const url: string = `/${lowCategory.replace(' ', '')}`

  const pushToCategory = () => {
    if (url !== route) push(url, url)
  }

  if (!orgInfo) return <LeafLoader />

  return (
    <div className={styles.RecordPane} role="list">
      <Paragraph
        size="heading-text"
        className={styles.title}
        onClick={pushToCategory}
      >
        {displayCategory}
      </Paragraph>
      {orgInfo && (
        <FetchedDataSearch
          displayCategory={displayCategory}
          originalRecords={orgInfo.records}
          setRecords={setRecords}
        />
      )}
      <Details
        open
        className={styles.details}
        summary={`${displayCategory} ${
          language === ENGLISH ? 'Records' : 'Registros'
        }`}
      >
        {Boolean(orgInfo?.records?.length) && (
          <>
            {orgInfo?.records?.map(record => (
              <Card
                key={record.id}
                title={record.id}
                interactive
                onClick={e =>
                  // @ts-ignore
                  push('/[category]/[id]', `${url}/${e.target.title}`)
                }
              >
                <Paragraph
                  title={record.id}
                  size="med-text"
                  onClick={e =>
                    // @ts-ignore
                    push('/[category]/[id]', `${url}/${e.target.title}`)
                  }
                >
                  {record.fields.org_name}
                </Paragraph>
              </Card>
            ))}
          </>
        )}
      </Details>
    </div>
  )
}

export default RecordPane
