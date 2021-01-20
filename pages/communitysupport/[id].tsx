import Head from 'next/head'

import useSingleRecord from '../../hooks/useSingleRecord'
import { OrgRecordDisplay, RecordPane } from '../../components'

const category: string = 'Community Support'

const IdPage = () => {
  const { singleFetchedRecord } = useSingleRecord()

  return (
    <>
      {singleFetchedRecord && (
        <>
          <Head>
            <title>{`Santa Barbara Reentry | ${singleFetchedRecord.name}`}</title>
          </Head>
          <RecordPane category={category} />
          <OrgRecordDisplay singleFetchedRecord={singleFetchedRecord} />
        </>
      )}
    </>
  )
}

export default IdPage
