import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Typography,
  Divider,
  Button,
  Paper,
} from '@mui/material'
import { useState, useEffect } from 'react'
import styles from './DisplayLocations.module.css'
import { ExpandMore } from '@mui/icons-material'
import { useStyles } from '../../constants'
import ModalReqAddLocation from './ModalReqAddLocation/ModalReqAddLocation'
import createDailySchedule from '../../helpers/createDailySchedule'
import { stubArray } from 'lodash'
import ModalDelLocation from './ModalDelLocation/ModalDelLocation'
import ModalUpdateLocInfo from './ModalUpdateLocInfo/ModalUpdateLocInfo'
import ModalUpdateSchedReq from './ModalUpdateSchedReq/ModalUpdateSchedReq'

const DisplayLocations = ({ locations, orgName, orgInfo, setOrg }) => {
  const classes = useStyles()
  const [isAddLocModalOpen, setIsAddLocModalOpen] = useState(false)
  const [isDelLocModalOpen, setIsDelLocModalOpen] = useState(false)
  const [isScheduleModalOpen, setIsScheduleModalOpen] = useState(false)
  const [deleteLocation, setDeleteLocation] = useState(null)
  const [isEditLocModalOpen, setIsEditLocModalOpen] = useState(false)
  const [editLocation, setEditLocation] = useState([])
  const [key, setKey] = useState(0)
  const [locIndex, setLocIndex] = useState(0)

  const handleDelete = loc => {
    loc['orgId'] = orgInfo.id
    loc['orgName'] = orgInfo.name_english
    setDeleteLocation(loc)
    setIsDelLocModalOpen(true)
  }

  const handleEdit = (loc, index) => {
    setKey(loc.id)
    setLocIndex(index)
    setEditLocation(loc)
    setIsEditLocModalOpen(true)
  }

  const handleSchedule = loc => {
    setEditLocation(loc)
    setIsScheduleModalOpen(true)
  }

  return (
    <Paper key={orgInfo?.id} className={styles.Container}>
      <div className={styles.Header}>
        <Typography variant="h4" color="text.primary" align="center">
          Location List
        </Typography>
        <ModalUpdateSchedReq
          isOpen={isScheduleModalOpen}
          onClose={() => setIsScheduleModalOpen(false)}
          location={editLocation}
        />
        <ModalUpdateLocInfo
          key={key}
          location={editLocation}
          isOpen={isEditLocModalOpen}
          onClose={() => setIsEditLocModalOpen(false)}
          setOrg={setOrg}
          locations={locations}
          locIndex={locIndex}
        />
        <ModalReqAddLocation
          orgInfo={orgInfo}
          isOpen={isAddLocModalOpen}
          onClose={() => setIsAddLocModalOpen(false)}
        ></ModalReqAddLocation>
        <ModalDelLocation
          isOpen={isDelLocModalOpen}
          onClose={() => setIsDelLocModalOpen(false)}
          location={deleteLocation}
        />
        <Button
          className={classes.greenButton}
          variant="contained"
          onClick={() => setIsAddLocModalOpen(true)}
        >
          Request to add new location
        </Button>
      </div>
      {locations?.map((location, index) => (
        <Accordion key={location.id}>
          <AccordionSummary expandIcon={<ExpandMore />}>
            <Typography variant="h5">{location.name}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Divider />
            <div className={styles.LocationInfo}>
              <div className={styles.Label}>Address:</div>
              <div
                className={styles.LableValue}
              >{`${location.address} ${location.city}, ${location.state} ${location.zip}`}</div>
            </div>
            <Divider />
            <div className={styles.LocationInfo}>
              <div className={styles.Label}>Location Info:</div>
              <div className={styles.LableValue}>{location.notes}</div>
            </div>
            <Divider />
            <div className={styles.LocationInfo}>
              <div className={styles.Label}>Phone Number:</div>
              <div className={styles.LableValue}>{location.phone}</div>
            </div>
            <Divider />
            <div className={styles.LocationInfo}>
              <div className={styles.Label}>Email:</div>
              <div className={styles.LableValue}>{location?.email}</div>
            </div>
            <Divider />
            {createScheduleUI(location.schedules)}
            <Divider />

            <div className={styles.AccordionActions}>
              <Button
                className={classes.greenButton}
                variant="contained"
                onClick={() => handleEdit(location, index)}
              >
                Edit Location Information
              </Button>
              <Button
                className={classes.greenButton}
                variant="contained"
                onClick={() => handleSchedule(location)}
              >
                Request to edit Daily Schedule
              </Button>

              <Button
                className={classes.greenButton}
                variant="contained"
                onClick={() => handleDelete(location)}
              >
                Request to Delete Location
              </Button>
            </div>
          </AccordionDetails>
        </Accordion>
      ))}
    </Paper>
  )
}

export default DisplayLocations

const createScheduleUI = schedules => {
  const condensedSchedule = createDailySchedule(schedules)
  return (
    <>
      <div className={styles.SchedulePanel}>
        <div className={styles.Day}>
          <div className={styles.DayLabel}>Sunday:</div>
          <div className={styles.DayHours}>{condensedSchedule.sun}</div>
        </div>
        <div className={styles.Day}>
          <div className={styles.DayLabel}>Monday:</div>
          <div className={styles.DayHours}>{condensedSchedule.mon}</div>
        </div>
        <div className={styles.Day}>
          <div className={styles.DayLabel}>Tuesday:</div>
          <div className={styles.DayHours}>{condensedSchedule.tue}</div>
        </div>
        <div className={styles.Day}>
          <div className={styles.DayLabel}>Wednesday:</div>
          <div className={styles.DayHours}>{condensedSchedule.wed}</div>
        </div>
        <div className={styles.Day}>
          <div className={styles.DayLabel}>Thursday:</div>
          <div className={styles.DayHours}>{condensedSchedule.thu}</div>
        </div>
        <div className={styles.Day}>
          <div className={styles.DayLabel}>Friday:</div>
          <div className={styles.DayHours}>{condensedSchedule.fri}</div>
        </div>
        <div className={styles.Day}>
          <div className={styles.DayLabel}>Saturday:</div>
          <div className={styles.DayHours}>{condensedSchedule.sat}</div>
        </div>
      </div>
    </>
  )
}
