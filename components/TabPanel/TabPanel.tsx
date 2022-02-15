import styles from './TabPanel.module.css'

const TabPanel = props => {
  const { children, value, index } = props

  return (
    <>{value === index && <div className={styles.Container}>{children}</div>}</>
  )
}

export default TabPanel
