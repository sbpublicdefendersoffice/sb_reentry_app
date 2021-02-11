import Head from 'next/head'
import { useState, useEffect } from 'react'

import { DisplayMap } from '../../components'
import {
  TranslatedRecordResponse,
  LocationRecord,
  OrgRecord,
} from '../../types/records'
import { fetchRecordsByCategory } from '../../services/GET'

import { RecordPane } from '../../components'

const category: string = 'Legal Services'

const LandingPage = () => {
  const [
    fetchedRecords,
    setFetchedRecords,
  ] = useState<TranslatedRecordResponse | null>(null)

  const [convertedLocRecords, setConvertedLocRecords] = useState<
    LocationRecord[] | null
  >(null)

  const lowCategory: string = category.toLowerCase()

  useEffect((): void => {
    fetchRecordsByCategory(lowCategory, setFetchedRecords)
  }, [])

  useEffect((): void => {
    if (fetchedRecords) {
      const mappedLocRecords: LocationRecord[] = fetchedRecords.records.reduce(
        (arr: LocationRecord[], record: OrgRecord) => {
          const longCheck: number[] = record.fields.location_longitude

          if (longCheck) {
            const newLocationRecords = longCheck.map(
              (longitude: number, i: number) => ({
                category: fetchedRecords.category,
                longitude,
                latitude: record.fields.location_latitude[i],
                name: record.fields.org_name,
                uuid: record.id,
              }),
            )
            arr = [...arr, ...newLocationRecords]
          }

          return arr
        },
        [],
      )
      setConvertedLocRecords(mappedLocRecords)
    }
  }, [fetchedRecords])

  return (
    <>
      <Head>
        <title>{`Santa Barbara Reentry | ${category}`}</title>
      </Head>
      <RecordPane
        orgInfo={fetchedRecords}
        category={category}
        setRecords={setFetchedRecords}
      />
      {Boolean(convertedLocRecords?.length) && (
        <DisplayMap latLongInfo={convertedLocRecords} page="search" />
      )}
    </>
  )
}

export default LandingPage
