import { createContext, useContext } from 'react'

import { TranslatedRecordResponse } from '../types/records'

interface GlobalSearchProps {
  searchResults: TranslatedRecordResponse
  // eslint-disable-next-line no-unused-vars
  setSearchResults: (searchResults: TranslatedRecordResponse) => void
}

const GlobalSearch = createContext<GlobalSearchProps | null>(null)

export const { Provider } = GlobalSearch

const useGlobalSearch = () => useContext(GlobalSearch)

export default useGlobalSearch
