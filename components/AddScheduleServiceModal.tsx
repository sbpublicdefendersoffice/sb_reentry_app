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
import { POST } from '../helpers/'
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
let initStateForService = {
  name_english: '',
  name_spanish: '',
}
export interface AddScheduleServiceFormProps {
  handleClose: any
  orgInfo: any
  setOrgInfo: any
  schOrService: String
  openScheduleServiceModal: any
  setOpenScheduleServiceModal: any
}
const AddScheduleServiceForm = ({
  handleClose,
  orgInfo,
  schOrService,
  openScheduleServiceModal,
  setOpenScheduleServiceModal,
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
      // stateValue.orgName = orgInfo?.name_english
      // stateValue.id = orgInfo?.id

      const postAddNewInfoToPostgres: Response = await fetch(
        '/api/postAddNewSchOrServ',
        {
          method: POST,
          body: JSON.stringify(stateValue),
        },
      )
      const apiResponse = await postAddNewInfoToPostgres.json()

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
            value={stateValue.open_time}
            name="open_time"
            // title={validWebsite}
            onChange={handleChange}
            style={{ marginTop: '1rem' }}
            // placeholder={`${someone}@gmail.com`}
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
            value={stateValue.close_time}
            name="close_time"
            // title={'Email'}
            onChange={handleChange}
            style={{ marginTop: '1rem' }}
            // placeholder={`${someone}@gmail.com`}
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
            value={stateValue.days}
            name="days"
            // title={validNotes}
            onChange={handleChange}
            style={{ marginTop: '1rem' }}
            // placeholder={`${someone}@gmail.com`}
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
            value={stateValue.notes}
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

export default AddScheduleServiceForm
