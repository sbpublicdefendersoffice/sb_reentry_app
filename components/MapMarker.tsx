import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { Marker } from 'react-mapbox-gl'

import Popup from './Popup'
import { usePopup, useLanguage } from '../hooks'
import { CopyHolder, PGLocationRecord } from '../types'
import { ENGLISH } from '../constants/language'

import styles from './MapMarker.module.css'

interface MapMarkerProps {
  locationRecord: PGLocationRecord
  customStyle?: { [cssQuality: string]: string | number }
  testWorkaround?: boolean
}

const copy: CopyHolder = {
  english: {
    altText: 'Map marker image',
  },
  spanish: {
    altText: 'Imagen de marcador de mapa',
  },
}

const MapMarker = ({
  locationRecord,
  customStyle,
  testWorkaround,
}: MapMarkerProps) => {
  const [imgSrc, setImgSrc] = useState<string>('')
  const { push, pathname, query } = useRouter()
  const { popupLocation, setPopupLocation, clearPopupLocation } = usePopup()

  const { language } = useLanguage()
  const activeCopy = copy[language]

  const {
    longitude,
    latitude,
    name_english,
    name_spanish,
    id,
    multiple_categories,
    single_category,
  } = locationRecord
  const isSearchPage: boolean =
    pathname.startsWith('/search') || pathname.startsWith('/letushelp')

  useEffect(() => {
    if (isSearchPage) setImgSrc(multiple_categories[0])
    else setImgSrc(single_category)
  }, [locationRecord])

  const linkToRecord = (): void => {
    if (id && query?.id !== String(id))
      if (isSearchPage) push('/search/[id]', `/search/${id}`)
      else push('/[category]/[id]', `/${single_category}/${id}`)
  }

  const name: string = language === ENGLISH ? name_english : name_spanish

  return (
    <>
      {popupLocation && name && (
        <Popup clientX={popupLocation.clientX} clientY={popupLocation.clientY}>
          {name}
        </Popup>
      )}

      {!testWorkaround && (
        <Marker
          style={customStyle ? customStyle : {}}
          coordinates={[longitude, latitude]}
          anchor="bottom"
        >
          <img
            src={`/icons/${imgSrc.replace(' ', '')}_marker.svg`}
            alt={activeCopy.altText}
            className={styles.MapMarker}
            onMouseEnter={setPopupLocation}
            onMouseMove={setPopupLocation}
            onMouseLeave={clearPopupLocation}
            onClick={linkToRecord}
          />
        </Marker>
      )}
    </>
  )
}

export default MapMarker
