import { useEffect, useState } from 'react'
import Head from 'next/head'
import Error from 'next/error'
import { useRouter } from 'next/router'
import Fab from '@material-ui/core/Fab'
import Modal from '@material-ui/core/Modal'
import FilterListIcon from '@material-ui/icons/FilterList'
import ListIcon from '@material-ui/icons/List'
import MapIcon from '@material-ui/icons/Room'
import Hidden from '@material-ui/core/Hidden'
import withWidth, { WithWidth } from '@material-ui/core/withWidth'
import Grid from '@material-ui/core/Grid'
import {
  useMultipleListRecords,
  useConvertedLocationRecords,
  useLanguage,
} from '../../hooks/'
import { siteTitle, categories, useStyles } from '../../constants'
import { RecordPane, DisplayMap, CategoryFilters } from '../../components'
import {
  categoryServiceFilter,
  categoryCopy,
  getMatchingRecords,
} from '../../constants/'
import { Title, Paragraph } from '../../ui'
import MobileFilterModal from '../../components/MobileFilterModal'
const ITEM_HEIGHT = 48
const ITEM_PADDING_TOP = 8
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
}
function getModalStyle() {
  return {
    top: '45%',
    left: '50%',
    transform: `translate(-50%, -50%)`,
  }
}
const LandingPage = (props: WithWidth) => {
  const { width } = props
  const { asPath } = useRouter()
  const { language } = useLanguage()
  const classes = useStyles()
  const [citySelected, setCitySelected] = useState<string[]>([])
  const [serviceSelected, setServiceSelected] = useState<string[]>([])
  const [genderSelected, setGenderSelected] = useState<string[]>([])
  const [languageSelected, setLanguageSelected] = useState<string[]>([])
  const [filteredResults, setFilteredResults] = useState<any | null>([])
  const [open, setOpen] = useState(false)
  const [currentView, setCurrentView] = useState('list')
  const [modalStyle] = useState(getModalStyle)
  const activeCopy = categoryCopy[language]
  const setFunctions = {
    setServiceSelected,
    setGenderSelected,
    setLanguageSelected,
    setCitySelected,
  }
  const validCategory = categories[asPath]
  if (!validCategory) return <Error statusCode={404} />
  const displayCategory: string = validCategory[language].category
  const displayDescription: string = validCategory[language].description
  const routeCategory: string = validCategory.english.category.toLowerCase()
  const urlCategory: string = displayCategory.toLowerCase().replace(' ', '')
  let newServiceFilter =
    categoryServiceFilter[routeCategory][
      `${routeCategory.replace(' ', '')}ServiceCopy`
    ]
  const { fetchedRecords, setFetchedRecords } =
    useMultipleListRecords(routeCategory)
  const { convertedLocRecords, setLocationRecords } =
    useConvertedLocationRecords()
  useEffect((): void => {
    let keywordQuery = serviceSelected.concat(
      citySelected,
      genderSelected,
      languageSelected,
    )
    if (keywordQuery.length > 0) {
      let newResults = getMatchingRecords(
        fetchedRecords,
        serviceSelected.concat(
          citySelected,
          serviceSelected,
          genderSelected,
          languageSelected,
        ),
      )
      setFilteredResults(newResults)
      setLocationRecords(newResults)
    } else if (fetchedRecords && keywordQuery.length === 0) {
      setFilteredResults(fetchedRecords)
      setLocationRecords(fetchedRecords)
    }
  }, [
    fetchedRecords,
    serviceSelected,
    citySelected,
    genderSelected,
    languageSelected,
  ])
  const handleSelected = e => {
    let value = e.target.value
    setFunctions[e.target.name](value)
  }
  console.log('width', width)
  return (
    <>
      <Head>
        <title>{`${siteTitle} | ${displayCategory}`}</title>
      </Head>
      <div className={classes.root}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Title>{displayCategory}</Title>
          </Grid>
          <Grid item xs={12} sm={12} md={4}>
            <img
              style={{
                width: '15rem',
                height: '15rem',
              }}
              src={`/icons/${routeCategory.replace(' ', '')}.svg`}
              alt={`Pic of ${displayCategory}`}
            />
          </Grid>
          <Hidden smDown>
            <Grid item xs={12} sm={12} md={8}>
              <p className={classes.landingPageDescription}>
                {displayDescription}
              </p>
            </Grid>
            <Grid item xs={12} md={12}>
              <Paragraph
                style={{
                  textAlign: 'center',
                  display: 'block',
                  fontSize: '2rem',
                  fontFamily: 'Roboto',
                }}
              >
                {activeCopy.chooseFilter}
              </Paragraph>
            </Grid>
          </Hidden>
          <Hidden smDown>
            <CategoryFilters
              citySelected={citySelected}
              serviceSelected={serviceSelected}
              genderSelected={genderSelected}
              languageSelected={languageSelected}
              handleSelected={handleSelected}
              MenuProps={MenuProps}
              newServiceFilter={newServiceFilter}
            />{' '}
          </Hidden>
          <Hidden smUp>
            <Grid container spacing={2} justify="center">
              <Grid item xs={3}>
                <Fab variant="extended" onClick={() => setCurrentView('list')}>
                  <ListIcon />
                  {activeCopy.list}
                </Fab>
              </Grid>
              <Grid item xs={3} spacing={3}>
                <Fab variant="extended" onClick={() => setCurrentView('map')}>
                  <MapIcon />
                  {activeCopy.map}
                </Fab>
              </Grid>
              <Grid item xs={3}>
                <Fab variant="extended" onClick={() => setOpen(true)}>
                  <FilterListIcon />
                  {activeCopy.filter}
                </Fab>
              </Grid>
            </Grid>
          </Hidden>
          <Modal
            open={open}
            onClose={() => setOpen(false)}
            aria-labelledby="simple-modal-title"
            aria-describedby="simple-modal-description"
          >
            <MobileFilterModal
              citySelected={citySelected}
              serviceSelected={serviceSelected}
              genderSelected={genderSelected}
              languageSelected={languageSelected}
              handleSelected={handleSelected}
              MenuProps={MenuProps}
              newServiceFilter={newServiceFilter}
              modalStyle={modalStyle}
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
