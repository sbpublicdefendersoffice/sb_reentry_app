import { useEffect } from 'react'
import Head from 'next/head'
import Error from 'next/error'
import { useRouter } from 'next/router'

import {
  useMultipleListRecords,
  useConvertedLocationRecords,
  useLanguage,
} from '../../hooks/'
import { siteTitle, categories } from '../../constants'
import { RecordPane, DisplayMap } from '../../components'

const LandingPage = () => {
  const { asPath } = useRouter()
  const { language } = useLanguage()

  const validCategory = categories[asPath]

  if (!validCategory) return <Error statusCode={404} />

  const displayCategory: string = validCategory[language].category
  const routeCategory: string = validCategory.english.category.toLowerCase()

  const { fetchedRecords, setFetchedRecords } =
    useMultipleListRecords(routeCategory)
  const { convertedLocRecords, setLocationRecords } =
    useConvertedLocationRecords()

  useEffect((): void => {
    if (fetchedRecords) setLocationRecords(fetchedRecords)
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

      {convertedLocRecords && <DisplayMap latLongInfo={convertedLocRecords} />}
    </>
  )
}

export default LandingPage
