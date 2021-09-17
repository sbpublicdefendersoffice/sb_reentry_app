import { useEffect } from 'react'
import { useRouter } from 'next/router'

import { searchByKeyword, googleViewSearchResults } from '../../helpers'
import {
  useGlobalSearch,
  useLanguage,
  useConvertedLocationRecords,
} from '../../hooks'
import { isProd, siteTitle } from '../../constants/'
import { PGOrganizationResponse, CopyHolder } from '../../types'
import { TagPane, DisplayMap, HeadTags } from '../../components/'

const copy: CopyHolder = {
  english: { search: 'Search' },
  spanish: { search: 'Buscar' },
}

const GlobalSearchLanding = () => {
  const { asPath } = useRouter()
  const { language } = useLanguage()
  const { searchResults, setSearchResults } = useGlobalSearch()
  const { convertedLocRecords, setLocationRecords } =
    useConvertedLocationRecords()

  const { search } = copy[language]

  useEffect((): void => {
    const captureQuery: RegExp = /^.*=(.*)$/
    const capturedQueryReference: string = '$1'
    const query: string = decodeURI(
      asPath.replace(captureQuery, capturedQueryReference),
    )

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
        <HeadTags title={`${siteTitle} | ${search}`} href="/search" />
        <TagPane orgInfo={searchResults} />
        <DisplayMap latLongInfo={convertedLocRecords} />
      </>
    )
  )
}

export default GlobalSearchLanding
