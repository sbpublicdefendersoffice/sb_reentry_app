import { useState } from 'react'
import { PGSearchResponse, PGLocationRecord } from '../types/postgresRecords'

type LocationRecordsState = PGLocationRecord[] | null

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
        .map(res => res.locations)
        .flat(1)
        .filter(loc => loc.longitude),
    )
  //need to figure out how to get more info into each loc record
  return { convertedLocRecords, setLocationRecords }
}

export default useConvertedLocationRecords
