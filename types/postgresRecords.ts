export interface PGSearchResponse {
  categories_english?: string[]
  categories_spanish?: string[]
  id: number
  locations?: PGLocationRecord[]
  name_english?: string
  name_spanish?: string
  tags_english?: string[]
  tags_spanish?: string[]
}

export interface PGLocationRecord {
  city: string
  latitude: number
  longitude: number
}
