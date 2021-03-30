import { SetStateAction, Dispatch, Fragment } from 'react'
import { useRouter } from 'next/router'

import { FetchedDataSearch, LeafLoader, OrgRecordCard } from './'
import { Details, Paragraph } from '../ui'
import useLanguage from '../hooks/useLanguage'

import { TranslatedRecordResponse, OrgRecord } from '../types/records'
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
  const categoryTitle: string = lowCategory.replace(' ', '')
  const url: string = `/${categoryTitle}`

  const pushToCategory = () => {
    if (url !== route) push(url, url)
  }

  if (!orgInfo) return <LeafLoader />

  const recordsReady: boolean = Boolean(orgInfo?.records?.length)

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
        {recordsReady &&
          orgInfo.records.map((record: OrgRecord, i: number) => (
            <Fragment key={i}>
              <OrgRecordCard
                record={record}
                category={categoryTitle}
                url={url}
              />
            </Fragment>
          ))}
      </Details>
    </div>
  )
}

export default RecordPane
