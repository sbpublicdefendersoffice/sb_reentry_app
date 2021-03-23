import { createContext, useContext } from 'react'

const UserLocation = createContext<GeolocationCoordinates | null>(null)

export const { Provider } = UserLocation

const useLocation = () => useContext(UserLocation)

export default useLocation
