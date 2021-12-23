const timeConverter = time => {
  if (time.length == 4) {
    let militaryTime = time
    militaryTime.split(':')
    let hours = Number(militaryTime[0])
    let minutes = Number(militaryTime[0])

    time
    let timeValue
    if (hours > 0 && hours <= 12) {
      timeValue = '' + hours
    } else if (hours > 12) {
      timeValue = '' + (hours - 12)
    } else if (hours == 0) {
      timeValue = '12'
    }
    timeValue += minutes < 10 ? ':0' + minutes : ':' + minutes // get minutes
    timeValue += ':00'
    timeValue += hours >= 12 ? ' PM' : ' AM' // get AM/PM
    console.log(timeValue, 'in time value')
    return new Date(
      `Mon Aug 18 2014 ${timeValue} GMT-0700 (Pacific Daylight Time)`,
    )
  }
  return
}
export default timeConverter
