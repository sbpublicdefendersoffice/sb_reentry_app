import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { searchByKeyword, googleViewSearchResults } from '../../helpers'
import {
  useGlobalSearch,
  useLanguage,
  useConvertedLocationRecords,
} from '../../hooks'
import { isProd } from '../../constants/env'

import { PGOrganizationResponse } from '../../types'
import { TagPane, DisplayMap } from '../../components/'

const GlobalSearchLanding = () => {
  const { asPath } = useRouter()
  const { language } = useLanguage()
  const { searchResults, setSearchResults } = useGlobalSearch()
  const { convertedLocRecords, setLocationRecords } =
    useConvertedLocationRecords()

  useEffect((): void => {
    const captureQuery: RegExp = /^.*=(.*)$/
    const capturedQueryReference: string = '$1'
    const query: string = asPath.replace(captureQuery, capturedQueryReference)

    const filterOrFetch = async () => {
      if (searchResults) {
        setLocationRecords(searchResults)
        if (isProd) googleViewSearchResults(query, language)
      } else {
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
