import { Add } from '@mui/icons-material'
import { Modal, Dialog, DialogTitle, Button } from '@mui/material'
import React from 'react'
import AddLocationForm from '../../AddLocationModal'

const ModalReqAddLocation = ({ isOpen, onClose, orgInfo }) => {
  return (
    <div>
      <Dialog open={isOpen} onClose={onClose}>
        <AddLocationForm
          handleClose={onClose}
          orgInfo={orgInfo}
          setOrgInfo={null}
        ></AddLocationForm>
      </Dialog>
    </div>
  )
}

export default ModalReqAddLocation
