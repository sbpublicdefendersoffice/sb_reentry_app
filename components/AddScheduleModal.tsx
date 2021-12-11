import React, { FormEvent, useState } from 'react'
import { Button, TextField } from '@mui/material'
import { POST } from '../helpers'
import useForm from '../hooks/useForm'
import useToast from '../hooks/useToast'
import { useStyles } from '../constants'
import { validator } from '../helpers/formValidator'
import TimePicker from '@mui/lab/TimePicker'
import DateAdapter from '@mui/lab/AdapterMoment'
import FormGroup from '@mui/material/FormGroup'
import FormControlLabel from '@mui/material/FormControlLabel'
import Checkbox from '@mui/material/Checkbox'
import Grid from '@mui/material/Grid'
import LocalizationProvider from '@mui/lab/LocalizationProvider'
let initState = {
  open_time: '',
  close_time: '',
  days: '',
  notes: '',
}
let initCheckBoxState = [
  { name: 'Everyday', checked: false },
  { name: 'Mon - Fri', checked: false },
  { name: 'Sun', checked: false },
  { name: 'Mon', checked: false },
  { name: 'Tue', checked: false },
  { name: 'Wed', checked: false },
  { name: 'Thu', checked: false },
  { name: 'Fri', checked: false },
  { name: 'Sat', checked: false },
]
export interface AddScheduleServiceFormProps {
  handleClose: any
  orgInfo: any
  setOrgInfo: any
  schOrService: any
  openScheduleServiceModal: any
  setOpenScheduleServiceModal: any
  locationID: any
}
const AddScheduleForm = ({
  handleClose,
  orgInfo,
  schOrService,
  setOrgInfo,
  openScheduleServiceModal,
  setOpenScheduleServiceModal,
  locationID,
}: AddScheduleServiceFormProps) => {
  const classes = useStyles()
  const [checkBoxState, setCheckBoxState] = useState(
    initCheckBoxState.map(i => false),
  )
  let daysString = ''
  const [openTime, setOpenTime] = React.useState<Date | null>(
    new Date('2014-08-18T12:00:00'),
  )
  const [closeTime, setCloseTime] = React.useState<Date | null>(
    new Date('2014-08-18T12:00:00'),
  )
  const isCheckboxChecked = (index, checked) => {
    if (index == 1 && checked == true) {
      setCheckBoxState([
        false,
        true,
        false,
        true,
        true,
        true,
        true,
        true,
        false,
      ])
    }
    if (index == 0 && checked == true) {
      setCheckBoxState([true, false, true, true, true, true, true, true, true])
    }
    setCheckBoxState(checkBoxState => {
      return checkBoxState.map((c, i) => {
        if (i === index) return checked
        return c
      })
    })
  }
  const { setToast } = useToast()
  const submit = () => {
    console.log(' Submited')
  }
  let { handleChange, handleBlur, stateValue, errors } = useForm({
    initState,
    callback: submit,
    validator,
  })
  const { notes } = stateValue
  const handleOpenTimeChange = (newValue: Date | null) => {
    setOpenTime(newValue)
  }
  const handleCloseTimeChange = (newValue: Date | null) => {
    setCloseTime(newValue)
  }
  const addNewInfo = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault()
    const confirmWindow = window.confirm(
      'Are you sure you want to add this schedule?',
    )
    stateValue.schOrService = schOrService
    if (confirmWindow) {
      checkBoxState.map((bool, index) => {
        if (bool == true && index !== 0 && index !== 1) {
          daysString += initCheckBoxState[index].name + ', '
        }
      })
      stateValue.org_name = orgInfo?.name_english
      stateValue.org_id = orgInfo?.id
      stateValue.locationID = locationID
      const militaryOpenTime = String(openTime).slice(15, 21)
      const militaryCloseTime = String(closeTime).slice(15, 21)
      const finalDaysString = daysString.replace(/,\s*$/, '')
      stateValue.open_time = militaryOpenTime
      stateValue.close_time = militaryCloseTime
      stateValue.days = finalDaysString
      const postAddNewInfoToPostgres: Response = await fetch(
        '/api/postAddNewSchOrServ',
        {
          method: POST,
          body: JSON.stringify(stateValue),
        },
      )
      const apiResponse = await postAddNewInfoToPostgres.json()
      const temp = orgInfo
      const findIndex = temp.locations.findIndex(x => x.id === locationID)
      temp.locations[findIndex].schedules.push(apiResponse)
      setOrgInfo({ ...temp })
      setOpenScheduleServiceModal(!openScheduleServiceModal)
      setToast('You successfully added your schedule')
    }
  }
  return (
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      {' '}
      <form role="form" onSubmit={addNewInfo}>
        <LocalizationProvider dateAdapter={DateAdapter}>
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
            <TimePicker
              label="Open Time"
              value={openTime}
              onChange={handleOpenTimeChange}
              renderInput={params => <TextField required {...params} />}
            />
            <TimePicker
              label="Close Time"
              value={closeTime}
              onChange={handleCloseTimeChange}
              renderInput={params => (
                <TextField required style={{ marginTop: '1rem' }} {...params} />
              )}
            />
            <FormGroup>
              <h1 style={{ marginTop: '1.5rem', textAlign: 'center' }}>
                Days Open
              </h1>
              <Grid container>
                {initCheckBoxState.map((day, index) => {
                  return (
                    <Grid item md={6} xs={12}>
                      <FormControlLabel
                        control={
                          <Checkbox
                            name={day.name}
                            value={day.checked}
                            checked={checkBoxState[index]}
                            onChange={e =>
                              isCheckboxChecked(index, e.target.checked)
                            }
                          />
                        }
                        label={day.name}
                      />
                    </Grid>
                  )
                })}
              </Grid>
            </FormGroup>
            <TextField
              value={notes}
              name="notes"
              onChange={handleChange}
              style={{ marginTop: '1rem' }}
              placeholder={`Notes`}
              helperText={'Notes'}
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
        </LocalizationProvider>
      </form>
    </div>
  )
}
export default AddScheduleForm
