import { useState } from 'react'
import { PGSearchResponse } from '../types/postgresRecords'

type LocationRecordsState = PGSearchResponse[] | null

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
      searchResults.filter(res => res?.locations[0]?.longitude),
    )

  return { convertedLocRecords, setLocationRecords }
}

export default useConvertedLocationRecords
