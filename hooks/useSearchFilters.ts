import { useState, useEffect, Dispatch, SetStateAction } from 'react'
import { PGOrganizationResponse } from '../types/postgresRecords'

interface ServiceFilter {
  [filterName: string]: any[]
}

interface useSearchFiltersProps {
  validCategory: string
  fetchedRecords: PGOrganizationResponse[] | null
  setLocationRecords: Dispatch<SetStateAction<PGOrganizationResponse[] | null>>
}

const useSearchFilters = ({
  validCategory,
  fetchedRecords,
  setLocationRecords,
}: useSearchFiltersProps) => {
  const [searchFilteredResults, setSearchFilteredResults] = useState<
    any | null
  >(null)

  const [fields, handleFieldsSelected] = useState<ServiceFilter>({
    citySelected: [],
    serviceSelected: [],
    peopleServedSelected: [],
    languageSelected: [],
  })

  useEffect(() => {
    const query: any[] = Object.values(fields)
      .reduce((sumArr, arr) => {
        sumArr = [...sumArr, ...arr]
        return sumArr
      }, [])
      .map(word => word.toLowerCase())

    if (fetchedRecords) {
      if (query.length) {
      } else {
        setSearchFilteredResults(fetchedRecords)
        setLocationRecords(fetchedRecords)
      }
    }
  }, [validCategory, fetchedRecords, fields])

  return {
    searchFilteredResults,
    fields,
    handleFieldsSelected: (e: any) =>
      handleFieldsSelected({ ...fields, [e.target.name]: e.target.value }),
  }
}

export default useSearchFilters
