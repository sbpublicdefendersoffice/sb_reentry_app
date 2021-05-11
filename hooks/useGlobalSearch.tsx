import { createContext, useContext, useState, ReactNode } from 'react'

import { TranslatedRecordResponse } from '../types/records'

interface GlobalSearchProps {
  searchResults: TranslatedRecordResponse
  // eslint-disable-next-line no-unused-vars
  setSearchResults: (searchResults: TranslatedRecordResponse) => void
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
  const [searchResults, setSearchResults] =
    useState<TranslatedRecordResponse | null>(null)

  return (
    <Provider value={{ searchResults, setSearchResults }}>{children}</Provider>
  )
}
