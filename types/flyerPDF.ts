export interface FlyerPDF {
  english: Item
  spanish: Item
}
export interface Item {
  name: string
  organization: string
  flyerPDF: string
}
export interface RightsLinks {
  name: string
  href: string
}
