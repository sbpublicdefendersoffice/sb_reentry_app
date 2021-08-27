import { useState, useEffect, Dispatch, SetStateAction } from 'react'
import {
  PGLocationRecord,
  PGOrganizationResponse,
  PGServiceRecord,
} from '../types/postgresRecords'

interface ServiceFilter {
  citySelected: string[]
  serviceSelected: string[]
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
  })

  useEffect(() => {
    const isQuery: boolean = Object.values(fields).some(arr => arr.length)

    if (fetchedRecords) {
      if (isQuery) {
        let currentFiltersAppliedRecords: PGOrganizationResponse[] = []

        if (fields.citySelected.length) {
          const cities: string[] = fields.citySelected.map(str =>
            str.toLowerCase(),
          )

          const currentRecords: PGOrganizationResponse[] =
            currentFiltersAppliedRecords.length
              ? currentFiltersAppliedRecords
              : fetchedRecords

          const recordsFilteredByCity: PGOrganizationResponse[] =
            currentRecords.filter((rec: PGOrganizationResponse) =>
              rec?.locations?.some((loc: PGLocationRecord) =>
                cities.includes(loc.city.toLowerCase()),
              ),
            )

          const locationsFilteredOut: PGOrganizationResponse[] =
            recordsFilteredByCity.map((rec: PGOrganizationResponse) => {
              rec.locations = rec.locations.filter((loc: PGLocationRecord) =>
                cities.includes(loc.city.toLowerCase()),
              )
              return rec
            })

          currentFiltersAppliedRecords = locationsFilteredOut
        }

        if (fields.serviceSelected.length) {
          const services: string[] = fields.serviceSelected.map(str =>
            str.toLowerCase(),
          )

          const currentRecords: PGOrganizationResponse[] =
            currentFiltersAppliedRecords.length
              ? currentFiltersAppliedRecords
              : fetchedRecords

          const recordsFilteredByService: PGOrganizationResponse[] =
            currentRecords.filter((rec: PGOrganizationResponse) =>
              rec?.locations?.some((loc: PGLocationRecord) =>
                loc?.services?.some((serv: PGServiceRecord) =>
                  services.includes(serv?.name_english.toLowerCase()),
                ),
              ),
            )

          const servicesFilteredOut: PGOrganizationResponse[] =
            recordsFilteredByService.map((rec: PGOrganizationResponse) => {
              rec.locations = rec.locations.filter((loc: PGLocationRecord) =>
                loc?.services?.some((serv: PGServiceRecord) =>
                  services.includes(serv?.name_english.toLowerCase()),
                ),
              )
              return rec
            })

          currentFiltersAppliedRecords = servicesFilteredOut
        }
        if (currentFiltersAppliedRecords.length) {
          setSearchFilteredResults(currentFiltersAppliedRecords)
          setLocationRecords(currentFiltersAppliedRecords)
        } else {
          setSearchFilteredResults(fetchedRecords)
          setLocationRecords(fetchedRecords)
        }
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
