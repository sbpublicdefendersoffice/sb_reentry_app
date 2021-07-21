import { useEffect } from 'react'
import Head from 'next/head'

import {
  useSingleRecord,
  useLanguage,
  useConvertedLocationRecords,
} from '../../hooks'
import { LeafLoader, DisplayMap } from '../../components'
import { siteTitle } from '../../constants/copy'

const SearchIdPage = () => {
  const { language } = useLanguage()
  const { sortedRecord } = useSingleRecord()
  const { convertedLocRecords, setLocationRecords } =
    useConvertedLocationRecords()

  useEffect(() => {
    if (sortedRecord) setLocationRecords([sortedRecord])
  }, [sortedRecord])

  if (!sortedRecord) return <LeafLoader />

  return (
    <>
      <Head>
        <title>{`${siteTitle} | ${sortedRecord?.[`name_${language}`]}`}</title>
      </Head>
      {/* <OrgRecordDisplay sortedRecord={sortedRecord} /> */}
      {Boolean(convertedLocRecords?.length) && (
        <DisplayMap latLongInfo={convertedLocRecords} />
      )}
    </>
  )
}

export default SearchIdPage
