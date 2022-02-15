const createDailySchedule = schedules => {
  let combinedSchedule = {
    sun: 'Closed',
    mon: 'Closed',
    tue: 'Closed',
    wed: 'Closed',
    thu: 'Closed',
    fri: 'Closed',
    sat: 'Closed',
  }

  schedules?.map(({ days, open_time, close_time }) => {
    if (days.includes('Sun') && combinedSchedule.sun == 'Closed') {
      combinedSchedule.sun = getTimes(open_time, close_time)
    }

    if (days.includes('Mon') && combinedSchedule.mon == 'Closed') {
      combinedSchedule.mon = getTimes(open_time, close_time)
    }

    if (days.includes('Tue') && combinedSchedule.tue == 'Closed') {
      combinedSchedule.tue = getTimes(open_time, close_time)
    }

    if (days.includes('Wed') && combinedSchedule.wed == 'Closed') {
      combinedSchedule.wed = getTimes(open_time, close_time)
    }

    if (days.includes('Thu') && combinedSchedule.thu == 'Closed') {
      combinedSchedule.thu = getTimes(open_time, close_time)
    }

    if (days.includes('Fri') && combinedSchedule.fri == 'Closed') {
      combinedSchedule.fri = getTimes(open_time, close_time)
    }

    if (days.includes('Sat') && combinedSchedule.sat == 'Closed') {
      combinedSchedule.sat = getTimes(open_time, close_time)
    }
  })

  return combinedSchedule
}
export default createDailySchedule

const getTimes = (open, close) => {
  if (open === null || close === null) {
    return `Closed`
  }

  return `${convertToStandardTime(open)} - ${convertToStandardTime(close)}`
}

const convertToStandardTime = time => {
  var time = time.split(':')
  var hours = Number(time[0])
  var min = Number(time[1])

  var convertedTime

  if (hours > 0 && hours <= 12) {
    convertedTime = '' + hours
  } else if (hours > 12) {
    convertedTime = '' + (hours - 12)
  } else if (hours == 0) {
    convertedTime = '12'
  }

  convertedTime += min < 10 ? ':0' + min : ':' + min // get minutes
  convertedTime += hours >= 12 ? ' P.M.' : ' A.M.'

  return convertedTime
}
