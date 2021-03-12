import Head from 'next/head'

import useSingleRecord from '../../hooks/useSingleRecord'
import { OrgRecordDisplay } from '../../components'
import { siteTitle } from '../../constants/copy'

const SearchIdPage = () => {
  const { sortedRecord } = useSingleRecord()

  return (
    <>
      <Head>
        <title>{`${siteTitle} | ${sortedRecord?.name}`}</title>
      </Head>
      <OrgRecordDisplay sortedRecord={sortedRecord} />
    </>
  )
}

export default SearchIdPage
