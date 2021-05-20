import { Fragment } from 'react'
import { LeafLoader, OrgRecordCard } from './'
import { Details } from '../ui'
import { TranslatedRecordResponse, OrgRecord } from '../types/records'
import { ENGLISH } from '../constants/language'
import styles from './RecordPane.module.css'
import useLanguage from '../hooks/useLanguage'
export interface TagPaneProps {
  orgInfo: TranslatedRecordResponse
}
const TagPane = ({ orgInfo }: TagPaneProps) => {
  const { language } = useLanguage()
  if (!orgInfo) return <LeafLoader />
  const recordsReady: boolean = Boolean(orgInfo?.records?.length)
  return (
    <div className={styles.RecordPane} role="menu">
      <Details
        role="list"
        open
        className={styles.details}
        summary={` ${language === ENGLISH ? 'Records' : 'Registros'}`}
      >
        {recordsReady &&
          orgInfo.records.map((record: OrgRecord, i: number) => (
            <Fragment key={i}>
              <OrgRecordCard record={record} />
            </Fragment>
          ))}
      </Details>
    </div>
  )
}
export default TagPane
