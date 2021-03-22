export interface CountyBreakdown {
  southCounty: string[]
  centralCounty: string[]
  northCounty: string[]
}
export interface PopupInfo {
  clientX: number
  clientY: number
}

export interface LocationInfo {
  latitude: number
  longitude: number
  latArr: number[]
  longArr: number[]
}

export type CenterArr = [number, number]

export type BoundingArr = [CenterArr, CenterArr]

export interface LocationState {
  fitBoundsArr: BoundingArr
  centerArr: CenterArr
  zoom: number
}
