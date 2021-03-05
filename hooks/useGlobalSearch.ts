import { createContext, useContext } from 'react'

import { OrgRecord } from '../types/records'

interface GlobalSearchProps {
  searchResults: OrgRecord[]
  // eslint-disable-next-line no-unused-vars
  setSearchResults: (searchResults: OrgRecord[]) => void
}

const GlobalSearch = createContext<GlobalSearchProps | null>(null)

export const { Provider } = GlobalSearch

const useGlobalSearch = () => useContext(GlobalSearch)

export default useGlobalSearch
