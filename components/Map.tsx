import ReactMapboxGL, { Marker } from 'react-mapbox-gl'

import styles from './Map.module.css'

interface MapProps {
  latitude: number
  longitude: number
}

const Map = ({ latitude, longitude }: MapProps) => {
  const MapboxMap = ReactMapboxGL({
    accessToken: process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN,
    scrollZoom: false,
    dragPan: false,
    dragRotate: false,
    touchZoomRotate: false,
  })

  return (
    <div className={styles.Map}>
      <MapboxMap
        className={styles.MapBox}
        style="mapbox://styles/mapbox/streets-v11"
        containerStyle={{
          height: '100%',
          width: '100%',
        }}
        center={[longitude, latitude]}
      >
        <Marker coordinates={[longitude, latitude]}>
          <img src="/images/heart.svg" className={styles.Pin} />
        </Marker>
      </MapboxMap>
    </div>
  )
}

export default Map
