import React, { useState, FormEvent } from 'react'
import sendGrid, { MailDataRequired } from '@sendgrid/mail'
import { POST } from '../../../helpers'

import {
  TextField,
  Button,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
  DialogActions,
} from '@mui/material'

import styles from './ModalUpdateLocInfo.module.css'

const ModalUpdateLocInfo = ({
  isOpen,
  onClose,
  location,
  setOrg,
  locIndex,
  locations,
}) => {
  const [name, setName] = useState(location?.name)
  const [website, setWebsite] = useState(location?.website)
  const [address, setAddress] = useState(location?.address)
  const [address_2, setAddress_2] = useState(location?.addres_2)
  const [city, setCity] = useState(location?.city)
  const [state, setState] = useState(location?.state)
  const [zipcode, setZipcode] = useState(location?.zipcode)
  const [phone, setPhone] = useState(location?.phone)
  const [email, setEmail] = useState(location?.email)
  const [notes, setNote] = useState(location?.notes)

  const handleSubmit = async () => {
    const confirmWindow = window.confirm(
      'Are you sure you want to edit this location?',
    )

    if (confirmWindow) {
      const updatedLoc = {
        id: location.id,
        zip: zipcode,
        city: city,
        name: name,
        website: website,
        address: address,
        address2: address_2,
        state: state,
        phone: phone,
        email: email,
        notes: notes,
      }

      locations[locIndex] = updatedLoc

      setOrg(prevOrg => ({ ...prevOrg, locations: locations }))

      const postDelLocationReqest: Response = await fetch(
        '/api/postUpdateLocation',
        {
          method: POST,
          body: JSON.stringify(updatedLoc),
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
        <DialogTitle>Update Location Information</DialogTitle>
        <DialogContent className={styles.InputFields}>
          <TextField
            className={styles.Fields}
            variant="standard"
            label="Location Name"
            defaultValue={name}
            onChange={e => {
              setName(e.target.value)
            }}
          />
          <TextField
            variant="standard"
            label="Website"
            defaultValue={website}
            className={styles.Fields}
            onChange={e => setWebsite(e.target.value)}
          />
          <TextField
            variant="standard"
            label="Address 1"
            defaultValue={address}
            className={styles.Fields}
            onChange={e => setAddress(e.target.value)}
          />
          <TextField
            variant="standard"
            label="Address 2"
            defaultValue={address_2}
            className={styles.Fields}
            onChange={e => setAddress(e.target.value)}
          />
          <TextField
            variant="standard"
            label="City"
            defaultValue={city}
            className={styles.Fields}
            onChange={e => setCity(e.target.value)}
          />
          <TextField
            variant="standard"
            label="State"
            defaultValue={state}
            className={styles.Fields}
            onChange={e => setState(e.target.value)}
          />
          <TextField
            variant="standard"
            label="Zipcode"
            defaultValue={zipcode}
            className={styles.Fields}
            onChange={e => setZipcode(e.target.value)}
          />
          <TextField
            variant="standard"
            label="Phone Number"
            defaultValue={phone}
            className={styles.Fields}
            onChange={e => setPhone(e.target.value)}
          />
          <TextField
            variant="standard"
            label="Email"
            defaultValue={email}
            className={styles.Fields}
            onChange={e => setEmail(e.target.value)}
          />
          <TextField
            multiline
            variant="standard"
            label="Location Info"
            defaultValue={notes}
            className={styles.Fields}
            onChange={e => setNote(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => handleSubmit()}>Submit</Button>
          <Button onClick={onClose}>Cancel</Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}
export default ModalUpdateLocInfo
