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
  org: '',
  email: '',
  pwd: '',
  confirmPwd: '',
  signupType: '',
}
function LocationModal() {
  const [open, setOpen] = useState(false)
  const classes = useStyles()

  const handleOpen = () => {
    setOpen(true)
  }
  const handleClose = () => {
    setOpen(false)
  }

  return (
    <Fragment>
      <div style={{ display: 'block' }}>
        <Button className={classes.greenButton} onClick={handleOpen}>
          <h4 style={{ padding: '1rem', display: 'block' }}>Save Changes</h4>
        </Button>
        <div>
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
      </div>
      <Modal
        hideBackdrop
        open={open}
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
            <h4 style={{ padding: '1rem', display: 'block' }}>Save Changes</h4>
          </Button>
          <div>
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
        </Box>
      </Modal>
    </Fragment>
  )
}

export default function NestedModal(openValue) {
  const [open, setOpen] = React.useState(openValue)
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
  const { handleChange, handleBlur, state, errors } = useFormFields({
    initState,
    callback: submit,
    validator,
  })
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
                  // value={org}
                  name="org"
                  onChange={handleChange}
                  // //@ts-ignore
                  // error={errors.org ? true : false}
                  //@ts-ignore
                  // helperText={errors.org ? invalidOrg : false}
                  style={{ marginTop: '1rem' }}
                  // onBlur={handleBlur}
                  // placeholder={orgName}
                />

                <TextField
                  // value={email}
                  name="email"
                  // title={validEmail}
                  onChange={handleChange}
                  // style={{ marginTop: '1rem' }}
                  // placeholder={`${someone}@gmail.com`}
                  //@ts-ignore
                  // error={errors.email ? true : false}
                  //@ts-ignore
                  // helperText={errors.email ? validEmail : false}
                  // onBlur={handleBlur}
                  // required
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
                  onClick={handleClose}
                >
                  <h4 style={{ padding: '1rem' }}>Cancel</h4>
                </Button>
              </div>
            </form>
          </>
          <LocationModal />
        </Box>
      </Modal>
    </div>
  )
}
