import sendGrid, { MailDataRequired } from '@sendgrid/mail'

import React, { useState, FormEvent } from 'react'
import { Checkbox, TextField } from '@mui/material'

import styles from './DayInput.module.css'

const DayInput = ({ label, day, setDay }) => {
  const [checked, setChecked] = useState(false)
  const [open, setOpen] = useState('00:00')
  const [close, setClose] = useState('00:00')

  const handleCheck = () => {
    setDay(prev => ({ ...prev, open: '00:00', close: '00:00' }))
    setOpen('00:00')
    setChecked(!checked)
  }
  return (
    <div className={styles.Day}>
      <div className={styles.Label}>{label}</div>
      <TextField
        disabled={checked}
        id="time"
        label="Open Time"
        type="time"
        value={open}
        className={styles.Input}
        InputLabelProps={{
          shrink: true,
        }}
        inputProps={{
          step: 300, // 5 min
        }}
        onChange={e => {
          setDay(prev => ({ ...prev, open: e.target.value }))
          setOpen(e.target.value)
        }}
      />
      <TextField
        disabled={checked}
        id="time"
        label="Close Time"
        type="time"
        value={close}
        className={styles.Input}
        InputLabelProps={{
          shrink: true,
        }}
        inputProps={{
          step: 300, // 5 min
        }}
        onChange={e => {
          setDay(prev => ({ ...prev, close: e.target.value }))
          setClose(e.target.value)
        }}
      />
      <div className={styles.CheckBox}>
        <div className={styles.CheckboxLabel}>Clsoed All Day</div>
        <Checkbox
          className={styles.Check}
          checked={checked}
          onChange={() => handleCheck()}
          inputProps={{ 'aria-label': 'primary checkbox' }}
        />
      </div>
    </div>
  )
}
export default DayInput
