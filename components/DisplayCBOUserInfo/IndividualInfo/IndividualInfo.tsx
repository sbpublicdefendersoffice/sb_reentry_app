import { Title } from '@mui/icons-material'
import { Avatar, Chip, Divider, Paper, Typography } from '@mui/material'
import styles from './IndividualInfo.module.css'

const IndividualInfo = ({ title, value }) => {
  return (
    <div className={styles.Container}>
      <Divider>{title}</Divider>
      <Typography align="center">{value}</Typography>
    </div>
  )
}

export default IndividualInfo
