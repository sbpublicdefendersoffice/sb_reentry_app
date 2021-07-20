export interface PGResponse {
  categories_english?: string[]
  categories_spanish?: string[]
  id: number
  locations?: PGLocationRecord[]
  multiple_categories?: string[]
  name_english?: string
  name_spanish?: string
  single_category?: string
  tags_english?: string[]
  tags_spanish?: string[]
}

export interface PGLocationRecord extends PGResponse {
  city: string
  latitude: number
  longitude: number
}
