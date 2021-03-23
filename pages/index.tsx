import { useEffect } from 'react'

import useLocation from '../hooks/useLocation'
import { AccessLineCta, PwaDownload, ResourceHub, PRRCcta } from '../components'
import { checkAndSetUserLocation } from '../helpers/location'

const Home = () => {
  const { coords, setCoords } = useLocation()

  useEffect((): void => {
    if (!coords) checkAndSetUserLocation(setCoords)
  }, [])

  return (
    <>
      <ResourceHub />
      <PRRCcta />
      <AccessLineCta />
      <PwaDownload />
    </>
  )
}

export default Home
