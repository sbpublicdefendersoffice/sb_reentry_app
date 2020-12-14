import { SetStateAction, Dispatch } from 'react'

import {
  OrgRecord,
  Holder,
  LocationRecord,
  SortedRecord,
  ScheduleRecord,
  TranslatedRecordResponse,
  RequestOptionsObject,
} from '../types/records'

const BASE_URL = `https://api.airtable.com/v0/${process.env.NEXT_PUBLIC_AIRTABLE_BASE}`

const constructOptionsObject = (offset?: string): RequestOptionsObject => {
  const OPTIONS_OBJECT: RequestOptionsObject = {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_AIRTABLE_API_KEY}`,
    },
  }
  if (offset) OPTIONS_OBJECT.headers.offset = offset
  return OPTIONS_OBJECT
}

export const fetchRecordsByCategory = async (
  category: string,
  recordSetFunction: Dispatch<SetStateAction<TranslatedRecordResponse>>,
  offset?: string,
): Promise<void> => {
  const fetchRecords: Response = await fetch(
    `${BASE_URL}/organization?filterByFormula=FIND(%22${category}%22%2Corg_categories)&fields%5B%5D=org_name&fields%5B%5D=org_tags`,
    constructOptionsObject(offset),
  )
  const translatedRecords: TranslatedRecordResponse = await fetchRecords.json()
  // @ts-ignore
  translatedRecords.records.sort((a: OrgRecord, b: OrgRecord) =>
    a.fields.org_name?.localeCompare(b.fields.org_name),
  )

  recordSetFunction(translatedRecords)
}

export const fetchSingleOrgRecord = async (
  recordId: string,
  recordSetFunction: Dispatch<SetStateAction<SortedRecord>>,
): Promise<void> => {
  const fetchRecord: Response = await fetch(
    `${BASE_URL}/organization/${recordId}`,
    constructOptionsObject(),
  )

  const translatedRecord: OrgRecord = await fetchRecord.json()

  const organizedRecord: SortedRecord = {
    locations: [],
  }

  organizedRecord.id = translatedRecord.id

  const locInfo: Holder = {}
  let locMaxLength = 0

  const scheInfo: Holder = {}
  let scheMaxLength = 0

  const splitRegEx = /^(.*?\_)/

  Object.entries(translatedRecord.fields).forEach(([key, value]) => {
    const cleanedKey: string = key.replace(splitRegEx, '')
    if (key.startsWith('org')) {
      const recordsToNotCopy: string[] = [
        'org_id',
        'org_schedule',
        'org_services',
        'org_locations',
      ]
      if (!recordsToNotCopy.includes(key)) organizedRecord[cleanedKey] = value
    } else {
      if (typeof value === 'string') value = value.split(';')
      if (key.startsWith('loc')) {
        // @ts-ignore
        locInfo[cleanedKey] = value
        if (value instanceof Array) {
          const length: number = value.length
          if (length > locMaxLength) locMaxLength = length
        }
      } else if (key.startsWith('sch')) {
        // @ts-ignore
        scheInfo[cleanedKey] = value
        if (value instanceof Array) {
          const length: number = value.length
          if (length > scheMaxLength) scheMaxLength = length
        }
      }
    }
  })

  for (let i = 0; i < locMaxLength; i++) {
    const obj: any = {}

    obj.id = locInfo.id && locInfo.id[i] ? locInfo.id[i] : null
    obj.city = locInfo.city && locInfo.city[i] ? locInfo.city[i] : null
    obj.address =
      locInfo.address && locInfo.address[i] ? locInfo.address[i] : null
    obj.address_2 =
      locInfo.address_2 && locInfo.address_2[i] ? locInfo.address_2[i] : null
    obj.name = locInfo.name && locInfo.name[i] ? locInfo.name[i] : null
    obj.state = locInfo.state && locInfo.state[i] ? locInfo.state[i] : null
    obj.email = locInfo.email && locInfo.email[i] ? locInfo.email[i] : null
    obj.zip = locInfo.zip && locInfo.zip[i] ? locInfo.zip[i] : null
    obj.phone = locInfo.phone && locInfo.phone[i] ? locInfo.phone[i] : null
    obj.website =
      locInfo.website && locInfo.website[i] ? locInfo.website[i] : null
    obj.notes = locInfo.notes && locInfo.notes[i] ? locInfo.notes[i] : null
    obj.services =
      locInfo.services && locInfo.services[i] ? locInfo.services[i] : null
    obj.schedule = []

    organizedRecord.locations.push(obj)
  }

  const scheduleHolder: ScheduleRecord[] = []
  for (let i = 0; i < scheMaxLength; i++) {
    const obj: any = {}

    obj.location_name =
      scheInfo.location_name && scheInfo.location_name[i]
        ? scheInfo.location_name[i]
        : null
    obj.locations_id =
      scheInfo.locations_id && scheInfo.locations_id[i]
        ? scheInfo.locations_id[i]
        : null
    obj.open_time =
      scheInfo.open_time && scheInfo.open_time[i] ? scheInfo.open_time[i] : null
    obj.close_time =
      scheInfo.close_time && scheInfo.close_time[i]
        ? scheInfo.close_time[i]
        : null
    obj.day = scheInfo.day && scheInfo.day[i] ? scheInfo.day[i] : null
    obj.ordinal_open =
      scheInfo.ordinal_open && scheInfo.ordinal_open[i]
        ? scheInfo.ordinal_open[i]
        : null
    obj.notes = scheInfo.notes && scheInfo.notes[i] ? scheInfo.notes[i] : null

    scheduleHolder.push(obj)
  }

  scheduleHolder.forEach((schedule: ScheduleRecord) => {
    const loc: LocationRecord[] = organizedRecord.locations
    const matchingIdRecord: LocationRecord = loc.find(
      location => location.id === schedule.locations_id,
    )
    if (matchingIdRecord) {
      const locationTargetIndex: number = loc.indexOf(matchingIdRecord)
      loc[locationTargetIndex].schedule.push(schedule)
    }
  })

  recordSetFunction(organizedRecord)
}
