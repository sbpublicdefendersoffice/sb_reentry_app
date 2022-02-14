import { useState } from 'react'
import { Button, Chip, Divider, Paper, Typography } from '@mui/material'
import styles from './DisplayCBOOrgInfo.module.css'
import IndividualInfo from './IndividualInfo/IndividualInfo'

import { useStyles } from '../../constants'
import ModalUpdateOrgInfo from './ModalUpdateOrgInfo/ModalUpdateOrgInfo'

const DisplayCBOOrgInfo = ({ orgInfo, setOrg }) => {
  const classes = useStyles()
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)

  return (
    <div className={styles.DisplayContainer}>
      <Paper elevation={4} className={styles.OrgInfo}>
        <Typography variant="h4" color="text.primary" align="center">
          {orgInfo?.name_english}
        </Typography>
        <div className={styles.PaperContent}>
          <IndividualInfo
            title="Organization Info"
            value={orgInfo?.notes_english}
          />
          {orgInfo?.multiple_categories && (
            <div className={styles.CategoryChipDiv}>
              <Divider>Organization Category</Divider>
              <div className={styles.Chips}>
                {orgInfo.multiple_categories.map((cat, index) => (
                  <Chip key={index} label={cat} />
                ))}
              </div>
            </div>
          )}
          {orgInfo?.customers_served_english && (
            <IndividualInfo
              title="Customers Served"
              value={orgInfo?.customers_served_english}
            />
          )}
          <IndividualInfo
            title="Languages Spoken"
            value={orgInfo?.languages_spoken_english}
          />
          <IndividualInfo title="Website" value={orgInfo?.website} />
        </div>
        <ModalUpdateOrgInfo
          key={orgInfo?.id}
          isOpen={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
          orgInfo={orgInfo}
          setOrg={setOrg}
        />
        <Button
          className={classes.greenButton}
          onClick={() => setIsEditModalOpen(true)}
        >
          Update Org Info
        </Button>
      </Paper>
    </div>
  )
}

export default DisplayCBOOrgInfo
