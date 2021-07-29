import { useEffect, useState, useContext } from 'react'
import Head from 'next/head'
import Error from 'next/error'
import { useRouter } from 'next/router'
import { Modal, Hidden, Grid } from '@material-ui/core/'
import withWidth from '@material-ui/core/withWidth'
import {
  useMultipleListRecords,
  useConvertedLocationRecords,
  useLanguage,
  useFormFields,
  useGetMatchingRecords,
} from '../../hooks/'
import {
  RecordPane,
  DisplayMap,
  MobileFilterModal,
  MobileButtonsLandingPage,
  DesktopFilterView,
  CategoryDescription,
  DisplayCategoryImage,
} from '../../components'
import {
  categoryCopy,
  siteTitle,
  categories,
  useStyles,
} from '../../constants/'
import ViewContext from '../../hooks/useView'
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
  const { isListView, isMapView } = state
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
          <DisplayCategoryImage
            displayCategory={displayCategory}
            routeCategory={routeCategory}
          />
          <Hidden smDown>
            <CategoryDescription
              displayDescription={displayDescription}
              activeCopy={activeCopy}
            />
          </Hidden>
          <Hidden smDown>
            <DesktopFilterView
              fields={fields}
              handleFieldsSelected={handleFieldsSelected}
              routeCategory={routeCategory}
              activeCopy={activeCopy}
            />
          </Hidden>
          <Hidden mdUp>
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
          <Hidden mdUp>
            <div
              style={{
                display: isListView && !isMapView ? 'contents' : 'none',
              }}
            >
              <RecordPane
                orgInfo={filteredResults}
                displayCategory={displayCategory}
                routeCategory={routeCategory}
                setRecords={setFetchedRecords}
              />
            </div>
            {convertedLocRecords && (
              <div
                style={{
                  display: isMapView && !isListView ? 'contents' : 'none',
                }}
              >
                <DisplayMap latLongInfo={convertedLocRecords} />
              </div>
            )}
          </Hidden>
          <Hidden smDown>
            <RecordPane
              orgInfo={filteredResults}
              displayCategory={displayCategory}
              routeCategory={routeCategory}
              setRecords={setFetchedRecords}
            />
            {convertedLocRecords && (
              <DisplayMap latLongInfo={convertedLocRecords} />
            )}
          </Hidden>
        </Grid>
      </div>
    </>
  )
}
export default withWidth()(LandingPage)
