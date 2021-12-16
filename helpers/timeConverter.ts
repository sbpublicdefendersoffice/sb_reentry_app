const timeConverter = time => {
  console.log('🚀 ~ file: timeConverter.ts ~ line 2 ~ time', time)

  let militaryTime = time
  militaryTime.split(':')
  let hours = Number(militaryTime[0])
  let minutes = Number(militaryTime[0])
  let seconds = Number('00')
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
  timeValue += seconds < 10 ? ':0' + seconds : ':' + seconds // get seconds
  timeValue += hours >= 12 ? ' P.M.' : ' A.M.' // get AM/PM
  return timeValue
}
export default timeConverter
