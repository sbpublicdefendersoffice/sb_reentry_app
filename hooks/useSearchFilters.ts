import { useState, useEffect, Dispatch, SetStateAction } from 'react'
import {
  PGOrganizationResponse,
  PGOrgPlusLocation,
} from '../types/postgresRecords'

interface ServiceFilter {
  [filterName: string]: any[]
}

interface useSearchFiltersProps {
  validCategory: string
  fetchedRecords: PGOrganizationResponse[] | null
  setLocationRecords: Dispatch<SetStateAction<PGOrganizationResponse[] | null>>
}

const useSearchFilters = () => {
  const [searchFilteredResults, setSearchFilteredResults] = useState<
    any | null
  >(null)
  const [fields, handleFieldsSelected] = useState<ServiceFilter>({
    citySelected: [],
    serviceSelected: [],
    peopleServedSelected: [],
    languageSelected: [],
  })

  useEffect(() => {}, [])

  return {
    searchFilteredResults,
    fields,
    handleFieldsSelected: (e: any) =>
      handleFieldsSelected({ ...fields, [e.target.name]: e.target.value }),
  }
}

export default useSearchFilters
