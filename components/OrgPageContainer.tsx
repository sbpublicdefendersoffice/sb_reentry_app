import Head from 'next/head'

import useSingleRecord from '../hooks/useSingleRecord'
import useMultipleListRecords from '../hooks/useMultipleListRecords'
import { siteTitle } from '../constants/copy'

import { OrgRecordDisplay, RecordPane } from './'

interface OrgPageContainerProps {
  displayCategory: string
  routeCategory: string
}

import styles from './OrgPageContainer.module.css'

const OrgPageContainer = ({
  displayCategory,
  routeCategory,
}: OrgPageContainerProps) => {
  const lowCategory: string = routeCategory.toLowerCase()

  const { fetchedRecords, setFetchedRecords } = useMultipleListRecords(
    lowCategory,
  )

  const { sortedRecord } = useSingleRecord()

  return (
    <div className={styles.OrgPageContainer}>
      <Head>
        <title>{`${siteTitle} | ${sortedRecord?.name}`}</title>
      </Head>
      <RecordPane
        orgInfo={fetchedRecords}
        displayCategory={displayCategory}
        routeCategory={routeCategory}
        setRecords={setFetchedRecords}
      />
      <OrgRecordDisplay sortedRecord={sortedRecord} />
    </div>
  )
}

export default OrgPageContainer
