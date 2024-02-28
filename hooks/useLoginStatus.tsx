import { createContext, useContext, useState, ReactNode } from 'react'

interface LoginStatusProps {
  isLoggedIn: boolean
  setIsLoggedIn: (isLoggedIn: boolean) => void
}

const loginStatus = createContext<LoginStatusProps | null>(null)

const useLoginStatus = () => useContext(loginStatus)

export default useLoginStatus

interface LoginStatusProviderProps {
  children: ReactNode
}

const { Provider } = loginStatus

export const LoginStatusProvider = ({ children }: LoginStatusProviderProps) => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(false)

  return <Provider value={{ isLoggedIn, setIsLoggedIn }}>{children}</Provider>
}
