import { useEffect, useState } from 'react'
import ReactMapboxGL, { Marker } from 'react-mapbox-gl'

import styles from './Map.module.css'

interface MapProps {
  latitude: number
  longitude: number
}

interface MapSize {
  width: number
  height: number
}

const MapboxMap = ReactMapboxGL({
  accessToken: process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN,
})
const mapboxStylingURL: string = 'mapbox://styles/mapbox/streets-v11'

const Map = ({ latitude, longitude }: MapProps) => {
  const [mapComputedSize, setMapComputedSize] = useState<MapSize>({
    width: 0,
    height: 0,
  })

  useEffect(() => {
    const addressInfoNode: HTMLElement = document.getElementById('LocationInfo')

    const computeAndSetMapSize = () => {
      if (addressInfoNode) {
        const { offsetWidth, offsetHeight } = addressInfoNode
        setMapComputedSize({ width: offsetWidth, height: offsetHeight })
      }
    }

    addEventListener('resize', computeAndSetMapSize)

    return () => removeEventListener('resize', computeAndSetMapSize)
  }, [])

  return (
    <div
      className={styles.Map}
      style={{
        height: mapComputedSize.height || '100vh',
        width: mapComputedSize.width || '86vw',
      }}
    >
      <MapboxMap
        className={styles.MapBox}
        style={mapboxStylingURL}
        containerStyle={{
          height: '100%',
          width: '100%',
        }}
        center={[longitude, latitude]}
      >
        <Marker coordinates={[longitude, latitude]} anchor="bottom">
          <img src="/images/heart.svg" className={styles.Pin} />
        </Marker>
      </MapboxMap>
    </div>
  )
}

export default Map
