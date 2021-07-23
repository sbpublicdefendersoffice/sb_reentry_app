import { useRouter } from 'next/router'
import { useEffect } from 'react'
import Head from 'next/head'

import {
  useSingleRecord,
  useLanguage,
  useConvertedLocationRecords,
} from '../../hooks'
import { LeafLoader, DisplayMap, OrgRecordDisplay } from '../../components'
import { siteTitle } from '../../constants/copy'

const IdPage = () => {
  const { asPath } = useRouter()
  const { language } = useLanguage()
  const { sortedRecord } = useSingleRecord()
  const { convertedLocRecords, setLocationRecords } =
    useConvertedLocationRecords()

  useEffect(() => {
    if (sortedRecord) setLocationRecords([sortedRecord])
  }, [sortedRecord])

  if (asPath.startsWith('/[category]') || !sortedRecord) return <LeafLoader />

  return (
    <>
      <Head>
        <title>{`${siteTitle} | ${sortedRecord?.[`name_${language}`]}`}</title>
      </Head>
      <OrgRecordDisplay sortedRecord={sortedRecord} />
      {Boolean(convertedLocRecords?.length) && (
        <DisplayMap latLongInfo={convertedLocRecords} />
      )}
    </>
  )
}

export default IdPage
