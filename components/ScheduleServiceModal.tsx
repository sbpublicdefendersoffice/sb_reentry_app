import React from 'react'
import { Modal, Box } from '@mui/material'

import { useStyles } from '../constants'

import AddScheduleServiceForm from '../components/AddScheduleServiceModal'

export interface ScheduleServiceModalProps {
  orgInfo: any
  setOpenScheduleServiceModal: any
  schOrService: String
  setOrgInfo: any
  openScheduleServiceModal: any
}
export default function ScheduleServiceForm({
  setOpenScheduleServiceModal,
  openScheduleServiceModal,
  schOrService,
  orgInfo,
  setOrgInfo,
}: ScheduleServiceModalProps) {
  const classes = useStyles()

  const handleClose = () => {
    setOpenScheduleServiceModal(!openScheduleServiceModal)
  }

  return (
    <div>
      <Modal
        open={openScheduleServiceModal}
        onClose={() => setOpenScheduleServiceModal(false)}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
      >
        <Box className={classes.modalStyle} sx={{ width: 400 }}>
          <AddScheduleServiceForm
            handleClose={handleClose}
            setOpenScheduleServiceModal={setOpenScheduleServiceModal}
            openScheduleServiceModal={openScheduleServiceModal}
            orgInfo={orgInfo}
            schOrService={schOrService}
            setOrgInfo={setOrgInfo}
          />
        </Box>
      </Modal>
    </div>
  )
}
