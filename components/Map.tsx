import ReactMapboxGL, { Marker } from 'react-mapbox-gl'

import styles from './Map.module.css'

interface MapProps {
  latitude: number
  longitude: number
}

const mapboxStylingURL: string = 'mapbox://styles/mapbox/streets-v11'

const Map = ({ latitude, longitude }: MapProps) => {
  const MapboxMap = ReactMapboxGL({
    accessToken: process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN,
  })

  return (
    <div className={styles.Map}>
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
