import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { POST, convertLocationsForMap, searchByKeyword } from '../../helpers'
import { useGlobalSearch, useLanguage } from '../../hooks'
import { LocationRecord, TranslatedRecordResponse } from '../../types/records'
import { TagPane, DisplayMap } from '../../components/'

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
        const call: TranslatedRecordResponse = await searchByKeyword(
          query,
          language,
        )
        setSearchResults(call)
      }
    }

    filterOrFetch()
  }, [searchResults])

  return (
    convertedLocRecords && (
      <>
        <TagPane orgInfo={searchResults} />
        <DisplayMap latLongInfo={convertedLocRecords} />
      </>
    )
  )
}

export default GlobalSearchLanding
