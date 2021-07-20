import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { searchByKeyword } from '../../helpers'
import {
  useGlobalSearch,
  useLanguage,
  useConvertedLocationRecords,
} from '../../hooks'
import { PGOrganizationResponse } from '../../types'
import { TagPane, DisplayMap } from '../../components/'

const GlobalSearchLanding = () => {
  const { asPath } = useRouter()
  const { language } = useLanguage()
  const { searchResults, setSearchResults } = useGlobalSearch()
  const { convertedLocRecords, setLocationRecords } =
    useConvertedLocationRecords()

  useEffect((): void => {
    const filterOrFetch = async () => {
      if (searchResults) setLocationRecords(searchResults)
      else {
        const captureQuery: RegExp = /^.*=(.*)$/
        const capturedQueryReference: string = '$1'
        const query: string = asPath.replace(
          captureQuery,
          capturedQueryReference,
        )
        const call: PGOrganizationResponse[] = await searchByKeyword(
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
