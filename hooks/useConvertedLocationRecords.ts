import { useState } from 'react'
import { PGResponse, PGLocationRecord } from '../types/postgresRecords'

type LocationRecordsState = PGLocationRecord[] | null

interface UseConvertedLocationRecordsReturn {
  convertedLocRecords: LocationRecordsState
  // eslint-disable-next-line no-unused-vars
  setLocationRecords: (searchResults: PGResponse[]) => void
}

const useConvertedLocationRecords = (): UseConvertedLocationRecordsReturn => {
  const [convertedLocRecords, setConvertedLocRecords] =
    useState<LocationRecordsState>(null)

  const setLocationRecords = (searchResults: PGResponse[]): void =>
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

          const newLocationInfo: PGLocationRecord[] = res.locations.map(
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
  //need to figure out how to get more info into each loc record
  //need lat,long, single cat, multiple cat,id and name
  return { convertedLocRecords, setLocationRecords }
}

export default useConvertedLocationRecords
