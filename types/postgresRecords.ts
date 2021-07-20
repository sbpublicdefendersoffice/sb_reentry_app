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
}

export interface PGLocationRecord {
  city: string
  latitude: number
  longitude: number
  services?: PGServiceRecord[]
}

export interface PGServiceRecord {
  name_english?: string
  name_spanish?: string
}

export type PGOrgPlusLocation = PGOrganizationResponse & PGLocationRecord
