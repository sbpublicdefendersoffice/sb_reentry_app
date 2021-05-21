import { useState } from 'react'
import { convertLocationsForMap } from '../helpers/converters'
import { LocationRecord, TranslatedRecordResponse } from '../types/records'

type LocationRecordsState = LocationRecord[] | null

interface UseConvertedLocationRecordsReturn {
  convertedLocRecords: LocationRecordsState
  // eslint-disable-next-line no-unused-vars
  setLocationRecords: (searchResults: TranslatedRecordResponse) => void
}

const useConvertedLocationRecords = (): UseConvertedLocationRecordsReturn => {
  const [convertedLocRecords, setConvertedLocRecords] =
    useState<LocationRecordsState>(null)

  const setLocationRecords = (searchResults: TranslatedRecordResponse): void =>
    setConvertedLocRecords(() => convertLocationsForMap(searchResults))

  return { convertedLocRecords, setLocationRecords }
}

export default useConvertedLocationRecords
