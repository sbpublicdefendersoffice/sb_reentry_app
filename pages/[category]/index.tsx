import { useEffect, useState, useContext } from 'react'
import Head from 'next/head'
import Error from 'next/error'
import { useRouter } from 'next/router'
import { Modal, Hidden, Grid, withWidth } from '@material-ui/core/'
import {
  useMultipleListRecords,
  useConvertedLocationRecords,
  useLanguage,
  useFormFields,
  useGetMatchingRecords,
  ViewContext,
} from '../../hooks/'
import {
  DisplayMap,
  MobileFilterModal,
  MobileButtonsLandingPage,
} from '../../components'
import RecordPane from '../../components/RecordPane'
import {
  categoryCopy,
  siteTitle,
  categories,
  useStyles,
} from '../../constants/'
import { ItemAssignmentContext } from 'twilio/lib/rest/numbers/v2/regulatoryCompliance/bundle/itemAssignment'
const LandingPage = () => {
  const { asPath } = useRouter()
  const { language } = useLanguage()
  const classes = useStyles()
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
  const [open, setOpen] = useState(false)
  const activeCopy = categoryCopy[language]
  const validCategory = categories[asPath]
  const { state } = useContext(ViewContext)
  const routeCategory: string = validCategory?.english.category.toLowerCase()
  const displayCategory: string = validCategory?.[language].category
  const displayDescription: string = validCategory?.[language].description
  const { fetchedRecords, setFetchedRecords } =
    useMultipleListRecords(routeCategory)
  const { convertedLocRecords, setLocationRecords } =
    useConvertedLocationRecords()
  useEffect((): void => {
    let keywordQuery = fields.serviceSelected.concat(
      fields.citySelected,
      fields.peopleServedSelected,
      fields.languageSelected,
    )
fields.citySelected.length>0?setCheckIsCity(true): setCheckIsCity(false)
fields.serviceSelected.length>0?setCheckIsService(true): setCheckIsService(false)
fields.peopleServedSelected.length>0?setCheckIsPeopleServed(true): setCheckIsPeopleServed(false)
fields.languageSelected.length>0?setCheckIsLanguage(true): setCheckIsLanguage(false)
    // if (fields.citySelected.length > 0) {
    //   setCheckedItems(...field, )
    // } else if (fields.citySelected == 0) {
    //   setCheckIsCity(false)
    // }
    // if (fields.serviceSelected.length > 0) {
    //   setCheckIsService(true)
    // } else if (fields.serviceSelected == 0) {
    //   setCheckIsService(false)
    // }
    if (fetchedRecords && keywordQuery.length === 0) {
      setFilteredResults(fetchedRecords)
      setLocationRecords(fetchedRecords)
    } else if (fetchedRecords && keywordQuery.length > 0 )  {
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
  }, [fetchedRecords, fields, validCategory, checkIsCity, checkIsService, checkIsLanguage, checkIsPeopleServed])
  if (!validCategory) return <Error statusCode={404} />
  console.log('checkIs City', checkIsCity)
  return (
    <>
      <Head>
        <title>{`${siteTitle} | ${displayCategory}`}</title>
      </Head>
      <div className={classes.landingPageContainer}>
        <Grid container>
          <Hidden lgUp>
            <MobileButtonsLandingPage
              activeCopy={activeCopy}
              setOpen={setOpen}
            />
          </Hidden>
          <Modal
            open={open}
            onClose={() => setOpen(false)}
            aria-labelledby="simple-modal-title"
            aria-describedby="simple-modal-description"
          >
            <>
              <MobileFilterModal
                fields={fields}
                handleFieldsSelected={handleFieldsSelected}
                routeCategory={routeCategory}
                setOpen={setOpen}
                activeCopy={activeCopy}
              />
            </>
          </Modal>
          <RecordPane
            orgInfo={filteredResults}
            displayCategory={displayCategory}
            displayDescription={displayDescription}
            routeCategory={routeCategory}
            setRecords={setFetchedRecords}
            fields={fields}
            handleFieldsSelected={handleFieldsSelected}
            activeCopy={activeCopy}
          />
          {convertedLocRecords && (
            <DisplayMap latLongInfo={convertedLocRecords} />
          )}
        </Grid>
      </div>
    </>
  )
}
export default withWidth()(LandingPage)
