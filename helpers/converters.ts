import {
  LocationRecord,
  OrgRecord,
  TranslatedRecordResponse,
} from '../types/records'

export const convertLocationsForMap = (
  locRecordsToConvert: TranslatedRecordResponse,
): LocationRecord[] | null => {
  if (locRecordsToConvert.records)
    return locRecordsToConvert.records.reduce(
      (arr: LocationRecord[], record: OrgRecord) => {
        const longCheck: number[] = record.fields.location_longitude

        if (longCheck) {
          const newLocationRecords = longCheck.map(
            (longitude: number, i: number) => ({
              multiple_categories: record.fields.org_categories?.map(
                (category: string): string => category.replaceAll(' ', ''),
              ),
              single_category: locRecordsToConvert.category || 'search',
              longitude,
              latitude: record.fields.location_latitude[i],
              city: record.fields.locations_city[i].trim(),
              name: record.fields.org_name || record.fields.org_name_spanish,
              uuid: record.id,
            }),
          )
          arr = [...arr, ...newLocationRecords]
        }

        return arr
      },
      [],
    )
  else return null
}
