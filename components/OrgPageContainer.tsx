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

  const { singleFetchedRecord } = useSingleRecord()

  return (
    singleFetchedRecord && (
      <>
        <Head>
          <title>{`Santa Barbara Reentry | ${singleFetchedRecord.name}`}</title>
        </Head>
        <RecordPane
          orgInfo={fetchedRecords}
          category={category}
          setRecords={setFetchedRecords}
        />
        <OrgRecordDisplay singleFetchedRecord={singleFetchedRecord} />
      </>
    )
  )
}

export default OrgPageContainer
