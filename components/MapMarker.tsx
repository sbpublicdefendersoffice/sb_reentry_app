import { useState, MouseEvent } from 'react'
import { Marker } from 'react-mapbox-gl'

import Popup from './Popup'
import { LocationRecord } from '../types/records'
import { PopupInfo } from '../types/maps'

import styles from './MapMarker.module.css'

interface MapMarkerProps {
  locationRecord: LocationRecord
}

const MapMarker = ({ locationRecord }: MapMarkerProps) => {
  const [popup, setPopup] = useState<PopupInfo | null>(null)
  const { longitude, latitude, category, name, uuid } = locationRecord

  const setPopupLocation = ({ clientX, clientY }: MouseEvent): void =>
    setPopup({ clientX, clientY })

  return (
    <>
      {popup && name && (
        <Popup clientX={popup.clientX} clientY={popup.clientY}>
          {name}
        </Popup>
      )}
      <Marker coordinates={[longitude, latitude]} anchor="bottom">
        <img
          src={`/icons/${category}_marker.svg`}
          className={styles.MapMarker}
          onMouseEnter={setPopupLocation}
          onMouseMove={setPopupLocation}
          onMouseLeave={() => setPopup(null)}
        />
      </Marker>
    </>
  )
}

export default MapMarker
