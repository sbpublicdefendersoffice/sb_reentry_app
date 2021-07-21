export interface PGOrganizationResponse {
  id: number
  categories_english?: string[]
  categories_spanish?: string[]
  locations?: PGLocationRecord[]
  multiple_categories?: string[]
  name_english?: string
  name_spanish?: string
  single_category?: string
  tags_english?: string[]
  tags_spanish?: string[]
  website?: string
  notes_english?: string
  notes_spanish?: string
  languages_spoken_english?: string
  languages_spoken_spanish?: string
  customers_served_english?: string
  customers_served_spanish?: string
}

export interface PGLocationRecord {
  id?: number
  city: string
  latitude: number
  longitude: number
  name?: string
  address?: string
  address_2?: string
  zip?: number
  state?: string
  phone?: string
  email?: string
  notes?: string
  website?: string
  services?: PGServiceRecord[]
  schedules?: PGScheduleRecord[]
}

export interface PGServiceRecord {
  id?: number
  name_english?: string
  name_spanish?: string
}

export interface PGScheduleRecord {
  id?: number
  open_time?: string
  close_time?: string
  day?: string
  notes?: string
  ordinal_open?: string
}

export type PGOrgPlusLocation = PGOrganizationResponse & PGLocationRecord
