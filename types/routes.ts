export interface RouteInfo {
  title_english: string
  title_spanish: string
  route: string
  imgPath?: string
}

export interface InfoWithDescription extends RouteInfo {
  text_english: string
  text_spanish: string
}
