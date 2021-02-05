import styles from './Map.module.css'

interface MapProps {
  latitude: number
  longitude: number
}

const Map = ({ latitude, longitude }: MapProps) => {
  return (
    <div className={styles.Map}>
      <span>howdy</span>
    </div>
  )
}

export default Map
