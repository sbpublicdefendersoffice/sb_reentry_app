export type Holder = { [title: string]: Array<string | number> }

export interface TranslatedRecordResponse {
  offset?: string
  category: string
  records: OrgRecord[]
}

export interface OrgRecord {
  createdTime: string
  fields: {
    org_name?: string
    org_website?: string
    org_languages_spoken?: string
    org_notes?: string
    org_categories?: string[]
    org_tags?: string[]
    org_locations?: string[]
    org_services?: string[]
    org_schedule?: string[]
    org_id?: number
    locations_id?: number[]
    locations_city?: string[]
    location_address?: string[]
    location_address_2?: string[]
    location_name?: string[]
    location_state?: string[]
    location_email?: string[]
    location_zip?: number[]
    location_phone?: string[]
    location_website?: string[]
    location_notes?: string[]
    location_services?: string
    location_latitude?: number[]
    location_longitude?: number[]
    services_names?: string[]
    services_id?: number[]
    schedule_location_name?: string
    schedule_locations_id?: number[]
    schedule_open_time?: string[]
    schedule_close_time?: string[]
    schedule_day?: string
    schedule_ordinal_open?: string
    schedule_notes?: string
  }
  id: string
}

export interface LocationRecord {
  category?: string
  id?: number
  city?: string
  address?: string
  address_2?: string
  name?: string
  state?: string
  email?: string
  zip?: number
  phone?: string
  website?: string
  notes?: string
  services?: string
  org_name?: string
  latitude?: number
  longitude?: number
  schedule?: ScheduleRecord[]
}

export interface ScheduleRecord {
  location_name?: string
  locations_id?: number
  open_time?: string
  close_time?: string
  day?: string
  ordinal_open?: string
  notes?: string
}

export interface SortedRecord {
  name?: string
  website?: string
  languages_spoken?: string
  notes?: string
  categories?: string[]
  tags?: string[]
  id?: string
  locations?: LocationRecord[]
  latitude?: number
  longitude?: number
}
