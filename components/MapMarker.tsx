import { Marker } from 'react-mapbox-gl'

import { LocationRecord } from '../types/records'

import styles from './MapMarker.module.css'

interface MapMarkerProps {
  locationRecord: LocationRecord
}

const MapMarker = ({ locationRecord }: MapMarkerProps) => {
  const { longitude, latitude, category } = locationRecord

  return (
    <Marker coordinates={[longitude, latitude]} anchor="bottom">
      <img src={`/icons/${category}_marker.svg`} className={styles.MapMarker} />
    </Marker>
  )
}

export default MapMarker
