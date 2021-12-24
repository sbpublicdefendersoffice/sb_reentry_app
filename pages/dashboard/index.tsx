import { useRouter } from 'next/router'
import { GetServerSideProps, GetServerSidePropsContext } from 'next'
import { FormEvent, Fragment, ChangeEvent, useState } from 'react'
import { JwtPayload, verify } from 'jsonwebtoken'
import timeConverter from '../../helpers/timeConverter'
import {
  Button,
  TextField,
  Accordion,
  AccordionSummary,
  Autocomplete,
  AccordionDetails,
  FormGroup,
  FormControlLabel,
  Checkbox,
  Grid,
  Box,
  Modal,
} from '@mui/material'
import TimePicker from '@mui/lab/TimePicker'
import LocalizationProvider from '@mui/lab/LocalizationProvider'
import DateAdapter from '@mui/lab/AdapterMoment'
import FormModal from '../../components/FormModal'
import ScheduleServiceModal from '../../components/ScheduleServiceModal'
import { POST } from '../../helpers/'
import { useStyles } from '../../constants'
import { ExpandMore } from '@mui/icons-material'
import AddIcon from '@mui/icons-material/Add'
import { HeadTags } from '../../components'
import useToast from '../../hooks/useToast'
import { siteTitle } from '../../constants/'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'
import {
  initCategoriesState,
  initSmallDaysCheckBoxState,
} from '../../constants/checkBoxState'
interface DashboardProps {
  userId: number
  orgId: number
  isVerified: boolean
}
const Dashboard = ({ isVerified, orgId }: DashboardProps) => {
  const { push } = useRouter()
  const classes = useStyles()
  const { setToast } = useToast()
  const [orgInfo, setOrgInfo] = useState(null)
  const [locationID, setLocationID] = useState(0)
  const [locationIndex, setLocationIndex] = useState(0)
  const [schOrServIndex, setSchOrServIndex] = useState(0)
  const [openModal, setOpenModal] = useState(false)
  const [schOrService, setSchOrService] = useState('')
  const [changeAddress, setChangeAddress] = useState(false)
  const [addressValue, setAddressValue] = useState('')
  const [features, setFeatures] = useState([])
  const [openTime, setOpenTime] = useState<any | null>('2014-08-18T12:00:00')
  const [closeTime, setCloseTime] = useState<any | null>('2014-08-18T12:00:00')
  const [openScheduleServiceModal, setOpenScheduleServiceModal] =
    useState(false)
  const [deletedInfo, setDeletedInfo] = useState(null)
  const [deleteConfirmation, setDeleteConfirmation] = useState(false)
  const [deleteSchorServConfirmation, setDeleteSchorServConfirmation] =
    useState(false)
  const [dashboardButtonClicked, setDashboardButtonClicked] = useState(false)
  const [checkBoxState, setCheckBoxState] = useState(
    initCategoriesState.map(i => false),
  )
  const handleOpenTimeChange = (newValue: Date | null, locIdx, schIdx) => {
    let formattedTime = String(newValue).slice(16, 21)
    setOpenTime(newValue)
    const temp = orgInfo
    temp.locations[locIdx].schedules[schIdx].open_time = formattedTime
    setOrgInfo({ ...temp })
  }
  const handleCloseTimeChange = (newValue: Date | null, locIdx, schIdx) => {
    let formattedTime = String(newValue).slice(16, 21)
    setCloseTime(newValue)
    const temp = orgInfo
    temp.locations[locIdx].schedules[schIdx].close_time = formattedTime
    setOrgInfo({ ...temp })
  }
  const logOut = async () => {
    const loggingOut: Response = await fetch('/api/logout')
    const logoutMessage = await loggingOut.json()
    if (logoutMessage.error) console.log('oh no!')
    else {
      console.log('oh yeah')
      push('/login')
    }
  }
  const buildDaysCheckBoxFromOrgInfo = (scheduleLocationId, scheduleId) => {
    const stateData: string =
      orgInfo.locations[scheduleLocationId].schedules[scheduleId].days
    const updatedCheckBoxInfo = initSmallDaysCheckBoxState.map(
      ({ name, checked }) => {
        const isChecked = stateData.includes(name)
        return { name: name, checked: isChecked }
      },
    )
    return updatedCheckBoxInfo
  }
  const isCheckboxChecked = (index, checked) => {
    setCheckBoxState(checkBoxState => {
      return checkBoxState.map((c, i) => {
        if (i === index) return checked
        return c
      })
    })
  }
  const isDaysCheckboxChecked = (index, wasChecked, locIdx, schIdx) => {
    const newDaysCheckBoxState = buildDaysCheckBoxFromOrgInfo(locIdx, schIdx)
    newDaysCheckBoxState[index].checked = wasChecked
    let daysChecked = newDaysCheckBoxState
      .filter(({ name, checked }) => checked)
      .map(({ name, checked }) => name)
    let daysCheckedToString = daysChecked.join(', ')
    const temp = orgInfo
    temp.locations[locIdx].schedules[schIdx].days = daysCheckedToString
    setOrgInfo({ ...temp })
  }
  const fetchOrgInfo = async () => {
    const postCBOsToPostgres: Response = await fetch('/api/postOrg', {
      method: POST,
      body: JSON.stringify(orgId),
    })
    const apiResponse = await postCBOsToPostgres.json()
    const newCategoryState = initCategoriesState.map((name, index) => {
      if (
        apiResponse.org?.multiple_categories.includes(
          name.categories_english.toLowerCase(),
        )
      )
        return true
      else return false
    })
    setCheckBoxState(newCategoryState)
    setDashboardButtonClicked(!dashboardButtonClicked)
    setOrgInfo(apiResponse.org)
    return { initCategoriesState }
  }
  const translateInfo = async (q, id, name): Promise<void> => {
    let splicer = id.slice(0, -7)
    const postTranslate: Response = await fetch(
      'https://libretranslate.de/translate',
      {
        method: POST,
        body: JSON.stringify({ q: q, source: 'en', target: 'es' }),
        headers: { 'Content-Type': 'application/json' },
      },
    )
    const apiResponse = await postTranslate.json()
    if (name == 'org') {
      setOrgInfo(info => ({
        ...info,
        //@ts-ignore
        [`${splicer}spanish`]: apiResponse.translatedText,
      }))
    }
    if (name == 'other') {
      const [finalKey, finalIdx, locProperty, locIdx] = id.split(';')
      let serviceSplicer = finalKey.slice(0, -7)
      const temp = orgInfo
      temp.locations[locIdx][locProperty][finalIdx][
        `${serviceSplicer}spanish`
      ] = apiResponse.translatedText
      setOrgInfo({ ...temp })
    }
    return apiResponse
  }
  const latLongConverter = async (query): Promise<void> => {
    const postLatLongConverter: Response = await fetch(
      `https://api.mapbox.com/geocoding/v5/mapbox.places/${query}.json?proximity=-119.71157,34.41503&autocomplete=${true}&access_token=${
        process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN
      }`,
    )
    const apiResponse = await postLatLongConverter.json()
    setFeatures(
      apiResponse.features.map(feature => {
        return { ...feature, label: feature.place_name }
      }),
    )
    return apiResponse
  }
  const handleBlur = e => {
    const { name, value, id } = e.target
    let isEnglishKey = id.includes('english')
    if (isEnglishKey) {
      if (name === 'org') {
        translateInfo(value, id, name)
      } else if (name === 'other') {
        translateInfo(value, id, name)
      }
    }
  }
  const handleAddressChange = async e => {
    const { value } = e.target
    setAddressValue(value)
    if (value.length > 2) {
      latLongConverter(value)
    }
  }
  const handleDeleteClick = (info, locationIndex) => {
    setDeletedInfo(info)
    setLocationIndex(locationIndex)
    setDeleteConfirmation(!deleteConfirmation)
  }
  const handleDeleteSchOrServClick = (
    schOrServ,
    info,
    id,
    locationIndex,
    schOrServIndex,
  ) => {
    setDeletedInfo(info)
    setSchOrService(schOrServ)
    setSchOrServIndex(schOrServIndex)
    setLocationID(id)
    setLocationIndex(locationIndex)
    setDeleteSchorServConfirmation(!deleteSchorServConfirmation)
  }
  const handleSelectedAddress = (selectedValue, locationIndex) => {
    if (selectedValue == null) {
      setChangeAddress(!changeAddress)
      return
    }
    setOrgInfo(info => {
      const tempLocValues = [...info.locations]
      const { center, place_name, context } = selectedValue
      tempLocValues[locationIndex] = {
        ...tempLocValues[locationIndex],
        ['address']: place_name.split(',')[0],
        ['city']: context[2].text,
        ['zip']: context[1].text,
      }
      return { ...info, locations: [...tempLocValues] }
    })
    setChangeAddress(!changeAddress)
  }
  const handleAddScheduleServiceClick = (schOrServ, locationID) => {
    setLocationID(locationID)
    setSchOrService(schOrServ)
    setOpenScheduleServiceModal(!openScheduleServiceModal)
  }
  const saveChanges = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault()
    console.log('org info 👍🏾', orgInfo)
    let categoryState_english = []
    let categoryState_spanish = []
    checkBoxState
    checkBoxState.map((bool, index) => {
      if (bool) {
        categoryState_english.push(
          initCategoriesState[index].categories_english.toLowerCase(),
        )
        categoryState_spanish.push(
          initCategoriesState[index].categories_spanish.toLowerCase(),
        )
      }
    })
    orgInfo.categories_english = categoryState_english
    orgInfo.categories_spanish = categoryState_spanish
    orgInfo
    const postCBOToPostgres: Response = await fetch(`/api/postUpdateCBOInfo`, {
      method: POST,
      body: JSON.stringify(orgInfo),
    })
    const apiResponse = await postCBOToPostgres.json()
    if (apiResponse.message == 'error') {
      setToast('Their was a problem saving your changes')
    } else {
      setToast('Your changes were saved successfully')
    }
  }
  const deleteLocation = async (): Promise<void> => {
    const postCBOToPostgres: Response = await fetch(`/api/postDeleteLocation`, {
      method: POST,
      body: JSON.stringify({
        locationInfo: deletedInfo,
        org_id: orgInfo.id,
        org_name: orgInfo.name_english,
      }),
    })
    const apiResponse = await postCBOToPostgres.json()
    if (apiResponse.message == 'error') {
      setToast('There was an error deleting the location')
    } else {
      let temp = orgInfo
      temp.locations.splice(locationIndex, 1)
      setDeleteConfirmation(!deleteConfirmation)
      setToast('You deleted a location successfully')
    }
  }
  const deleteSchedule = async (): Promise<void> => {
    const postCBOToPostgres: Response = await fetch(`/api/postDeleteSchedule`, {
      method: POST,
      body: JSON.stringify({
        info: deletedInfo,
        location_id: locationID,
        org_name: orgInfo.name_english,
      }),
    })
    const apiResponse = await postCBOToPostgres.json()
    if (apiResponse.message == 'error') {
      setToast(`There was an error deleting the schedule`)
    } else {
      const temp = orgInfo
      temp.locations[locationIndex].schedules.splice(schOrServIndex, 1)
      setDeleteSchorServConfirmation(!deleteSchorServConfirmation)
      setToast(`You deleted the item successfully`)
    }
  }
  const deleteService = async (): Promise<void> => {
    const postCBOToPostgres: Response = await fetch(`/api/postDeleteService`, {
      method: POST,
      body: JSON.stringify({
        info: deletedInfo,
        location_id: locationID,
        org_name: orgInfo.name_english,
      }),
    })
    const apiResponse = await postCBOToPostgres.json()
    if (apiResponse.message == 'error') {
      setToast(`There was an error deleting the service`)
    } else {
      const temp = orgInfo
      temp.locations[locationIndex].services.splice(schOrServIndex, 1)
      setDeleteSchorServConfirmation(!deleteSchorServConfirmation)
      setToast(`You deleted the item successfully`)
    }
  }
  const handleChange = async ({ target }: ChangeEvent<HTMLInputElement>) => {
    const { name, value, id } = target
    if (name === 'org') {
      setOrgInfo(info => ({ ...info, [id]: value }))
    } else if (name === 'org-tags') {
      const temp = value.split(',')
      setOrgInfo(info => ({ ...info, [id]: [...temp] }))
    } else if (name === 'loc') {
      const [locProperty, locIdx] = id.split(';')
      setOrgInfo(info => {
        const tempLocValues = [...info.locations]
        tempLocValues[locIdx] = {
          ...tempLocValues[locIdx],
          [locProperty]: value,
        }
        return { ...info, locations: [...tempLocValues] }
      })
    } else if (name === 'other') {
      const [finalKey, finalIdx, locProperty, locIdx] = id.split(';')
      const temp = orgInfo
      temp.locations[locIdx][locProperty][finalIdx][finalKey] = value
      setOrgInfo({ ...temp })
    }
  }
  if (!isVerified)
    return (
      <>
        <HeadTags
          title={`${siteTitle} | Organization Not Yet Verified`}
          href="/dashboard"
          description="A handy little place for you to manage your organization's information."
        />
        <span>
          You have not clicked on the verification email we sent you, please do
          so
        </span>
      </>
    )
  if (!orgId)
    return (
      <>
        <HeadTags
          title={`${siteTitle} | Organization Not Yet Connected`}
          href="/dashboard"
          description="A handy little place for you to manage your organization's information."
        />
        <span>
          You have verified your email, but we have not yet connected you to
          your org
        </span>
      </>
    )
  console.log('Org Info', orgInfo)
  return (
    <>
      <HeadTags
        title={`${siteTitle} | Organization Dashboard`}
        href="/dashboard"
        description="A handy little place for you to manage your organization's information."
      />
      <div style={{ margin: 'auto', textAlign: 'center', width: '100%' }}>
        {!orgInfo && (
          <Button
            style={{ width: '45rem', margin: 'auto' }}
            className={classes.greenButton}
            onClick={fetchOrgInfo}
          >
            <h3 style={{ padding: '1rem' }}>View Dashboard</h3>
          </Button>
        )}
        <form role="form" onSubmit={saveChanges}>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
            }}
          >
            <div
              style={{
                margin: '6rem',
              }}
            >
              {orgInfo && <h2>Welcome to your dashboard</h2>}
              {orgInfo &&
                Object.entries(orgInfo).map(([key, value], i) => {
                  if (
                    key == 'id' ||
                    key.includes('tags') ||
                    key.includes('tags')
                  )
                    return
                  if (key.includes('multiple')) {
                    return (
                      <FormGroup>
                        <h2
                          style={{
                            marginTop: '1.5rem',
                            marginBottom: '2rem',
                            textAlign: 'center',
                          }}
                        >
                          Categories
                        </h2>
                        <Grid
                          container
                          style={{ width: '41%', margin: 'auto' }}
                        >
                          {initCategoriesState?.map((item, index) => {
                            const { categories_english, checked } = item
                            return (
                              <Grid
                                item
                                md={6}
                                xs={12}
                                style={{
                                  textAlign: 'left',
                                }}
                              >
                                <FormControlLabel
                                  control={
                                    <Checkbox
                                      name={categories_english}
                                      value={checked}
                                      checked={checkBoxState[index]}
                                      onChange={e =>
                                        isCheckboxChecked(
                                          index,
                                          e.target.checked,
                                        )
                                      }
                                    />
                                  }
                                  label={categories_english}
                                />
                              </Grid>
                            )
                          })}
                        </Grid>
                      </FormGroup>
                    )
                  }
                  if (typeof value !== 'object')
                    return (
                      <div>
                        <Fragment key={i}>
                          <TextField
                            style={{ margin: '2rem 0 1rem 0', width: '45rem' }}
                            name="org"
                            id={key}
                            helperText={key}
                            inputProps={{ style: { fontSize: '1.6rem' } }}
                            InputLabelProps={{
                              style: { fontSize: '1.5rem', fontWeight: 'bold' },
                            }}
                            value={value as string}
                            onChange={handleChange}
                            onKeyUp={handleBlur}
                          />
                        </Fragment>
                      </div>
                    )
                  else if (
                    value instanceof Array &&
                    value[0].name !== undefined
                  ) {
                    console.log('value', value)
                    return (
                      <div
                        style={{
                          width: '47rem',
                          margin: 'auto',
                        }}
                      >
                        <div
                          style={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            marginTop: '4rem',
                          }}
                        >
                          <h2 style={{ marginBottom: '2rem' }}>Locations </h2>
                          <Button
                            style={{
                              alignSelf: 'flex-end',
                              alignItems: 'center',
                            }}
                            className={classes.greenButton}
                            onClick={() => setOpenModal(!openModal)}
                          >
                            <h4 style={{ padding: '1rem' }}>
                              {' '}
                              <AddIcon
                                style={{
                                  paddingTop: '.5rem',
                                  alignSelf: 'center',
                                }}
                              />
                              Add a location
                            </h4>
                          </Button>{' '}
                        </div>
                        {value.map((lVal, lkey, key) => {
                          return (
                            <div key={lkey} style={{ display: 'flex' }}>
                              <Accordion
                                style={{
                                  margin: '1.5rem 0',
                                  padding: '1rem',
                                }}
                              >
                                <AccordionSummary
                                  expandIcon={
                                    <ExpandMore
                                      style={{ marginRight: '2rem' }}
                                    />
                                  }
                                  aria-controls="panel3a-content"
                                  data-testid="accordion"
                                  id="panel3a-header"
                                >
                                  <h3>{`Location: ${lVal.name}`}</h3>
                                </AccordionSummary>
                                {Object.entries(lVal)
                                  .sort()
                                  .map(([locKey, locVal], i) => {
                                    if (
                                      locKey.includes('id') ||
                                      locKey.includes('tude') ||
                                      locKey.includes('state') ||
                                      locKey.includes('zip') ||
                                      locKey.includes('updatedAt')
                                    )
                                      return
                                    if (typeof locVal !== 'object')
                                      return (
                                        <>
                                          <AccordionDetails>
                                            <Fragment key={i}>
                                              {locKey == 'address' ||
                                              locKey == 'address_2' ||
                                              locKey == 'city' ||
                                              locKey == 'state' ||
                                              locKey == 'zip' ? (
                                                <>
                                                  {locKey == 'address' && (
                                                    <>
                                                      {!changeAddress ? (
                                                        <>
                                                          <p
                                                            style={{
                                                              display:
                                                                'inline-flex',
                                                            }}
                                                          >
                                                            Address: {locVal}
                                                          </p>
                                                          <Button
                                                            onClick={() =>
                                                              setChangeAddress(
                                                                !changeAddress,
                                                              )
                                                            }
                                                            className={
                                                              classes.greenButton
                                                            }
                                                            style={{
                                                              marginLeft:
                                                                '2rem',
                                                            }}
                                                          >
                                                            <h4
                                                              style={{
                                                                padding:
                                                                  '.5rem',
                                                              }}
                                                            >
                                                              Change Address
                                                            </h4>
                                                          </Button>
                                                        </>
                                                      ) : (
                                                        <Autocomplete
                                                          disablePortal
                                                          id="combo-box-demo"
                                                          value={addressValue}
                                                          options={[
                                                            addressValue,
                                                            ...features,
                                                          ]}
                                                          filterSelectedOptions
                                                          onChange={(
                                                            event,
                                                            selectedValue,
                                                          ) => {
                                                            handleSelectedAddress(
                                                              selectedValue,
                                                              //@ts-ignore
                                                              lkey,
                                                            )
                                                          }}
                                                          renderInput={params => (
                                                            <TextField
                                                              autoComplete="off"
                                                              value={
                                                                addressValue
                                                              }
                                                              onChange={
                                                                handleAddressChange
                                                              }
                                                              {...params}
                                                              label="Address"
                                                            />
                                                          )}
                                                        />
                                                      )}
                                                    </>
                                                  )}
                                                  {locKey == 'address_2' && (
                                                    <p>Address 2: {locVal}</p>
                                                  )}
                                                  {locKey == 'city' &&
                                                    !changeAddress && (
                                                      <p>City: {locVal}</p>
                                                    )}
                                                </>
                                              ) : (
                                                <>
                                                  {' '}
                                                  <TextField
                                                    style={{
                                                      margin: '2rem 0 1rem 0',
                                                      width: '45rem',
                                                    }}
                                                    name="loc"
                                                    id={`${locKey};${lkey}`}
                                                    helperText={locKey}
                                                    inputProps={{
                                                      style: {
                                                        fontSize: '1.6rem',
                                                      },
                                                    }}
                                                    value={locVal as string}
                                                    onChange={handleChange}
                                                  />
                                                </>
                                              )}
                                            </Fragment>
                                          </AccordionDetails>
                                        </>
                                      )
                                    else if (
                                      locVal !== null &&
                                      locVal !== undefined
                                    )
                                      //@ts-ignore
                                      return (
                                        <div style={{ display: 'inline' }}>
                                          <h3
                                            style={{
                                              marginBottom: '2rem',
                                            }}
                                          >
                                            {' '}
                                            {locKey == 'services'
                                              ? 'Services'
                                              : 'Schedules'}
                                          </h3>
                                          <Button
                                            className={classes.greenButton}
                                            onClick={() =>
                                              handleAddScheduleServiceClick(
                                                locKey,
                                                lVal.id,
                                              )
                                            }
                                          >
                                            <h4 style={{ padding: '1rem' }}>
                                              {' '}
                                              <AddIcon
                                                style={{
                                                  paddingTop: '.5rem',
                                                  alignSelf: 'center',
                                                }}
                                              />
                                              {locKey == 'services'
                                                ? 'Add a Service'
                                                : 'Add a Schedule'}
                                            </h4>
                                          </Button>{' '}
                                          {Object.values(locVal).map(
                                            (srvOrSchVal, i) => {
                                              if (srvOrSchVal?.days) {
                                                let standardTimeOpen =
                                                  timeConverter(
                                                    srvOrSchVal.open_time,
                                                  )
                                                let standardTimeClose =
                                                  timeConverter(
                                                    srvOrSchVal.close_time,
                                                  )
                                                let initState = {
                                                  open_time: standardTimeOpen,
                                                  close_time: standardTimeClose,
                                                }
                                                return (
                                                  <>
                                                    <LocalizationProvider
                                                      dateAdapter={DateAdapter}
                                                    >
                                                      <Accordion
                                                        style={{
                                                          display: 'block',
                                                          flexDirection:
                                                            'column',
                                                          justifyContent:
                                                            'center',
                                                          margin: '1.5rem',
                                                          padding: '1rem',
                                                        }}
                                                      >
                                                        <AccordionSummary
                                                          expandIcon={
                                                            <ExpandMore />
                                                          }
                                                          aria-controls="panel3a-content"
                                                          data-testid="accordion"
                                                          id="panel3a-header"
                                                        >
                                                          <>
                                                            <h3>
                                                              {locKey ==
                                                              'services'
                                                                ? `Service:  ${srvOrSchVal.name_english}`
                                                                : 'Schedules'}
                                                            </h3>
                                                            <Button
                                                              onClick={() =>
                                                                handleDeleteSchOrServClick(
                                                                  locKey,
                                                                  srvOrSchVal,
                                                                  lVal.id,
                                                                  lkey,
                                                                  i,
                                                                )
                                                              }
                                                              style={{
                                                                position:
                                                                  'absolute',
                                                                right: '3rem',
                                                              }}
                                                            >
                                                              <DeleteForeverIcon
                                                                style={{
                                                                  color: 'red',
                                                                  fontSize:
                                                                    '2rem',
                                                                }}
                                                              />
                                                            </Button>
                                                          </>
                                                        </AccordionSummary>
                                                        <h2
                                                          style={{
                                                            marginTop: '1.5rem',
                                                            marginBottom:
                                                              '2rem',
                                                            textAlign: 'center',
                                                          }}
                                                        >
                                                          Days
                                                        </h2>
                                                        <Grid
                                                          container
                                                          style={{
                                                            width: '41%',
                                                            margin: 'auto',
                                                          }}
                                                        >
                                                          <Grid>
                                                            <Grid
                                                              item
                                                              md={6}
                                                              xs={12}
                                                              style={{
                                                                textAlign:
                                                                  'left',
                                                              }}
                                                            >
                                                              <FormGroup>
                                                                {buildDaysCheckBoxFromOrgInfo(
                                                                  lkey,
                                                                  i,
                                                                ).map(
                                                                  (
                                                                    {
                                                                      name,
                                                                      checked,
                                                                    },
                                                                    dayIndex,
                                                                  ) => (
                                                                    <FormControlLabel
                                                                      control={
                                                                        <Checkbox
                                                                          name={
                                                                            name
                                                                          }
                                                                          value={`${name}_${checked}`}
                                                                          checked={
                                                                            checked
                                                                          }
                                                                          onChange={e =>
                                                                            isDaysCheckboxChecked(
                                                                              dayIndex,
                                                                              e
                                                                                .target
                                                                                .checked,
                                                                              lkey,
                                                                              i,
                                                                            )
                                                                          }
                                                                        />
                                                                      }
                                                                      label={
                                                                        name
                                                                      }
                                                                    />
                                                                  ),
                                                                )}
                                                              </FormGroup>
                                                            </Grid>
                                                          </Grid>
                                                        </Grid>
                                                        <h2
                                                          style={{
                                                            marginTop: '1.5rem',
                                                            marginBottom:
                                                              '2rem',
                                                            textAlign: 'center',
                                                          }}
                                                        >
                                                          Time
                                                        </h2>
                                                        <Grid container>
                                                          <Grid
                                                            item
                                                            xs={12}
                                                            md={6}
                                                          >
                                                            <TimePicker
                                                              label="Open Time"
                                                              value={
                                                                openTime ==
                                                                '2014-08-18T12:00:00'
                                                                  ? initState.open_time
                                                                  : openTime
                                                              }
                                                              onChange={e =>
                                                                handleOpenTimeChange(
                                                                  e,
                                                                  lkey,
                                                                  i,
                                                                )
                                                              }
                                                              renderInput={params => (
                                                                <TextField
                                                                  // required
                                                                  {...params}
                                                                />
                                                              )}
                                                            />
                                                          </Grid>
                                                          <Grid
                                                            item
                                                            xs={12}
                                                            md={6}
                                                          >
                                                            <TimePicker
                                                              label="Close Time"
                                                              value={
                                                                closeTime ==
                                                                '2014-08-18T12:00:00'
                                                                  ? initState.close_time
                                                                  : closeTime
                                                              }
                                                              onChange={e =>
                                                                handleCloseTimeChange(
                                                                  e,
                                                                  lkey,
                                                                  i,
                                                                )
                                                              }
                                                              renderInput={params => (
                                                                <TextField
                                                                  // required
                                                                  {...params}
                                                                />
                                                              )}
                                                            />
                                                          </Grid>
                                                          <TextField
                                                            style={{
                                                              margin:
                                                                '2rem 0 1rem 0',
                                                              width: '41rem',
                                                            }}
                                                            name="notes"
                                                            id={`notes;${i};${locKey};${lkey}`}
                                                            helperText={'Notes'}
                                                            inputProps={{
                                                              style: {
                                                                fontSize:
                                                                  '1.6rem',
                                                              },
                                                            }}
                                                            value={
                                                              srvOrSchVal.notes as string
                                                            }
                                                            onChange={
                                                              handleChange
                                                            }
                                                            onBlur={handleBlur}
                                                          />
                                                        </Grid>
                                                      </Accordion>
                                                    </LocalizationProvider>
                                                  </>
                                                )
                                              } else {
                                                return (
                                                  <div key={i}>
                                                    <Accordion
                                                      style={{
                                                        display: 'block',
                                                        flexDirection: 'column',
                                                        justifyContent:
                                                          'center',
                                                        margin: '1.5rem',
                                                        padding: '1rem',
                                                      }}
                                                    >
                                                      <AccordionSummary
                                                        expandIcon={
                                                          <ExpandMore />
                                                        }
                                                        aria-controls="panel3a-content"
                                                        data-testid="accordion"
                                                        id="panel3a-header"
                                                      >
                                                        <>
                                                          <h3>
                                                            {locKey ==
                                                            'services'
                                                              ? `Service:  ${srvOrSchVal.name_english}`
                                                              : 'Schedules'}
                                                          </h3>
                                                          <Button
                                                            onClick={() =>
                                                              handleDeleteSchOrServClick(
                                                                locKey,
                                                                srvOrSchVal,
                                                                lVal.id,
                                                                lkey,
                                                                i,
                                                              )
                                                            }
                                                            style={{
                                                              position:
                                                                'absolute',
                                                              right: '3rem',
                                                            }}
                                                          >
                                                            <DeleteForeverIcon
                                                              style={{
                                                                color: 'red',
                                                                fontSize:
                                                                  '2rem',
                                                              }}
                                                            />
                                                          </Button>
                                                        </>
                                                      </AccordionSummary>
                                                      {Object.entries(
                                                        srvOrSchVal,
                                                      ).map(
                                                        ([fKey, fVal], fI) => {
                                                          if (fKey === 'id')
                                                            return
                                                          return (
                                                            <div
                                                              style={{
                                                                display: 'flex',
                                                              }}
                                                            >
                                                              <AccordionDetails
                                                                key={fI}
                                                              >
                                                                <div
                                                                  style={{
                                                                    display:
                                                                      'flex',
                                                                  }}
                                                                  key={fI}
                                                                >
                                                                  <TextField
                                                                    style={{
                                                                      margin:
                                                                        '2rem 0 1rem 0',
                                                                      width:
                                                                        '41rem',
                                                                    }}
                                                                    name="other"
                                                                    id={`${fKey};${i};${locKey};${lkey}`}
                                                                    helperText={
                                                                      fKey as string
                                                                    }
                                                                    inputProps={{
                                                                      style: {
                                                                        fontSize:
                                                                          '1.6rem',
                                                                      },
                                                                    }}
                                                                    value={
                                                                      fVal as string
                                                                    }
                                                                    onChange={
                                                                      handleChange
                                                                    }
                                                                    onBlur={
                                                                      handleBlur
                                                                    }
                                                                  />
                                                                </div>
                                                              </AccordionDetails>
                                                            </div>
                                                          )
                                                        },
                                                      )}
                                                    </Accordion>
                                                  </div>
                                                )
                                              }
                                            },
                                          )}
                                        </div>
                                      )
                                  })}
                              </Accordion>
                              <Button
                                onClick={() => handleDeleteClick(lVal, lkey)}
                              >
                                <DeleteForeverIcon
                                  style={{
                                    color: 'red',
                                    fontSize: '2rem',
                                  }}
                                />
                              </Button>
                            </div>
                          )
                        })}
                      </div>
                    )
                  }
                })}
            </div>
            <div>
              {orgInfo && (
                <>
                  {' '}
                  <Button
                    style={{
                      display: 'block',
                      width: '45rem',
                      margin: 'auto',
                    }}
                    className={classes.greenButton}
                    type="submit"
                    //  disabled={!org || !website}
                  >
                    <h3 style={{ padding: '1rem' }}>Save Changes</h3>
                  </Button>
                  <br />
                  {/* <Button
                    style={{ display: 'block', width: '45rem', margin: 'auto' }}
                    className={classes.greenButton}
                    //  onClick={resetValues}
                  >
                    <h3 style={{ padding: '1rem' }}> Reset Values</h3>
                  </Button> */}
                </>
              )}
              <Button
                style={{ display: 'block', width: '45rem', margin: 'auto' }}
                className={classes.greenButton}
                onClick={logOut}
              >
                <h3 style={{ padding: '1rem' }}>Logout</h3>
              </Button>
            </div>
          </div>
        </form>
        {openModal && (
          <FormModal
            setOpenModal={setOpenModal}
            openModal={openModal}
            orgInfo={orgInfo}
            setOrgInfo={setOrgInfo}
          />
        )}
        {openScheduleServiceModal && (
          <ScheduleServiceModal
            setOpenScheduleServiceModal={setOpenScheduleServiceModal}
            openScheduleServiceModal={openScheduleServiceModal}
            orgInfo={orgInfo}
            schOrService={schOrService}
            setOrgInfo={setOrgInfo}
            locationID={locationID}
          />
        )}
        <>
          <Modal
            open={deleteSchorServConfirmation}
            onClose={() => setDeleteConfirmation(!deleteConfirmation)}
            aria-labelledby="parent-modal-title"
            aria-describedby="parent-modal-description"
          >
            <Box
              className={classes.modalStyle}
              style={{ width: 400, textAlign: 'center' }}
            >
              <h1 style={{ marginBottom: '3rem' }}>
                Are you sure you want to delete?
              </h1>
              <div style={{ margin: '1rem 0' }}>
                <Button
                  className={classes.greenButton}
                  style={{ width: '10rem' }}
                  onClick={
                    schOrService == 'services' ? deleteService : deleteSchedule
                  }
                >
                  <h4 style={{ padding: '1rem' }}>Yes</h4>
                </Button>
              </div>
              <Button
                className={classes.greenButton}
                style={{ width: '10rem' }}
                onClick={() =>
                  setDeleteSchorServConfirmation(!deleteSchorServConfirmation)
                }
              >
                <h4 style={{ padding: '1rem', display: 'block' }}>Cancel</h4>
              </Button>
            </Box>
          </Modal>
        </>
        <>
          <Modal
            open={deleteConfirmation}
            onClose={() => setDeleteConfirmation(!deleteConfirmation)}
            aria-labelledby="parent-modal-title"
            aria-describedby="parent-modal-description"
          >
            <Box
              className={classes.modalStyle}
              style={{ width: 400, textAlign: 'center' }}
            >
              <h1 style={{ marginBottom: '3rem' }}>
                Are you sure you want to delete?
              </h1>
              <div style={{ margin: '1rem 0' }}>
                <Button
                  className={classes.greenButton}
                  style={{ width: '10rem' }}
                  onClick={deleteLocation}
                >
                  <h4 style={{ padding: '1rem' }}>Yes</h4>
                </Button>
              </div>
              <Button
                className={classes.greenButton}
                style={{ width: '10rem' }}
                onClick={() => setDeleteConfirmation(!deleteConfirmation)}
              >
                <h4 style={{ padding: '1rem', display: 'block' }}>Cancel</h4>
              </Button>
            </Box>
          </Modal>
        </>
      </div>
    </>
  )
}
export default Dashboard
export const getServerSideProps: GetServerSideProps = async (
  ctx: GetServerSidePropsContext,
) => {
  let token: any
  if (ctx.req.headers.cookie) {
    const headers: { [name: string]: string } = ctx.req.headers.cookie
      .split(';')
      .reduce((obj, str) => {
        const split: string[] = str.split('=')
        obj[split[0].trim()] = split[1].trim()
        return obj
      }, {})
    if (headers['Auth-Token']) {
      const temp = verify(headers['Auth-Token'], process.env.JWT_SIGNATURE)
      const { exp } = temp as JwtPayload
      const expiryTime = exp * 1000
      if (expiryTime > Date.now()) token = temp
    }
  }
  if (!token || token?.type !== 'cbo')
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    }
  else
    return {
      props: {
        userId: token.id,
        isVerified: token.isVerified,
        orgId: token.orgId,
      },
    }
}
