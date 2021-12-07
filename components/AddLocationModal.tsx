import React, { useState, FormEvent } from 'react'
import { Button, TextField } from '@mui/material'
import { POST } from '../helpers/'
import { useFormFields } from '../hooks'
import { useStyles } from '../constants'
import { validator } from '../helpers/formValidator'
import { textAlign } from '@mui/system'

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
  const [latitudeValue, setLatitudeValue] = useState(0)
  const [longitudeValue, setLongitudeValue] = useState(0)
  const submit = () => {
    console.log(' Submited')
  }
  const { handleChange, handleBlur, stateValue, errors } = useFormFields({
    initState,
    callback: submit,
    validator,
  })
  const {
    name,
    address,
    address_2,
    city,
    state,
    zip,
    email,
    phone,
    website,
    notes,
  } = stateValue

  const latLongConverter = async (query): Promise<void> => {
    const postLatLongConverter: Response = await fetch(
      `https://api.mapbox.com/geocoding/v5/mapbox.places/${query}.json?proximity=-119.71157,34.41503&access_token=${process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN}`,
    )
    const apiResponse = await postLatLongConverter.json()

    setLatitudeValue(apiResponse.features[0].center[1])

    setLongitudeValue(apiResponse.features[0].center[0])

    return apiResponse
  }
  const handleAddressChange = async e => {
    const { value } = e.target
    console.log('value:', value)

    latLongConverter(value)
  }
  const addNewInfo = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault()
    const confirmWindow = window.confirm(
      'Are you sure you want to add this location?',
    )
    if (confirmWindow) {
      stateValue.orgName = orgInfo?.name_english
      stateValue.id = orgInfo?.id
      stateValue.latitude = latitudeValue
      stateValue.longitude = longitudeValue

      const postAddNewInfoToPostgres: Response = await fetch(
        '/api/postAddNewInfo',
        {
          method: POST,
          body: JSON.stringify(stateValue),
        },
      )
      const apiResponse = await postAddNewInfoToPostgres.json()
      console.log(
        '🚀 ~ file: AddLocationModal.tsx ~ line 95 ~ addNewInfo ~ apiResponse',
        apiResponse,
      )

      handleClose()
    }
  }

  return (
    <div>
      {' '}
      <form role="form" onSubmit={addNewInfo}>
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
            placeholder={name}
            helperText={'Name'}
          />

          <TextField
            value={address}
            name="address"
            // title={validAddress}
            onChange={handleChange}
            style={{ marginTop: '1rem' }}
            // placeholder={`${someone}@gmail.com`}
            //@ts-ignore
            // error={errors.address ? true : false}
            //@ts-ignore
            // helperText={errors.address ? validAddress : false}
            helperText={'Address'}
            onBlur={handleAddressChange}
            required
          />
          <TextField
            value={address_2}
            name="address_2"
            // title={validAddress}
            onChange={handleChange}
            style={{ marginTop: '1rem' }}
            // placeholder={`${someone}@gmail.com`}
            //@ts-ignore
            // error={errors.address_2 ? true : false}
            //@ts-ignore
            helperText={'Address 2'}
            // helperText={errors.address2 ? validAddress2 : false}
            // onBlur={handleBlur}
            // required
          />
          <TextField
            value={city}
            name="city"
            // title={validCity}
            onChange={handleChange}
            style={{ marginTop: '1rem' }}
            // placeholder={`${someone}@gmail.com`}
            //@ts-ignore
            // error={errors.city ? true : false}
            //@ts-ignore
            // helperText={errors.address ? validAddress : false}
            helperText={'City'}
            // onBlur={handleBlur}
            required
          />
          <TextField
            value={state}
            name="state"
            // title={validState}
            onChange={handleChange}
            style={{ marginTop: '1rem' }}
            // placeholder={`${someone}@gmail.com`}
            //@ts-ignore
            // error={errors.state ? true : false}
            //@ts-ignore
            // helperText={errors.state ? validState : false}
            helperText={'State'}
            // onBlur={handleBlur}
            required
          />
          <TextField
            value={zip}
            name="zip"
            // title={validZip}
            onChange={handleChange}
            style={{ marginTop: '1rem' }}
            // placeholder={`${someone}@gmail.com`}
            //@ts-ignore
            // error={errors.zip ? true : false}
            //@ts-ignore
            // helperText={errors.zip ? validZip : false}
            helperText={'Zip'}
            // onBlur={handleBlur}
            // required
          />
          <TextField
            value={phone}
            name="phone"
            // title={validAddress}
            onChange={handleChange}
            style={{ marginTop: '1rem' }}
            // placeholder={`${someone}@gmail.com`}
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
            // placeholder={`${someone}@gmail.com`}
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
            // placeholder={`${someone}@gmail.com`}
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
            // placeholder={`${someone}@gmail.com`}
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
