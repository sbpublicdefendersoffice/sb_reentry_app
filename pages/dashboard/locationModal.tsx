import React, { useState, Fragment } from 'react'
import {
  Button,
  TextField,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Modal,
  Box,
} from '@mui/material'
import { useFormFields } from '../../hooks/'
import { useStyles } from '../../constants'
import { validator } from '../../helpers/formValidator'
import { textAlign } from '@mui/system'
const initState = {
  name: '',
  address: '',
  address2: '',
  city: '',
  state: '',
  zip: '',
}
export default function NestedModal(openValue, setOpenLocationModal) {
  const [open, setOpen] = React.useState(openValue)
  const [openConfirmModal, setOpenConfirmModal] = useState(false)
  const classes = useStyles()
  const handleOpen = () => {
    setOpen(true)
  }
  const handleClose = () => {
    setOpen(false)
  }
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
    address2,
    city,
    state,
    zip,
    phone,
    website,
    email,
    notes,
  } = stateValue
  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
      >
        <Box className={classes.modalStyle} sx={{ width: 400 }}>
          <>
            <form
              role="form"
              //  onSubmit={handleSubmit}
            >
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  margin: '4rem 2rem',
                }}
              >
                {/* <h1>{signup}</h1> */}

                <TextField
                  value={name}
                  name="name"
                  onChange={handleChange}
                  //@ts-ignore
                  error={errors.name ? true : false}
                  //@ts-ignore
                  helperText={errors.name ? invalidOrg : false}
                  style={{ marginTop: '1rem' }}
                  onBlur={handleBlur}
                  placeholder={name}
                />

                <TextField
                  value={address}
                  name="address"
                  // title={validAddress}
                  onChange={handleChange}
                  style={{ marginTop: '1rem' }}
                  // placeholder={`${someone}@gmail.com`}
                  //@ts-ignore
                  error={errors.address ? true : false}
                  //@ts-ignore
                  // helperText={errors.address ? validAddress : false}
                  onBlur={handleBlur}
                  required
                />
                <TextField
                  value={address2}
                  name="address2"
                  // title={validAddress}
                  onChange={handleChange}
                  style={{ marginTop: '1rem' }}
                  // placeholder={`${someone}@gmail.com`}
                  //@ts-ignore
                  error={errors.address2 ? true : false}
                  //@ts-ignore
                  // helperText={errors.address2 ? validAddress2 : false}
                  onBlur={handleBlur}
                  required
                />
                <TextField
                  value={city}
                  name="city"
                  // title={validCity}
                  onChange={handleChange}
                  style={{ marginTop: '1rem' }}
                  // placeholder={`${someone}@gmail.com`}
                  //@ts-ignore
                  error={errors.city ? true : false}
                  //@ts-ignore
                  // helperText={errors.address ? validAddress : false}
                  onBlur={handleBlur}
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
                  error={errors.state ? true : false}
                  //@ts-ignore
                  // helperText={errors.state ? validState : false}
                  onBlur={handleBlur}
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
                  error={errors.zip ? true : false}
                  //@ts-ignore
                  // helperText={errors.zip ? validZip : false}
                  onBlur={handleBlur}
                  required
                />
                <TextField
                  value={phone}
                  name="phone"
                  // title={validAddress}
                  onChange={handleChange}
                  style={{ marginTop: '1rem' }}
                  // placeholder={`${someone}@gmail.com`}
                  //@ts-ignore
                  error={errors.phone ? true : false}
                  //@ts-ignore
                  // helperText={errors.phone ? validPhone : false}
                  onBlur={handleBlur}
                  required
                />
                <TextField
                  value={website}
                  name="website"
                  // title={validWebsite}
                  onChange={handleChange}
                  style={{ marginTop: '1rem' }}
                  // placeholder={`${someone}@gmail.com`}
                  //@ts-ignore
                  error={errors.website ? true : false}
                  //@ts-ignore
                  // helperText={errors.website ? validWebsite : false}
                  onBlur={handleBlur}
                  required
                />
                <TextField
                  value={email}
                  name="email"
                  // title={validWebsite}
                  onChange={handleChange}
                  style={{ marginTop: '1rem' }}
                  // placeholder={`${someone}@gmail.com`}
                  //@ts-ignore
                  error={errors.email ? true : false}
                  //@ts-ignore
                  // helperText={errors.email ? validEmail : false}
                  onBlur={handleBlur}
                  required
                />
                <TextField
                  value={notes}
                  name="notes"
                  // title={validNotes}
                  onChange={handleChange}
                  style={{ marginTop: '1rem' }}
                  // placeholder={`${someone}@gmail.com`}
                  //@ts-ignore
                  error={errors.notes ? true : false}
                  //@ts-ignore
                  // helperText={errors.notes ? validNotes : false}
                  onBlur={handleBlur}
                  required
                />
                <hr style={{ margin: '2rem' }} />

                {/* <Button
                  className={
                    // isValidForm && pwd === confirmPwd
                    classes.greenButton
                    // : classes.disabledButton
                  }
                  type="submit"
                  onClick={handleOpen}
                  // disabled={!isValidForm || pwd !== confirmPwd}
                >
                  <h4 style={{ padding: '1rem' }}>Save</h4>
                </Button> */}
                <Button
                  style={{
                    margin: '1rem 0 1rem 0',
                  }}
                  className={classes.greenButton}
                  onClick={() => setOpenConfirmModal(!openConfirmModal)}
                >
                  <h4 style={{ padding: '1rem' }}>Save</h4>
                </Button>
                <Button
                  style={{
                    margin: '1rem 0 1rem 0',
                  }}
                  className={classes.greenButton}
                  onClick={() => setOpen(!open)}
                >
                  <h4 style={{ padding: '1rem' }}>Cancel</h4>
                </Button>
              </div>
            </form>
          </>
          <Modal
            hideBackdrop
            open={openConfirmModal}
            onClose={handleClose}
            aria-labelledby="child-modal-title"
            aria-describedby="child-modal-description"
          >
            <Box
              className={classes.modalStyle}
              sx={{
                display: 'block',
                width: 200,
                padding: '1rem',
                justifyContent: 'center',
              }}
            >
              <h3 style={{ textAlign: 'center', marginBottom: '2rem' }}>
                Are you sure you want to save these changes?
              </h3>
              <Button className={classes.greenButton} onClick={handleOpen}>
                <h4 style={{ padding: '1rem', display: 'block' }}>
                  Save Changes
                </h4>
              </Button>
              <div>
                <Button
                  style={{
                    margin: '1rem 0 1rem 0',
                  }}
                  className={classes.greenButton}
                  onClick={() => setOpen(!open)}
                >
                  <h4 style={{ padding: '1rem' }}>Cancel</h4>
                </Button>
              </div>
            </Box>
          </Modal>
        </Box>
      </Modal>
    </div>
  )
}
