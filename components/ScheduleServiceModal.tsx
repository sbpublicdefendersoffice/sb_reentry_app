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
  locationIndex: any
}
export default function ScheduleServiceForm({
  setOpenScheduleServiceModal,
  openScheduleServiceModal,
  schOrService,
  orgInfo,
  setOrgInfo,
  locationID,
  locationIndex,
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
              schOrService={schOrService}
              setOrgInfo={setOrgInfo}
              locationID={locationID}
              locationIndex={locationIndex}
            />
          ) : (
            <AddScheduleForm
              handleClose={handleClose}
              setOpenScheduleServiceModal={setOpenScheduleServiceModal}
              openScheduleServiceModal={openScheduleServiceModal}
              orgInfo={orgInfo}
              schOrService={schOrService}
              setOrgInfo={setOrgInfo}
              locationID={locationID}
              locationIndex={locationIndex}
            />
          )}
        </Box>
      </Modal>
    </div>
  )
}
