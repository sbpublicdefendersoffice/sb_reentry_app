import { ScheduleRecord } from '../types/records'

import styles from './ScheduleRecordDisplay.module.css'

interface ScheduleRecordDisplayProps {
  scheduleInfo: ScheduleRecord
}

const timeParser = (timeStr: string): string => {
  const splitTime: Array<string | number> = timeStr.split(':')
  splitTime[0] = +splitTime[0]
  const amOrPm: string = splitTime[0] > 11 && splitTime[0] < 24 ? 'PM' : 'AM'
  if (!splitTime[0] || splitTime[0] === 12) splitTime[0] = '12'
  else if (splitTime[0] > 12) splitTime[0] = String(splitTime[0] - 12)
  return `${splitTime[0]}:${splitTime[1]} ${amOrPm}`
}

const ordinalParser = (days: string): string =>
  days === '1, 2, 3, 4, 5'
    ? 'Open Every Week'
    : `Open ${days
        .replace('1', 'First')
        .replace('2', 'Second')
        .replace('3', 'Third')
        .replace('4', 'Fourth')
        .replace('5', 'Fifth')} week${days.length > 1 && 's'} of the month.`

const ScheduleRecordDisplay = ({
  scheduleInfo,
}: ScheduleRecordDisplayProps) => {
  const { open_time, close_time, day, ordinal_open, notes } = scheduleInfo

  return (
    <section className={styles.ScheduleRecordDisplay}>
      {open_time && close_time && (
        <p>
          Time Open: {timeParser(open_time)} to {timeParser(close_time)}
        </p>
      )}
      {day && (
        <p>
          {`Day${day.length > 3 ? 's' : ''}`} Open: {day}
        </p>
      )}
      {ordinal_open && <p>{ordinalParser(ordinal_open)}</p>}
      {notes && <p>Notes: {notes}</p>}
    </section>
  )
}

export default ScheduleRecordDisplay
