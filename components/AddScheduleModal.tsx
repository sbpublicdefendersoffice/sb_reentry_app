import React, { useState, Fragment, FormEvent } from 'react'
import {
  Button,
  TextField,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Modal,
  Box,
} from '@mui/material'
import { POST } from '../helpers'
import { useFormFields } from '../hooks'
import { useStyles } from '../constants'
import { validator } from '../helpers/formValidator'
import { textAlign } from '@mui/system'
import { InviteInstance } from 'twilio/lib/rest/chat/v1/service/channel/invite'
// import AddConfirmationModal from './AddConfirmationModal'
let initState = {
  open_time: '',
  close_time: '',
  days: '',
  notes: '',
}
export interface AddScheduleServiceFormProps {
  handleClose: any
  orgInfo: any
  setOrgInfo: any
  schOrService: any
  openScheduleServiceModal: any
  setOpenScheduleServiceModal: any
  locationID: any
  locationIndex: any
}
const AddScheduleForm = ({
  handleClose,
  orgInfo,
  schOrService,
  setOrgInfo,
  openScheduleServiceModal,
  setOpenScheduleServiceModal,
  locationID,
  locationIndex,
}: AddScheduleServiceFormProps) => {
  const classes = useStyles()
  const submit = () => {
    console.log(' Submited')
  }
  let { handleChange, handleBlur, stateValue, errors } = useFormFields({
    initState,
    callback: submit,
    validator,
  })
  const { open_time, close_time, days, notes } = stateValue
  const addNewInfo = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault()
    const confirmWindow = window.confirm(
      'Are you sure you want to add this location?',
    )
    stateValue.schOrService = schOrService
    if (confirmWindow) {
      stateValue.org_name = orgInfo?.name_english
      stateValue.org_id = orgInfo?.id
      stateValue.locationID = locationID
      const postAddNewInfoToPostgres: Response = await fetch(
        '/api/postAddNewSchOrServ',
        {
          method: POST,
          body: JSON.stringify(stateValue),
        },
      )
      const apiResponse = await postAddNewInfoToPostgres.json()
      const temp = orgInfo
      temp.locations[locationIndex].schedules.push(apiResponse)
      setOrgInfo({ ...temp })
      setOpenScheduleServiceModal(!openScheduleServiceModal)
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
            Schedule Information
          </h1>
          <TextField
            //@ts-ignore
            value={open_time}
            name="open_time"
            // title={validWebsite}
            onChange={handleChange}
            style={{ marginTop: '1rem' }}
            placeholder={`Open Time`}
            //@ts-ignore
            // error={errors.website ? true : false}
            //@ts-ignore
            // helperText={errors.website ? validWebsite : false}
            helperText={'Open Time'}
            // onBlur={handleBlur}
            // required
          />
          <TextField
            //@ts-ignore
            value={close_time}
            name="close_time"
            // title={'Email'}
            onChange={handleChange}
            style={{ marginTop: '1rem' }}
            placeholder={`Close Time`}
            //@ts-ignore
            // error={errors.email ? true : false}
            //@ts-ignore
            // helperText={"errors.email ? validEmail : false"}
            helperText={'Close Time'}
            // onBlur={handleBlur}
            // required
          />
          <TextField
            //@ts-ignore
            value={days}
            name="days"
            // title={validNotes}
            onChange={handleChange}
            style={{ marginTop: '1rem' }}
            placeholder={`Days`}
            //@ts-ignore
            // error={errors.notes ? true : false}
            //@ts-ignore
            helperText={'Days'}
            // helperText={errors.notes ? validNotes : false}
            // onBlur={handleBlur}
            // required
          />
          <TextField
            //@ts-ignore
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
export default AddScheduleForm
