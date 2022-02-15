import sendGrid, { MailDataRequired } from '@sendgrid/mail'
import { POST } from '../../../helpers'

import React, { useState } from 'react'
import {
  Button,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
  DialogActions,
} from '@mui/material'

import styles from './ModalUpdateSchedReq.module.css'
import DayInput from './DayInput/DayInput'

const ModalUpdateSchedReq = ({ isOpen, onClose, location }) => {
  const [monday, setMonday] = useState({
    open: '00:00',
    close: '00:00',
  })
  const [tuesday, setTuesday] = useState({
    open: '00:00',
    close: '00:00',
  })
  const [wednesday, setWednesday] = useState({
    open: '00:00',
    close: '00:00',
  })
  const [thursday, setThursday] = useState({
    open: '00:00',
    close: '00:00',
  })
  const [friday, setFriday] = useState({
    open: '00:00',
    close: '00:00',
  })
  const [saturday, setSaturday] = useState({
    open: '00:00',
    close: '00:00',
  })
  const [sunday, setSunday] = useState({
    open: '00:00',
    close: '00:00',
  })

  const handleSubmit = async () => {
    const confirmWindow = window.confirm(
      'Are you sure you want to update the schedule?',
    )

    if (confirmWindow) {
      const weeklySchedule = {
        monday,
        tuesday,
        wednesday,
        thursday,
        friday,
        saturday,
        sunday,
        location,
      }

      const postDelLocationReqest: Response = await fetch(
        '/api/postEditScheduleRequest',
        {
          method: POST,
          body: JSON.stringify(weeklySchedule),
        },
      )

      const requestResponse = await postDelLocationReqest.json()

      if (requestResponse.error) console.log('error in sending request')
      else {
        onClose()
      }
    }
  }

  return (
    <div>
      <Dialog open={isOpen} onClose={onClose} fullWidth={true}>
        <DialogTitle>New Schedule Request</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please enter your new weekly Schedule
          </DialogContentText>
          <DayInput label={'Monday'} day={monday} setDay={setMonday} />
          <DayInput label={'Tuesday'} day={tuesday} setDay={setTuesday} />
          <DayInput label={'Wednesday'} day={wednesday} setDay={setWednesday} />
          <DayInput label={'Thursday'} day={thursday} setDay={setThursday} />
          <DayInput label={'Friday'} day={friday} setDay={setFriday} />
          <DayInput label={'Saturday'} day={saturday} setDay={setSaturday} />
          <DayInput label={'Sunday'} day={sunday} setDay={setSunday} />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => handleSubmit()}>Submit</Button>
          <Button onClick={onClose}>Cancel</Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}
export default ModalUpdateSchedReq
