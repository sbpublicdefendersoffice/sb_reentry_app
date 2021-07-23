import {
  renderWithLanguage,
  dummyScheduleRecord,
  blankScheduleRecord,
} from '../../__helpers__'

import { ENGLISH, SPANISH } from '../../constants/language'

import ScheduleRecordDisplay, {
  copy,
  ordinalParser,
  timeParser,
  daysOpenParser,
} from '../../components/ScheduleRecordDisplay'

describe('<ScheduleRecordDisplay />', () => {
  it('renders correctly with no data', () => {
    const { getByRole, getAllByRole } = renderWithLanguage(
      <ScheduleRecordDisplay {...blankScheduleRecord} />,
    )

    const displayNode: HTMLElement = getByRole('region')

    expect(displayNode).toBeInTheDocument()

    expect(() => getAllByRole('article')).toThrowError()
  })

  it('renders correctly with schedule data', () => {
    const { getAllByRole } = renderWithLanguage(
      <ScheduleRecordDisplay {...dummyScheduleRecord} />,
    )

    const textNodes: HTMLElement[] = getAllByRole('article')

    expect(textNodes).toHaveLength(4)
  })

  it('renders correctly in english', () => {
    const { getAllByRole } = renderWithLanguage(
      <ScheduleRecordDisplay {...dummyScheduleRecord} />,
      ENGLISH,
    )

    const { timeOpen, to, day, open, notes } = copy.english

    const textNodes: HTMLElement[] = getAllByRole('article')

    const dayOpenValue: string = `${daysOpenParser(
      day,
      dummyScheduleRecord.day,
      open,
    )}: ${dummyScheduleRecord.day}`

    const timesOpenvalue: string = `${timeOpen}: ${timeParser(
      dummyScheduleRecord.open_time,
    )}${to}${timeParser(dummyScheduleRecord.close_time)}`

    const ordinalValue: string = ordinalParser(
      dummyScheduleRecord.ordinal_open,
      { language: ENGLISH },
    )

    const notesValue: string = `${notes}: ${dummyScheduleRecord.notes}`

    expect(textNodes[0]).toHaveTextContent(dayOpenValue)
    expect(textNodes[1]).toHaveTextContent(timesOpenvalue)
    expect(textNodes[2]).toHaveTextContent(ordinalValue)
    expect(textNodes[3]).toHaveTextContent(notesValue)
  })

  it('renders correctly in spanish', () => {
    const { getAllByRole } = renderWithLanguage(
      <ScheduleRecordDisplay {...dummyScheduleRecord} />,
      SPANISH,
    )

    const { timeOpen, to, day, open, notes } = copy.spanish

    const textNodes: HTMLElement[] = getAllByRole('article')

    const dayOpenValue: string = `${daysOpenParser(
      day,
      dummyScheduleRecord.day,
      open,
    )}: ${dummyScheduleRecord.day}`

    const timesOpenvalue: string = `${timeOpen}: ${timeParser(
      dummyScheduleRecord.open_time,
    )}${to}${timeParser(dummyScheduleRecord.close_time)}`

    const ordinalValue: string = ordinalParser(
      dummyScheduleRecord.ordinal_open,
      { language: SPANISH },
    )

    const notesValue: string = `${notes}: ${dummyScheduleRecord.notes}`

    expect(textNodes[0]).toHaveTextContent(dayOpenValue)
    expect(textNodes[1]).toHaveTextContent(timesOpenvalue)
    expect(textNodes[2]).toHaveTextContent(ordinalValue)
    expect(textNodes[3]).toHaveTextContent(notesValue)
  })
})
