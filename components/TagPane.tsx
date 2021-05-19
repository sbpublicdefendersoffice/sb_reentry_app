import { SetStateAction, Dispatch, Fragment } from 'react'
import { useRouter } from 'next/router'

import { FetchedDataSearch, LeafLoader, TagRecordCard } from './'
import { Details, Paragraph } from '../ui'

import { TranslatedRecordResponse, OrgRecord } from '../types/records'
import { ENGLISH } from '../constants/language'
import { useGlobalSearch, useLanguage } from '../hooks'
import styles from './RecordPane.module.css'

export interface TagPaneProps {
  orgInfo?: TranslatedRecordResponse
  setRecords?: Dispatch<SetStateAction<TranslatedRecordResponse>>
}

const TagPane = ({ orgInfo, setRecords }: TagPaneProps) => {
  const { push, route } = useRouter()
  const { language } = useLanguage()
  const { searchResults, setSearchResults } = useGlobalSearch()

  const url: string = `/search?query=${searchResults}`

  const pushToCategory = () => {
    if (url !== route) push(url, url)
  }

  if (!orgInfo) return <LeafLoader />

  const recordsReady: boolean = Boolean(orgInfo?.records?.length)

  return (
    <div className={styles.RecordPane} role="menu">
      {recordsReady &&
        orgInfo.records.map((record: OrgRecord, i: number) => (
          <Fragment key={i}>
            <TagRecordCard record={record} url={url} />
          </Fragment>
        ))}
    </div>
  )
}

export default TagPane
