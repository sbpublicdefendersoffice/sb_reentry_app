const weekday = new Array(7)
weekday[0] = 'Sun'
weekday[1] = 'Mon'
weekday[2] = 'Tues'
weekday[3] = 'Wed'
weekday[4] = 'Thu'
weekday[5] = 'Fri'
weekday[6] = 'Sat'
const useOpenNow = scheduleInfo => {
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
export default useOpenNow
