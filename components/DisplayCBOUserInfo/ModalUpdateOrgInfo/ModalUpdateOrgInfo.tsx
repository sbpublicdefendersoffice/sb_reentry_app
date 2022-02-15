import { ConstructionOutlined, Title } from '@mui/icons-material'
import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  DialogActions,
  TextField,
} from '@mui/material'
import { useState } from 'react'
import { POST } from '../../../helpers'
import styles from './ModalUpdateOrgInfo.module.css'

const ModalUpdateOrgInfo = ({ isOpen, onClose, orgInfo, setOrg }) => {
  const [name, setName] = useState(orgInfo?.name_english)
  const [website, setWebsite] = useState(orgInfo?.website)
  const [language, setLanguage] = useState(orgInfo?.languages_spoken_english)
  const [orgNotes, setOrgNotes] = useState(orgInfo?.notes_english)

  const handleSave = async () => {
    setOrg(prevState => ({
      ...prevState,
      name_english: name,
      website: website,
      languages_spoken_english: language,
      notes_english: orgNotes,
    }))

    const updatedInfo = {
      id: orgInfo.id,
      name_english: name,
      website: website,
      languages_spoken_english: language,
      notes_english: orgNotes,
    }

    const postUpdateOrg: Response = await fetch('/api/postUpdateOrganization', {
      method: POST,
      body: JSON.stringify(updatedInfo),
    })

    const requestResponse = await postUpdateOrg.json()

    if (requestResponse.error) console.log('error in sending request')
    else {
      onClose()
    }
  }

  return (
    <div>
      <Dialog
        key={orgInfo?.id}
        open={isOpen}
        onClose={onClose}
        fullWidth={true}
      >
        <DialogTitle>Update Organization Info</DialogTitle>
        <DialogContent className={styles.InputFields}>
          <TextField
            className={styles.Fields}
            variant="standard"
            label="Organization Name"
            defaultValue={name}
            onChange={e => {
              setName(e.target.value)
            }}
          />
          <TextField
            variant="standard"
            label="Website"
            defaultValue={orgInfo?.website}
            className={styles.Fields}
            onChange={e => setWebsite(e.target.value)}
          />

          <TextField
            variant="standard"
            label=" Language Spoken"
            defaultValue={orgInfo?.languages_spoken_english}
            className={styles.Fields}
            onChange={e => setLanguage(e.target.value)}
          />
          <TextField
            multiline
            rows={4}
            variant="standard"
            label="Organization Info"
            defaultValue={orgInfo?.notes_english}
            className={styles.Fields}
            onChange={e => setOrgNotes(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => handleSave()}>Save Changes</Button>
          <Button onClick={onClose}>Cancel</Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}

export default ModalUpdateOrgInfo
