import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'

import { TranslatedRecordResponse } from '../../types/records'

import { POST } from '../../helpers/validators'
import { filterOutLocationlessRecords } from '../../helpers/filters'
import { useGlobalSearch, useLanguage } from '../../hooks'
import { LocationRecord } from '../../types/records'
import DisplayMap from '../../components/DisplayMap'

const GlobalSearchLanding = () => {
  const { asPath } = useRouter()
  const { language } = useLanguage()

  const { searchResults, setSearchResults } = useGlobalSearch()
  const [convertedLocRecords, setConvertedLocRecords] = useState<
    LocationRecord[] | null
  >(null)

  useEffect((): void => {
    const filterOrFetch = async () => {
      if (searchResults) {
        const mappedLocRecords: LocationRecord[] = filterOutLocationlessRecords(
          searchResults,
        )
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
      {convertedLocRecords && (
        <DisplayMap latLongInfo={convertedLocRecords} page="search" />
      )}
    </>
  )
}

export default GlobalSearchLanding
