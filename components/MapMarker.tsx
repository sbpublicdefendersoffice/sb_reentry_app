import { useState, MouseEvent } from 'react'
import { useRouter } from 'next/router'
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

  const { push, query } = useRouter()

  const { longitude, latitude, category, name, uuid } = locationRecord

  const setPopupLocation = ({ clientX, clientY }: MouseEvent): void =>
    setPopup({ clientX, clientY })

  const linkToRecord = () => {
    if (query?.id !== uuid) push(`/${category}/[id]`, `/${category}/${uuid}`)
  }

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
          onClick={linkToRecord}
        />
      </Marker>
    </>
  )
}

export default MapMarker
