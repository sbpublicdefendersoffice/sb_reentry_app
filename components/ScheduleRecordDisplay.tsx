import { useLanguage, useOpenNow } from '../hooks/'
import React, { useState, useEffect } from 'react'
import { CopyHolder, Language } from '../types'

import { Paragraph } from '../ui'
import { Button } from '@material-ui/core/'

import styles from './ScheduleRecordDisplay.module.css'

export const copy: CopyHolder = {
  english: {
    timeOpen: 'Time Open',
    to: ' to ',
    day: 'Day',
    open: 'Open',
    notes: 'Notes',
    everyWeek: 'Open Every Week',
    first: 'First',
    second: 'Second',
    third: 'Third',
    fourth: 'Fourth',
    fifth: 'Fifth',
    week: 'week',
    ofMonth: 'of the month.',
  },
  spanish: {
    timeOpen: 'Tiempo Abierto',
    to: ' a ',
    day: 'Days',
    open: 'Abierto',
    notes: 'Notas',
    everyWeek: 'Abierto Todas Las Semanas',
    first: 'Primero',
    second: 'Segundo',
    third: 'Tercero',
    fourth: 'Cuarto',
    fifth: 'Quinto',
    week: 'semana',
    ofMonth: 'del mes.',
  },
}

export const ordinalParser = (
  days: string,
  langOption: { language: Language },
): string => {
  const { language } = langOption
  const activeCopy = copy[language]
  const { everyWeek, first, second, third, fourth, fifth, week, ofMonth } =
    activeCopy
  return days === '1, 2, 3, 4, 5'
    ? everyWeek
    : `Open ${days
        .replace('1', first)
        .replace('2', second)
        .replace('3', third)
        .replace('4', fourth)
        .replace('5', fifth)} ${week}${days.length > 1 && 's'} ${ofMonth}.`
}
export const timeParser = (timeStr: string): string => {
  const splitTime: Array<string | number> = timeStr.split(':')
  splitTime[0] = +splitTime[0]
  const amOrPm: string = splitTime[0] > 11 && splitTime[0] < 24 ? 'PM' : 'AM'
  if (!splitTime[0] || splitTime[0] === 12) splitTime[0] = '12'
  else if (splitTime[0] > 12) splitTime[0] = String(splitTime[0] - 12)
  return `${splitTime[0]}:${splitTime[1]} ${amOrPm}`
}
export const daysOpenParser = (
  wordForDay: string,
  specificDay: string,
  wordForOpen: string,
): string => `${wordForDay}${specificDay?.length > 3 ? 's' : ''} ${wordForOpen}`
interface ScheduleRecordDisplayProps {
  open_time?: string
  close_time?: string
  days?: string
  notes?: string
  ordinal_open?: string
}
const ScheduleRecordDisplay = ({
  open_time,
  close_time,
  days,
  ordinal_open,
  notes,
}: ScheduleRecordDisplayProps) => {
  const { language } = useLanguage()

  const activeCopy = copy[language]
  const initialOpen = useOpenNow({
    open_time,
    close_time,
    days,
    ordinal_open,
    notes,
  })

  const [isOpen, setIsOpen] = useState(initialOpen)

  useEffect(() => {
    const interval = setInterval(() => {
      const isOpenChecker = useOpenNow({
        open_time,
        close_time,
        days,
        ordinal_open,
        notes,
      })

      setIsOpen(isOpenChecker)
    }, 15000)
    return () => {
      clearInterval(interval)
    }
  }, [isOpen])

  return (
    <section role="region" className={styles.ScheduleRecordDisplay}>
      {days && (
        <Paragraph role="article" size="med-text">
          <strong>
            {daysOpenParser(activeCopy.day, days, activeCopy.open)}
          </strong>
          : {days}
        </Paragraph>
      )}
      {isOpen ? (
        <Button
          style={{
            backgroundColor: '#005EA2',
            color: 'white',
            fontSize: '1rem',
            fontFamily: 'sans-serif',
          }}
        >
          Open Now
        </Button>
      ) : (
        <Button
          style={{
            backgroundColor: 'red',
            color: 'white',
            fontSize: '1rem',
            fontFamily: 'sans-serif',
          }}
        >
          Closed
        </Button>
      )}
      {open_time && close_time && (
        <Paragraph role="article" size="med-text">
          <strong>{activeCopy.timeOpen}: </strong>
          {timeParser(open_time)}
          {activeCopy.to}
          {timeParser(close_time)}
        </Paragraph>
      )}
      {ordinal_open && (
        <Paragraph role="article" size="med-text">
          {ordinalParser(ordinal_open, { language })}
        </Paragraph>
      )}
      {notes && (
        <Paragraph role="article" size="med-text">
          <strong>{activeCopy.notes}:</strong> {notes}
        </Paragraph>
      )}
    </section>
  )
}
export default ScheduleRecordDisplay
