import useLanguage from '../hooks/useLanguage'

import { ScheduleRecord } from '../types/records'
import { CopyHolder } from '../types/language'

import styles from './ScheduleRecordDisplay.module.css'

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

interface ScheduleRecordDisplayProps {
  scheduleInfo: ScheduleRecord
}

const copy: CopyHolder = {
  english: {
    timeOpen: 'Time Open',
    to: ' to ',
    daysOpen: 'Days Open',
    notes: 'Notes',
  },
  spanish: {
    timeOpen: 'Tiempo Abierto',
    to: ' a ',
    daysOpen: 'Dia Abierto',
    notes: 'Notas',
  },
}

const ScheduleRecordDisplay = ({
  scheduleInfo,
}: ScheduleRecordDisplayProps) => {
  const { language } = useLanguage()
  const activeCopy = copy[language]

  const { open_time, close_time, day, ordinal_open, notes } = scheduleInfo

  return (
    <section className={styles.ScheduleRecordDisplay}>
      {open_time && close_time && (
        <p>
          {activeCopy.timeOpen}: {timeParser(open_time)}
          {activeCopy.to}
          {timeParser(close_time)}
        </p>
      )}
      {day && (
        <p>
          {`Day${day.length > 3 ? 's' : ''}`} {activeCopy.daysOpen}: {day}
        </p>
      )}
      {ordinal_open && <p>{ordinalParser(ordinal_open)}</p>}
      {notes && (
        <p>
          {activeCopy.daysOpen}: {notes}
        </p>
      )}
    </section>
  )
}

export default ScheduleRecordDisplay
