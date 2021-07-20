import { useState } from 'react'
import {
  PGSearchResponse,
  PGLocationPlusSearch,
  PGLocationRecord,
} from '../types/postgresRecords'

type LocationRecordsState = PGLocationPlusSearch[] | null

interface UseConvertedLocationRecordsReturn {
  convertedLocRecords: LocationRecordsState
  // eslint-disable-next-line no-unused-vars
  setLocationRecords: (searchResults: PGSearchResponse[]) => void
}

const useConvertedLocationRecords = (): UseConvertedLocationRecordsReturn => {
  const [convertedLocRecords, setConvertedLocRecords] =
    useState<LocationRecordsState>(null)

  const setLocationRecords = (searchResults: PGSearchResponse[]): void =>
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
          } = res

          const newLocationInfo: PGLocationPlusSearch[] = res.locations.map(
            (loc: PGLocationRecord) => ({
              ...loc,
              categories_english,
              categories_spanish,
              id,
              multiple_categories,
              name_english,
              name_spanish,
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
