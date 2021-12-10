import React from 'react'
import { Modal, Box } from '@mui/material'

import { useStyles } from '../constants'

import AddLocationForm from './AddLocationModal'
import { POST } from '../helpers'

export interface FormModalProps {
  orgInfo: any
  setOpenModal: any
  setOrgInfo: any
  openModal?: any
}
export default function FormModal({
  openModal,
  setOpenModal,
  orgInfo,
  setOrgInfo,
}: FormModalProps) {
  const classes = useStyles()

  const handleClose = () => {
    setOpenModal(false)
  }

  return (
    <div>
      <Modal
        open={openModal}
        onClose={handleClose}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
      >
        <Box className={classes.modalStyle} sx={{ width: 400 }}>
          <AddLocationForm
            handleClose={handleClose}
            orgInfo={orgInfo}
            setOrgInfo={setOrgInfo}
          />
        </Box>
      </Modal>
    </div>
  )
}
