import React, { useState, FormEvent } from 'react'
import { Button, TextField, Autocomplete } from '@mui/material'
import { POST } from '../helpers/'
import useForm from '../hooks/useForm'
import useToast from '../hooks/useToast'
import { useStyles } from '../constants'
import { validator } from '../helpers/formValidator'
const initState = {
  name: '',
  address: '',
  address_2: '',
  city: '',
  state: '',
  zip: '',
  email: '',
  website: '',
  phone: '',
  notes: '',
}
export interface AddLocationFormProps {
  handleClose: any
  orgInfo: any
  setOrgInfo: any
}
const AddLocationForm = ({
  handleClose,
  orgInfo,
  setOrgInfo,
}: AddLocationFormProps) => {
  const classes = useStyles()
  const [addressValue, setAddressValue] = useState('')
  const [features, setFeatures] = useState([])
  const [addressInfo, setAddressInfo] = useState(null)
  const { setToast } = useToast()
  const submit = () => {
    console.log(' Submited')
  }
  const { handleChange, handleBlur, stateValue, errors } = useForm({
    initState,
    callback: submit,
    validator,
  })
  const { name, address_2, email, phone, website, notes } = stateValue
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
  const handleAddressChange = async e => {
    const { value } = e.target
    setAddressValue(value)
    if (value.length > 2) {
      latLongConverter(value)
    }
  }
  const addNewInfo = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault()
    const confirmWindow = window.confirm(
      'Are you sure you want to add this location?',
    )
    if (confirmWindow) {
      stateValue.orgName = orgInfo?.name_english
      stateValue.id = orgInfo?.id
      stateValue.latitude = addressInfo.center[1]
      stateValue.longitude = addressInfo.center[0]
      stateValue.address = addressInfo.place_name.split(',')[0]
      stateValue.city = addressInfo.context[2].text
      stateValue.zip = addressInfo.context[1].text
      stateValue.state = addressInfo.context[4].text
        .toUpperCase()
        .substring(0, 2)
      const postAddNewInfoToPostgres: Response = await fetch(
        '/api/postAddNewLocation',
        {
          method: POST,
          body: JSON.stringify(stateValue),
        },
      )
      const apiResponse = await postAddNewInfoToPostgres.json()
      setOrgInfo(info => {
        const tempLocValues = [...info.locations]
        tempLocValues.push({ ...apiResponse, schedules: [], services: [] })
        return {
          ...info,
          locations: [...tempLocValues],
        }
      })
      handleClose()
      setToast('You successfully added your location')
    }
  }
  return (
    <div>
      {' '}
      <form role="form" autoComplete="none" onSubmit={addNewInfo}>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            margin: '4rem 2rem',
          }}
        >
          <h1 style={{ textAlign: 'center', marginBottom: '1rem' }}>
            {'Location Information'}
          </h1>
          <TextField
            value={name}
            name="name"
            onChange={handleChange}
            //@ts-ignore
            // error={errors.name ? true : false}
            //@ts-ignore
            // helperText={errors.name ? invalidOrg : false}
            style={{ marginTop: '1rem' }}
            // onBlur={handleBlur}
            placeholder={'Name of Location'}
            helperText={'Name'}
          />
          <Autocomplete
            disablePortal
            id="combo-box-demo"
            value={addressValue}
            options={[addressValue, ...features]}
            filterSelectedOptions
            // sx={{ width: 300 }}
            onChange={(event, selectedValue) => {
              setAddressValue(selectedValue?.place_name)
              setAddressInfo(selectedValue)
            }}
            renderInput={params => (
              <TextField
                autoComplete="off"
                value={addressValue}
                onChange={handleAddressChange}
                {...params}
                label="Address"
              />
            )}
          />
          <TextField
            value={address_2}
            name="address_2"
            // title={validAddress}
            onChange={handleChange}
            style={{ marginTop: '1rem' }}
            placeholder={`i.e. suite, office or building number`}
            //@ts-ignore
            // error={errors.address_2 ? true : false}
            //@ts-ignore
            helperText={'Address 2'}
          />

          <TextField
            value={phone}
            name="phone"
            // title={validAddress}
            onChange={handleChange}
            style={{ marginTop: '1rem' }}
            placeholder={`Phone`}
            //@ts-ignore
            // error={errors.phone ? true : false}
            //@ts-ignore
            // helperText={errors.phone ? validPhone : false}
            helperText={'Phone'}
            // onBlur={handleBlur}
            // required
          />
          <TextField
            value={website}
            name="website"
            // title={validWebsite}
            onChange={handleChange}
            style={{ marginTop: '1rem' }}
            placeholder={`Website`}
            //@ts-ignore
            // error={errors.website ? true : false}
            //@ts-ignore
            // helperText={errors.website ? validWebsite : false}
            helperText={'Website'}
            // onBlur={handleBlur}
            // required
          />
          <TextField
            value={email}
            name="email"
            // title={'Email'}
            onChange={handleChange}
            style={{ marginTop: '1rem' }}
            placeholder={`Email`}
            //@ts-ignore
            // error={errors.email ? true : false}
            //@ts-ignore
            // helperText={"errors.email ? validEmail : false"}
            helperText={'Email'}
            // onBlur={handleBlur}
            // required
          />
          <TextField
            value={notes}
            name="notes"
            // title={validNotes}
            onChange={handleChange}
            style={{ marginTop: '1rem' }}
            placeholder={`Notes`}
            //@ts-ignore
            // error={errors.notes ? true : false}
            //@ts-ignore
            helperText={'Notes'}
            // helperText={errors.notes ? validNotes : false}
            // onBlur={handleBlur}
            // required
          />
          <hr style={{ margin: '2rem' }} />
          <Button
            style={{
              margin: '1rem 0 1rem 0',
            }}
            className={classes.greenButton}
            type="submit"
          >
            <h4 style={{ padding: '1rem' }}>Save Changes</h4>
          </Button>
          <Button
            style={{
              margin: '1rem 0 1rem 0',
            }}
            className={classes.greenButton}
            onClick={handleClose}
          >
            <h4 style={{ padding: '1rem' }}>Cancel</h4>
          </Button>
        </div>
      </form>
    </div>
  )
}
export default AddLocationForm
