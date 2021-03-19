import { useRouter } from 'next/router'
import Head from 'next/head'

import useSingleRecord from '../../hooks/useSingleRecord'
import { siteTitle } from '../../constants/copy'

import { LeafLoader, OrgRecordDisplay, DisplayMap } from '../../components'

const IdPage = () => {
  const { asPath } = useRouter()
  const { sortedRecord } = useSingleRecord()

  if (asPath.startsWith('/[category]') || !sortedRecord) return <LeafLoader />

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

export default IdPage
