import Head from 'next/head'

import useSingleRecord from '../hooks/useSingleRecord'
import useMultipleListRecords from '../hooks/useMultipleListRecords'

import { OrgRecordDisplay, RecordPane } from './'

interface OrgPageContainerProps {
  displayCategory: string
  routeCategory: string
}

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
    sortedRecord && (
      <>
        <Head>
          <title>{`Santa Barbara Reentry | ${sortedRecord.name}`}</title>
        </Head>
        <RecordPane
          orgInfo={fetchedRecords}
          displayCategory={displayCategory}
          routeCategory={routeCategory}
          setRecords={setFetchedRecords}
        />
        <OrgRecordDisplay sortedRecord={sortedRecord} />
      </>
    )
  )
}

export default OrgPageContainer
