import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'

import { POST, convertLocationsForMap } from '../../helpers'
import { useGlobalSearch, useLanguage } from '../../hooks'

import { LocationRecord, TranslatedRecordResponse } from '../../types/records'
import DisplayMap from '../../components/DisplayMap'

const GlobalSearchLanding = () => {
  const { asPath } = useRouter()
  const { language } = useLanguage()

  const { searchResults, setSearchResults } = useGlobalSearch()
  const [convertedLocRecords, setConvertedLocRecords] =
    useState<LocationRecord[] | null>(null)

  useEffect((): void => {
    const filterOrFetch = async () => {
      if (searchResults) {
        const mappedLocRecords: LocationRecord[] =
          convertLocationsForMap(searchResults)
        setConvertedLocRecords(mappedLocRecords)
      } else {
        const captureQuery: RegExp = /^.*=(.*)$/
        const capturedQueryReference: string = '$1'
        const query: string = asPath.replace(
          captureQuery,
          capturedQueryReference,
        )

        const call: Response = await fetch('/api/airtablerecordsbykeyword', {
          method: POST,
          body: JSON.stringify({
            searchQuery: query.toLowerCase(),
            language,
          }),
        })

        const response: TranslatedRecordResponse = await call.json()
        setSearchResults(response)
      }
    }
    filterOrFetch()
  }, [searchResults])

  return (
    <>
      {convertedLocRecords && <DisplayMap latLongInfo={convertedLocRecords} />}
    </>
  )
}

export default GlobalSearchLanding
