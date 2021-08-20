export interface RouteInfo {
  title_english?: string
  title_spanish?: string
  route: string
  imgPath?: string
  itemOne_english?: string
  itemOne_spanish?: string
  itemOneRoute?: string
  itemTwo_english?: string
  itemTwo_spanish?: string
  itemTwoRoute?: string
  itemThree_english?: string
  itemThree_spanish?: string
  itemThreeRoute?: string
  itemFour_english?: string
  itemFour_spanish?: string
  itemFourRoute?: string
  itemFive_english?: string
  itemFive_spanish?: string
  itemFiveRoute?: string
  itemSix_english?: string
  itemSix_spanish?: string
  itemSixRoute?: string
}

export interface InfoWithDescription extends RouteInfo {
  text_english: string
  text_spanish: string
}
