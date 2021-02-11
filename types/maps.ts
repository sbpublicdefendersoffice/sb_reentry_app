export type LocationInfo = {
  latitude: number
  longitude: number
  latArr: number[]
  longArr: number[]
}

export type CenterArr = [number, number]

export type BoundingArr = [CenterArr, CenterArr]

export type LocationState = {
  fitBoundsArr: BoundingArr
  centerArr: CenterArr
  zoom: number
}

export interface PopupInfo {
  clientX: number
  clientY: number
}
