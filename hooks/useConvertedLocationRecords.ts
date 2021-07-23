import { useState } from 'react'
import {
  PGOrganizationResponse,
  PGOrgPlusLocation,
  PGLocationRecord,
} from '../types/postgresRecords'

type LocationRecordsState = PGOrgPlusLocation[] | null

interface UseConvertedLocationRecordsReturn {
  convertedLocRecords: LocationRecordsState
  // eslint-disable-next-line no-unused-vars
  setLocationRecords: (searchResults: PGOrganizationResponse[]) => void
}

const useConvertedLocationRecords = (): UseConvertedLocationRecordsReturn => {
  const [convertedLocRecords, setConvertedLocRecords] =
    useState<LocationRecordsState>(null)

  const setLocationRecords = (searchResults: PGOrganizationResponse[]): void =>
    setConvertedLocRecords(() =>
      searchResults
        .map(res => {
          const {
            categories_english,
            categories_spanish,
            id,
            multiple_categories,
            name_english,
            name_spanish,
            single_category,
          } = res

          const newLocationInfo: PGOrgPlusLocation[] = res.locations.map(
            (loc: PGLocationRecord) => ({
              ...loc,
              categories_english,
              categories_spanish,
              id,
              multiple_categories,
              name_english,
              name_spanish,
              single_category,
            }),
          )

          return newLocationInfo
        })
        .flat(1)
        .filter(loc => loc.longitude),
    )

  return { convertedLocRecords, setLocationRecords }
}

export default useConvertedLocationRecords
