export interface FieldInfo {
  box_width?: number
  x: number
  y: number
}

export interface Fields {
  [field_name: string]: {
    english: FieldInfo
    spanish: FieldInfo
  }
}
