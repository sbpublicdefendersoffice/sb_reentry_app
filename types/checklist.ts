export interface Checklist {
  english: Item
  spanish: Item
}
interface Item {
  listItem: string
  description: string
  action: string
  item1: string
  href1: string
  item2: string
  href2: string
  item3?: string
  href3?: string
  item4?: string
  href4?: string
  item5?: string
  href5?: string
  disclaimer?: string
  pantry?: string
  pantryItem?: string
}
