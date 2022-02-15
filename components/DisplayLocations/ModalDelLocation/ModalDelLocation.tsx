import sendGrid, { MailDataRequired } from '@sendgrid/mail'
import { POST } from '../../../helpers'

import React, { useState, FormEvent } from 'react'
import {
  Button,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
  DialogActions,
} from '@mui/material'

const ModalDelLocation = ({ isOpen, onClose, location }) => {
  const displayText = `By pressing submit you are agreeing to remove ${location?.name} from your list of locations for your organization`

  const handleSubmit = async () => {
    const confirmWindow = window.confirm(
      'Are you sure you want to remove this location?',
    )

    if (confirmWindow) {
      const postDelLocationReqest: Response = await fetch(
        '/api/postDelLocationRequest',
        {
          method: POST,
          body: JSON.stringify(location),
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
      <Dialog open={isOpen} onClose={onClose}>
        <DialogTitle>Remove Location Request</DialogTitle>
        <DialogContent>
          <DialogContentText>{displayText}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => handleSubmit()}>Submit</Button>
          <Button onClick={onClose}>Cancel</Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}
export default ModalDelLocation
