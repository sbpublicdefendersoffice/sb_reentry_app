import {
  LocationRecord,
  OrgRecord,
  TranslatedRecordResponse,
} from '../types/records'

export const filterOutLocationlessRecords = (
  locRecordsToFilter: TranslatedRecordResponse,
) =>
  locRecordsToFilter.records.reduce(
    (arr: LocationRecord[], record: OrgRecord) => {
      const longCheck: number[] = record.fields.location_longitude

      if (longCheck) {
        const newLocationRecords = longCheck.map(
          (longitude: number, i: number) => ({
            category: locRecordsToFilter.category || 'Search',
            longitude,
            latitude: record.fields.location_latitude[i],
            name: record.fields.org_name,
            uuid: record.id,
          }),
        )
        arr = [...arr, ...newLocationRecords]
      }

      return arr
    },
    [],
  )
