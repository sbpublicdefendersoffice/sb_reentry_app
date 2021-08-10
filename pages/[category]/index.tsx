import { useEffect, useState } from 'react'
import Head from 'next/head'
import Error from 'next/error'
import { useRouter } from 'next/router'

import {
  useMultipleListRecords,
  useConvertedLocationRecords,
  useLanguage,
  useFormFields,
  useGetMatchingRecords,
} from '../../hooks/'
import { siteTitle, categories } from '../../constants'
import { RecordPane, DisplayMap, FilterView } from '../../components'

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

  // #region filtering code
  const [filteredResults, setFilteredResults] = useState<any | null>([])
  const [fields, handleFieldsSelected] = useFormFields({
    citySelected: [],
    serviceSelected: [],
    peopleServedSelected: [],
    languageSelected: [],
  })

  const [checkIsCity, setCheckIsCity] = useState(false)
  const [checkIsService, setCheckIsService] = useState(false)
  const [checkIsLanguage, setCheckIsLanguage] = useState(false)
  const [checkIsPeopleServed, setCheckIsPeopleServed] = useState(false)

  useEffect((): void => {
    let keywordQuery = fields.serviceSelected.concat(
      fields.citySelected,
      fields.peopleServedSelected,
      fields.languageSelected,
    )
    fields.citySelected.length > 0
      ? setCheckIsCity(true)
      : setCheckIsCity(false)
    fields.serviceSelected.length > 0
      ? setCheckIsService(true)
      : setCheckIsService(false)
    fields.peopleServedSelected.length > 0
      ? setCheckIsPeopleServed(true)
      : setCheckIsPeopleServed(false)
    fields.languageSelected.length > 0
      ? setCheckIsLanguage(true)
      : setCheckIsLanguage(false)

    if (fetchedRecords && keywordQuery.length === 0) {
      setFilteredResults(fetchedRecords)
      setLocationRecords(fetchedRecords)
    } else if (fetchedRecords && keywordQuery.length > 0) {
      let newResults = useGetMatchingRecords(
        fetchedRecords,
        keywordQuery,
        checkIsCity,
        checkIsService,
        checkIsLanguage,
        checkIsPeopleServed,
      )
      setFilteredResults(newResults)
      setLocationRecords(newResults)
    }
  }, [
    fetchedRecords,
    fields,
    validCategory,
    checkIsCity,
    checkIsService,
    checkIsLanguage,
    checkIsPeopleServed,
  ])
  //#endregion

  return (
    <>
      <Head>
        <title>{`${siteTitle} | ${displayCategory}`}</title>
      </Head>
      <RecordPane
        orgInfo={filteredResults}
        displayCategory={displayCategory}
        routeCategory={routeCategory}
        setRecords={setFetchedRecords}
      >
        <FilterView
          fields={fields}
          handleFieldsSelected={handleFieldsSelected}
          routeCategory={routeCategory}
        />
      </RecordPane>
      {convertedLocRecords && <DisplayMap latLongInfo={convertedLocRecords} />}
    </>
  )
}

export default LandingPage
