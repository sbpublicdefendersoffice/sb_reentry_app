export interface Accordian {
  english: AccordianProps
  spanish: AccordianProps
}
interface AccordianProps {
  title: string
  description: string
  actionClick: string
  itemOne: string
  itemOneUrl?: string
  itemTwo?: string
  itemTwoUrl?: string
  itemThree?: string
  itemThreeUrl?: string
  itemFour?: string
  itemFourUrl?: string
  itemFive?: string
  itemFiveUrl?: string
  disclaimer?: string
}
