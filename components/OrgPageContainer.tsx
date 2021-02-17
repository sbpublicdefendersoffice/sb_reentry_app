import Head from 'next/head'

import useSingleRecord from '../hooks/useSingleRecord'
import useMultipleListRecords from '../hooks/useMultipleListRecords'

import { OrgRecordDisplay, RecordPane } from './'

interface OrgPageContainerProps {
  category: string
}

const OrgPageContainer = ({ category }: OrgPageContainerProps) => {
  const lowCategory: string = category.toLowerCase()

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
          category={category}
          setRecords={setFetchedRecords}
        />
        <OrgRecordDisplay sortedRecord={sortedRecord} />
      </>
    )
  )
}

export default OrgPageContainer
