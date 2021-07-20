import { createContext, useContext, useState, ReactNode } from 'react'

import { PGResponse } from '../types/postgresRecords'

interface GlobalSearchProps {
  searchResults: PGResponse[]
  // eslint-disable-next-line no-unused-vars
  setSearchResults: (searchResults: PGResponse[]) => void
}

const GlobalSearch = createContext<GlobalSearchProps | null>(null)

const useGlobalSearch = () => useContext(GlobalSearch)

export default useGlobalSearch

interface GlobalSearchProviderProps {
  children: ReactNode
}

const { Provider } = GlobalSearch

export const GlobalSearchProvider = ({
  children,
}: GlobalSearchProviderProps) => {
  const [searchResults, setSearchResults] = useState<PGResponse[] | null>(null)

  return (
    <Provider value={{ searchResults, setSearchResults }}>{children}</Provider>
  )
}
