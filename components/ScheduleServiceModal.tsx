import React from 'react'
import { Modal, Box } from '@mui/material'
import { useStyles } from '../constants'
import AddScheduleForm from './AddScheduleModal'
import AddServiceForm from './AddServiceModal'
export interface ScheduleServiceModalProps {
  orgInfo: any
  setOpenScheduleServiceModal: any
  schOrService: any
  setOrgInfo: any
  openScheduleServiceModal: any
  locationID: any
}
export default function ScheduleServiceForm({
  setOpenScheduleServiceModal,
  openScheduleServiceModal,
  schOrService,
  orgInfo,
  setOrgInfo,
  locationID,
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
          {schOrService == 'services' ? (
            <AddServiceForm
              handleClose={handleClose}
              setOpenScheduleServiceModal={setOpenScheduleServiceModal}
              openScheduleServiceModal={openScheduleServiceModal}
              orgInfo={orgInfo}
              setOrgInfo={setOrgInfo}
              locationID={locationID}
            />
          ) : (
            <AddScheduleForm
              handleClose={handleClose}
              setOpenScheduleServiceModal={setOpenScheduleServiceModal}
              openScheduleServiceModal={openScheduleServiceModal}
              orgInfo={orgInfo}
              setOrgInfo={setOrgInfo}
              locationID={locationID}
            />
          )}
        </Box>
      </Modal>
    </div>
  )
}
