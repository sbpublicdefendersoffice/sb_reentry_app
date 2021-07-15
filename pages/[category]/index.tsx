import { useEffect, useState } from 'react'
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
const LandingPage = () => {
  const { asPath } = useRouter()
  const { language } = useLanguage()
  const classes = useStyles()
  const [filteredResults, setFilteredResults] = useState<any | null>([])
  const [fields, handleFieldsSelected] = useFormFields({
    citySelected: [],
    serviceSelected: [],
    genderSelected: [],
    languageSelected: [],
  })
  const [open, setOpen] = useState(false)
  const [currentView, setCurrentView] = useState('list')
  const activeCopy = categoryCopy[language]
  const validCategory = categories[asPath]
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
      fields.genderSelected,
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
      <div className={classes.root}>
        <Grid container spacing={3}>
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
          <Hidden smUp>
            <MobileButtonsLandingPage
              setCurrentView={setCurrentView}
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
            <MobileFilterModal
              fields={fields}
              handleFieldsSelected={handleFieldsSelected}
              routeCategory={routeCategory}
              setOpen={setOpen}
              activeCopy={activeCopy}
            />
          </Modal>
          {currentView == 'list' && (
            <RecordPane
              orgInfo={filteredResults}
              displayCategory={displayCategory}
              routeCategory={routeCategory}
              setRecords={setFetchedRecords}
            />
          )}
          {currentView == 'map' && convertedLocRecords && (
            <DisplayMap latLongInfo={convertedLocRecords} />
          )}
          <Hidden smDown>
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
