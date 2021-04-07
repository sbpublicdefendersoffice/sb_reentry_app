import { createContext, useContext } from 'react'

import { UseToastProps } from '../types/ui'

const toast = createContext<UseToastProps | null>(null)

export const { Provider } = toast

const useToast = () => useContext(toast)

export default useToast
