import { weekday } from '../constants'

const isOpenNow = scheduleInfo => {
  const { open_time, close_time, days } = scheduleInfo
  const now = new Date()
  const dayofWeek = weekday[now.getDay()]
  const time = now.toTimeString().substr(0, 5)
  if (open_time <= time && close_time >= time && days?.includes(dayofWeek)) {
    return true
  } else {
    return false
  }
}

export default isOpenNow
