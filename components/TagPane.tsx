import { Fragment } from 'react'
import { LeafLoader, OrgRecordCard } from './'
import { Details } from '../ui'
import { PGResponse } from '../types/postgresRecords'
import { ENGLISH } from '../constants/language'
import styles from './RecordPane.module.css'
import useLanguage from '../hooks/useLanguage'
export interface TagPaneProps {
  orgInfo: PGResponse[]
}
const TagPane = ({ orgInfo }: TagPaneProps) => {
  const { language } = useLanguage()
  if (!orgInfo) return <LeafLoader />
  const recordsReady: boolean = Boolean(orgInfo?.length)
  return (
    <div className={styles.RecordPane} role="menu">
      <Details
        role="list"
        open
        className={styles.details}
        summary={` ${language === ENGLISH ? 'Records' : 'Registros'}`}
      >
        {recordsReady &&
          orgInfo.map((record: PGResponse, i: number) => (
            <Fragment key={i}>
              <OrgRecordCard record={record} />
            </Fragment>
          ))}
      </Details>
    </div>
  )
}
export default TagPane
