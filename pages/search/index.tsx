import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { Hidden } from '@mui/material'
import { searchByKeyword, googleViewSearchResults } from '../../helpers'
import {
  useGlobalSearch,
  useLanguage,
  useConvertedLocationRecords,
} from '../../hooks'
import { isProd, siteTitle } from '../../constants/'
import { PGOrganizationResponse, CopyHolder } from '../../types'
import { TagPane, DisplayMap, HeadTags } from '../../components/'
import { categoryCopy } from '../../constants/filter'
import MobileButtonsLandingPage from '../../components/MobileButtonsLandingPage'
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
  const activeCopy = categoryCopy[language]
  const [open, setOpen] = useState<boolean>(false)
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
        <div
          style={{ display: 'flex', textAlign: 'center', marginTop: '1rem' }}
        >
          <Hidden lgUp>
            <MobileButtonsLandingPage
              activeCopy={activeCopy}
              setOpen={setOpen}
              showFilter={'false'}
            />
          </Hidden>
        </div>
        <TagPane orgInfo={searchResults} />
        <DisplayMap latLongInfo={convertedLocRecords} />
      </>
    )
  )
}

export default GlobalSearchLanding
