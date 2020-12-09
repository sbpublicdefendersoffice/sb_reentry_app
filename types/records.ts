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
