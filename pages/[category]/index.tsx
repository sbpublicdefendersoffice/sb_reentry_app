import { useState, useEffect } from 'react'
import Head from 'next/head'
import Error from 'next/error'
import { useRouter } from 'next/router'

import useLanguage from '../../hooks/useLanguage'

import { siteTitle } from '../../constants/copy'
import useMultipleListRecords from '../../hooks/useMultipleListRecords'
import { filterOutLocationlessRecords } from '../../helpers/filters'

import { LocationRecord } from '../../types/records'
import { RecordPane, DisplayMap } from '../../components'
import categories from '../../constants/categories'

const LandingPage = () => {
  const { asPath } = useRouter()
  const { language } = useLanguage()

  const validCategory = categories[asPath]

  if (!validCategory) return <Error statusCode={404} />

  const displayCategory: string = validCategory[language].category
  const routeCategory: string = validCategory.english.category.toLowerCase()

  const { fetchedRecords, setFetchedRecords } = useMultipleListRecords(
    routeCategory,
  )

  const [convertedLocRecords, setConvertedLocRecords] = useState<
    LocationRecord[] | null
  >(null)

  useEffect((): void => {
    if (fetchedRecords) {
      const mappedLocRecords: LocationRecord[] = filterOutLocationlessRecords(
        fetchedRecords,
      )
      setConvertedLocRecords(mappedLocRecords)
    }
  }, [fetchedRecords])

  return (
    <>
      <Head>
        <title>{`${siteTitle} | ${displayCategory}`}</title>
      </Head>
      <RecordPane
        orgInfo={fetchedRecords}
        displayCategory={displayCategory}
        routeCategory={routeCategory}
        setRecords={setFetchedRecords}
      />

      {Boolean(convertedLocRecords?.length) && (
        <DisplayMap
          latLongInfo={convertedLocRecords}
          setLatLongInfo={setConvertedLocRecords}
        />
      )}
    </>
  )
}

export default LandingPage
