import { Language } from './language'

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
    org_name_spanish?: string
    org_website?: string
    org_languages_spoken?: string
    org_languages_spoken_spanish?: string
    org_customers_served?: string
    org_customers_served_spanish?: string
    org_notes?: string
    org_notes_spanish?: string
    org_categories?: string[]
    org_categories_spanish?: string[]
    org_tags?: string[]
    org_tags_spanish?: string[]
    org_locations?: string[]
    org_services?: string[]
    org_schedule?: string[]
    org_id?: number
    locations_id?: number[]
    locations_city?: string[]
    location_address?: string[]
    location_address_2?: string[]
    location_name?: string[]
    location_name_spanish?: string[]
    location_state?: string[]
    location_email?: string[]
    location_zip?: number[]
    location_phone?: string[]
    location_website?: string[]
    location_notes?: string[]
    location_notes_spanish?: string[]
    location_services?: string
    location_services_spanish?: string
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
    schedule_notes_spanish?: string
  }
  id: string
}

export interface LocationRecord {
  multiple_categories?: string[]
  single_category?: string
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
  uuid?: string
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
  name_spanish?: string
  website?: string
  languages_spoken?: string
  languages_spoken_spanish?: string
  notes?: string
  notes_spanish?: string
  categories?: string[]
  categories_spanish?: string[]
  tags?: string[]
  tags_spanish?: string[]
  id?: string
  locations?: LocationRecord[]
  latitude?: number
  longitude?: number
}

export interface Feedback {
  is_useful: number
  route: string
  language: Language
  comment: string
}

export interface CardInfo {
  title_english: string
  title_spanish: string
  copy_english: string
  copy_spanish: string
  category_english?: string
  category_spanish?: string
  id: string
}
