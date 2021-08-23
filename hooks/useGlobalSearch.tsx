import { createContext, useContext, useState, ReactNode } from 'react'

import { PGOrganizationResponse } from '../types/postgresRecords'

interface GlobalSearchProps {
  searchResults: PGOrganizationResponse[]
  // eslint-disable-next-line no-unused-vars
  setSearchResults: (searchResults: PGOrganizationResponse[]) => void
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
  const [searchResults, setSearchResults] = useState<
    PGOrganizationResponse[] | null
  >(null)

  return (
    <Provider value={{ searchResults, setSearchResults }}>{children}</Provider>
  )
}
