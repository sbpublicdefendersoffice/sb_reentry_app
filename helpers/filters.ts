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
            multiple_categories: record.fields.org_categories.map(
              (category: string): string => category.replaceAll(' ', ''),
            ),
            single_category: locRecordsToFilter.category || 'search',
            longitude,
            latitude: record.fields.location_latitude[i],
            city: record.fields.locations_city[i],
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
