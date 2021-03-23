import { createContext, useContext } from 'react'

import { UseLocationProps } from '../types/maps'

const UserLocation = createContext<UseLocationProps | null>(null)

export const { Provider } = UserLocation

const useLocation = () => useContext(UserLocation)

export default useLocation
