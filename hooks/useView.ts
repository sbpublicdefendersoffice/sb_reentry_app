import { createContext, useContext } from 'react'

const view = createContext(null)

export const { Provider } = view

const useView = () => useContext(view)

export default useView
