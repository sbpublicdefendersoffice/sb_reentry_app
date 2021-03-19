import Head from 'next/head'

import useSingleRecord from '../../hooks/useSingleRecord'
import { OrgRecordDisplay, LeafLoader, DisplayMap } from '../../components'
import { siteTitle } from '../../constants/copy'

const SearchIdPage = () => {
  const { sortedRecord } = useSingleRecord()

  if (!sortedRecord) return <LeafLoader />

  const { locations } = sortedRecord

  return (
    <>
      <Head>
        <title>{`${siteTitle} | ${sortedRecord?.name}`}</title>
      </Head>
      <OrgRecordDisplay sortedRecord={sortedRecord} />
      {Boolean(locations?.length) && <DisplayMap latLongInfo={locations} />}
    </>
  )
}

export default SearchIdPage
