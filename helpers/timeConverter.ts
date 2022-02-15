const timeConverter = time => {
  let militaryTime = time
  let splitTime = militaryTime.split(':')
  let hours = splitTime[0]
  let minutes = splitTime[1]
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
  return `Mon Aug 18 2014 ${timeValue} GMT-0700 (Pacific Daylight Time)`
}
export default timeConverter
