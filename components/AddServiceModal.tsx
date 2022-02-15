import React, { useState, FormEvent } from 'react'
import { Button, TextField } from '@mui/material'
import { POST } from '../helpers/'
import useForm from '../hooks/useForm'
import useToast from '../hooks/useToast'
import { useStyles } from '../constants'
import { validator } from '../helpers/formValidator'
let initState = {
  name_english: '',
  name_spanish: '',
  schOrService: '',
  org_name: '',
  org_id: '',
  locationID: '',
}
export interface AddScheduleServiceFormProps {
  handleClose: any
  orgInfo: any
  setOrgInfo: any
  openScheduleServiceModal: any
  setOpenScheduleServiceModal: any
  locationID: any
}
const AddServiceForm = ({
  handleClose,
  orgInfo,
  setOrgInfo,
  openScheduleServiceModal,
  setOpenScheduleServiceModal,
  locationID,
}: AddScheduleServiceFormProps) => {
  const classes = useStyles()
  const [state, setState] = useState(initState)
  const { setToast } = useToast()
  const submit = () => {
    console.log(' Submited')
  }
  let { handleChange, handleBlur, stateValue, errors } = useForm({
    initState,
    callback: submit,
    validator,
  })
  let { name_english, name_spanish } = state
  const translateInfo = async (q): Promise<void> => {
    const postTranslate: Response = await fetch(
      'https://libretranslate.de/translate',
      {
        method: POST,
        body: JSON.stringify({ q: q, source: 'en', target: 'es' }),
        headers: { 'Content-Type': 'application/json' },
      },
    )
    const apiResponse = await postTranslate.json()

    setState({ ...state, name_spanish: apiResponse.translatedText })
  }
  const handleTranslation = e => {
    const { value } = e.target
    translateInfo(value)
  }
  const addNewInfo = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault()
    const confirmWindow = window.confirm(
      'Are you sure you want to add this location?',
    )
    if (confirmWindow) {
      state.org_name = orgInfo?.name_english
      state.org_id = orgInfo?.id
      state.locationID = locationID
      const postAddNewInfoToPostgres: Response = await fetch(
        '/api/postAddNewService',
        {
          method: POST,
          body: JSON.stringify(state),
        },
      )
      const apiResponse = await postAddNewInfoToPostgres.json()

      const temp = orgInfo
      const findIndex = temp.locations.findIndex(x => x.id === locationID)
      temp.locations[findIndex].services.push(apiResponse)
      setOrgInfo({ ...temp })
      setOpenScheduleServiceModal(!openScheduleServiceModal)
      setToast('Your service was successfully added')
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
            Service Information
          </h1>
          <TextField
            //@ts-ignore
            value={name_english}
            name="name_english"
            // title={validWebsite}
            onChange={e => setState({ ...state, name_english: e.target.value })}
            style={{ marginTop: '1rem' }}
            placeholder={`Service Name English`}
            //@ts-ignore
            // error={errors.website ? true : false}
            //@ts-ignore
            // helperText={errors.website ? validWebsite : false}
            helperText={'Name English'}
            onBlur={handleTranslation}
            // required
          />
          <TextField
            //@ts-ignore
            value={name_spanish}
            name="name_spanish"
            // title={'Email'}
            onChange={e => setState({ ...state, name_spanish: e.target.value })}
            style={{ marginTop: '1rem' }}
            placeholder={`Service Name Spanish`}
            //@ts-ignore
            // error={errors.email ? true : false}
            //@ts-ignore
            // helperText={"errors.email ? validEmail : false"}
            helperText={'Name Spanish'}
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
export default AddServiceForm
