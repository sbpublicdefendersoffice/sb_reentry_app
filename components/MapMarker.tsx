import { useState, useEffect, useRef, MutableRefObject } from 'react'
import { useRouter } from 'next/router'
import type { Map, Marker } from 'mapbox-gl'

import Popup from './Popup'
import { usePopup, useLanguage } from '../hooks'
import { CopyHolder, PGOrgPlusLocation } from '../types'
import { ENGLISH } from '../constants/language'

import styles from './MapMarker.module.css'

interface MapMarkerProps {
  locationRecord: PGOrgPlusLocation
  map: Map
  onTop?: boolean
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
  map,
  testWorkaround,
  onTop,
}: MapMarkerProps) => {
  const markerRef: MutableRefObject<HTMLDivElement> | null = useRef(null)
  const imgRef: MutableRefObject<HTMLImageElement> | null = useRef(null)

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
    if (isSearchPage)
      setImgSrc(multiple_categories ? multiple_categories[0] : 'socialservices')
    else setImgSrc(single_category)
  }, [locationRecord])

  useEffect(() => {
    let marker: Marker

    const loadMarker = async () => {
      if (imgSrc && imgRef.current && map?.loaded) {
        const { Marker } = await import('mapbox-gl')

        marker = new Marker({
          anchor: 'bottom',
          element: imgRef.current,
        })

        marker.setLngLat([longitude, latitude]).addTo(map)

        const markerEle = marker.getElement()

        if (onTop) markerEle.style.zIndex = '8'
        markerRef.current = markerEle as HTMLDivElement
      }
    }
    loadMarker()

    return () => {
      marker?.remove()
    }
  }, [imgSrc, map])

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
        <div ref={markerRef}>
          <img
            ref={imgRef}
            loading="lazy"
            src={`/icons/${imgSrc.replace(' ', '')}_marker.svg`}
            alt={activeCopy.altText}
            className={styles.MapMarker}
            onMouseEnter={setPopupLocation}
            onMouseMove={setPopupLocation}
            onMouseLeave={clearPopupLocation}
            onClick={linkToRecord}
          />
        </div>
      )}
    </>
  )
}

export default MapMarker
