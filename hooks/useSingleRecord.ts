import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'

import { POST } from '../helpers/validators'
import {
  SortedRecord,
  OrgRecord,
  Holder,
  LocationRecord,
  ScheduleRecord,
} from '../types/records'
import useLanguage from '../hooks/useLanguage'

import { SPANISH } from '../types/language'

const useSingleRecord = () => {
  const [
    singleFetchedRecord,
    setSingleFetchedRecord,
  ] = useState<OrgRecord | null>(null)

  const [sortedRecord, setSortedRecord] = useState<SortedRecord | null>(null)

  const { asPath } = useRouter()
  const { language } = useLanguage()

  const requestParams: string[] = asPath.slice(1).split('/')
  const requestReady: number = requestParams.length
  const category: string = requestParams[0]
  const id: string = requestParams[1]

  useEffect(() => {
    const airtableApiRouteFetch = async () => {
      if (requestReady && id !== '[id]') {
        const apiRequest = await fetch('/api/singleairtablerecord', {
          method: POST,
          body: JSON.stringify({ id }),
        })

        const apiResponse = await apiRequest.json()

        setSingleFetchedRecord(apiResponse)
      }
    }
    airtableApiRouteFetch()
  }, [requestReady, id, language])

  useEffect(() => {
    if (singleFetchedRecord) {
      const organizedRecord: SortedRecord = {
        locations: [],
      }

      const fetchedOrgRecord = singleFetchedRecord

      organizedRecord.id = fetchedOrgRecord.id

      const locInfo: Holder = {}
      let locMaxLength = 0

      const scheInfo: Holder = {}
      let scheMaxLength = 0

      const splitRegEx = /^(.*?\_)/

      Object.entries(fetchedOrgRecord.fields).forEach(([key, value]) => {
        const cleanedKey: string = key.replace(splitRegEx, '')
        if (key.startsWith('org')) {
          const recordsToNotCopy: string[] = [
            'org_id',
            'org_schedule',
            'org_services',
            'org_locations',
          ]
          if (!recordsToNotCopy.includes(key))
            organizedRecord[cleanedKey] = value
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

        obj.uuid = fetchedOrgRecord.id
        obj.id = locInfo.id && locInfo.id[i] ? locInfo.id[i] : null
        obj.city = locInfo.city && locInfo.city[i] ? locInfo.city[i] : null
        obj.address =
          locInfo.address && locInfo.address[i] ? locInfo.address[i] : null
        obj.address_2 =
          locInfo.address_2 && locInfo.address_2[i]
            ? locInfo.address_2[i]
            : null

        if (locInfo.name && locInfo.name[i]) {
          if (language === SPANISH) obj.name = locInfo.name_spanish[i]
          else obj.name = locInfo.name[i]
        } else obj.name = null

        obj.state = locInfo.state && locInfo.state[i] ? locInfo.state[i] : null
        obj.email = locInfo.email && locInfo.email[i] ? locInfo.email[i] : null
        obj.zip = locInfo.zip && locInfo.zip[i] ? locInfo.zip[i] : null
        obj.phone = locInfo.phone && locInfo.phone[i] ? locInfo.phone[i] : null
        obj.website =
          locInfo.website && locInfo.website[i] ? locInfo.website[i] : null

        if (locInfo.notes && locInfo.notes[i]) {
          if (language === SPANISH) obj.notes = locInfo.notes_spanish[i]
          else obj.notes = locInfo.notes[i]
        } else obj.notes = null

        obj.latitude =
          locInfo.latitude && locInfo.latitude[i] ? locInfo.latitude[i] : null
        obj.longitude =
          locInfo.longitude && locInfo.longitude[i]
            ? locInfo.longitude[i]
            : null

        if (locInfo.services && locInfo.services[i]) {
          if (language === SPANISH) obj.services = locInfo.services_spanish[i]
          else obj.services = locInfo.services[i]
        } else obj.services = null

        if (organizedRecord.name) {
          if (language === SPANISH) obj.org_name = organizedRecord.name_spanish
          else obj.org_name = organizedRecord.name
        } else obj.org_name = null

        obj.category = category ? category : null
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
          scheInfo.open_time && scheInfo.open_time[i]
            ? scheInfo.open_time[i]
            : null
        obj.close_time =
          scheInfo.close_time && scheInfo.close_time[i]
            ? scheInfo.close_time[i]
            : null
        obj.ordinal_open =
          scheInfo.ordinal_open && scheInfo.ordinal_open[i]
            ? scheInfo.ordinal_open[i]
            : null

        if (scheInfo.day && scheInfo.day[i]) {
          if (language === SPANISH) obj.day = scheInfo.day_spanish[i]
          else obj.day = scheInfo.day[i]
        } else obj.day = null

        if (scheInfo.notes && scheInfo.notes[i]) {
          if (language === SPANISH) obj.notes = scheInfo.notes_spanish[i]
          else obj.notes = scheInfo.notes[i]
        } else obj.notes = null

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

      if (language === SPANISH) {
        organizedRecord.name = organizedRecord.name_spanish
        organizedRecord.notes = organizedRecord.notes_spanish
        organizedRecord.languages_spoken =
          organizedRecord.languages_spoken_spanish
        organizedRecord.categories = organizedRecord.categories_spanish
        organizedRecord.tags = organizedRecord.tags_spanish
      }

      setSortedRecord(organizedRecord)
    }
  }, [singleFetchedRecord])

  return { sortedRecord }
}

export default useSingleRecord
