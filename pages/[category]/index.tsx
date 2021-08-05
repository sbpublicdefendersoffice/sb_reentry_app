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
  ViewContext
} from '../../hooks/'
import {
  RecordPane,
  DisplayMap,
  MobileFilterModal,
  MobileButtonsLandingPage,
} from '../../components'
import {
  categoryCopy,
  siteTitle,
  categories,
  useStyles,
} from '../../constants/'
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
    if (fetchedRecords && keywordQuery.length > 0) {
      let newResults = useGetMatchingRecords(fetchedRecords, keywordQuery)
      setFilteredResults(newResults)
      setLocationRecords(newResults)
    } else if (fetchedRecords && keywordQuery.length === 0) {
      setFilteredResults(fetchedRecords)
      setLocationRecords(fetchedRecords)
    }
  }, [fetchedRecords, fields, validCategory])
  if (!validCategory) return <Error statusCode={404} />
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
