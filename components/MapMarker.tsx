import { useRouter } from 'next/router'
import { Marker } from 'react-mapbox-gl'

import Popup from './Popup'
import { usePopup } from '../hooks'
import { LocationRecord } from '../types/records'

import styles from './MapMarker.module.css'

interface MapMarkerProps {
  locationRecord: LocationRecord
}

const MapMarker = ({ locationRecord }: MapMarkerProps) => {
  const { push, query } = useRouter()
  const { popupLocation, setPopupLocation, clearPopupLocation } = usePopup()

  const { longitude, latitude, category, name, uuid } = locationRecord

  const linkToRecord = (): void => {
    if (query?.id !== uuid) push('/[category]/[id]', `/${category}/${uuid}`)
  }

  return (
    <>
      {popupLocation && name && (
        <Popup clientX={popupLocation.clientX} clientY={popupLocation.clientY}>
          {name}
        </Popup>
      )}
      <Marker coordinates={[longitude, latitude]} anchor="bottom">
        <img
          src={`/icons/${category}_marker.svg`}
          className={styles.MapMarker}
          onMouseEnter={setPopupLocation}
          onMouseMove={setPopupLocation}
          onMouseLeave={clearPopupLocation}
          onClick={linkToRecord}
        />
      </Marker>
    </>
  )
}

export default MapMarker
