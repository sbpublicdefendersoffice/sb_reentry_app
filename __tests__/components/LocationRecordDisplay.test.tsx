import {
  renderWithAllContext,
  dummyScheduleRecord,
  blankLocationRecord,
  dummyLocationRecord,
} from '../__helpers__'

import LocationRecordDisplay, {
  copy,
} from '../../components/LocationRecordDisplay'
import { SPANISH } from '../../constants/language'

const id: string = '1234567890'

const generalGoogleMapsLink: RegExp = /^https:\/\/www\.google\.com\/maps\/place\/.*$/
const directionGoogleMapsLink: RegExp = /^https:\/\/www\.google\.com\/maps\/dir\/.*$/

describe('<LocationRecordDisplay />', () => {
  it('renders correctly', () => {
    const { getByRole } = renderWithAllContext(
      <LocationRecordDisplay locationInfo={blankLocationRecord} id={id} />,
    )

    const displayNode: HTMLElement = getByRole('list')

    expect(displayNode).toBeInTheDocument()
  })

  it('does not display data when location record is blank', () => {
    const { getAllByRole } = renderWithAllContext(
      <LocationRecordDisplay locationInfo={blankLocationRecord} id={id} />,
    )

    expect(() => getAllByRole('listitem')).toThrowError()
  })

  it('does not display schedule data when schedule info is blank', () => {
    const { getAllByRole } = renderWithAllContext(
      <LocationRecordDisplay
        locationInfo={{
          ...dummyLocationRecord,
          schedule: [],
        }}
        id={id}
      />,
    )

    const dataNodes: HTMLElement[] = getAllByRole('listitem')

    expect(dataNodes).toHaveLength(7)
  })

  it('displays data when location record is not blank', () => {
    const { getAllByRole } = renderWithAllContext(
      <LocationRecordDisplay
        locationInfo={{
          ...dummyLocationRecord,
          schedule: [dummyScheduleRecord],
        }}
        id={id}
      />,
    )

    const dataNodes: HTMLElement[] = getAllByRole('listitem')

    expect(dataNodes).toHaveLength(8)
  })

  it('displays english language content correctly', () => {
    const { getAllByRole } = renderWithAllContext(
      <LocationRecordDisplay
        locationInfo={{
          ...dummyLocationRecord,
          schedule: [dummyScheduleRecord],
        }}
        id={id}
      />,
    )

    const englishNodes: HTMLElement[] = getAllByRole('note')
    const textArray: string[] = Object.values(copy.english)

    expect(englishNodes).toHaveLength(8)
    englishNodes.forEach((node: HTMLElement, i: number) =>
      expect(node).toHaveTextContent(textArray[i]),
    )
  })

  it('displays spanish language content correctly', () => {
    const { getAllByRole } = renderWithAllContext(
      <LocationRecordDisplay
        locationInfo={{
          ...dummyLocationRecord,
          schedule: [dummyScheduleRecord],
        }}
        id={id}
      />,
      { language: SPANISH },
    )

    const spanishNodes: HTMLElement[] = getAllByRole('note')
    const textArray: string[] = Object.values(copy.spanish)

    expect(spanishNodes).toHaveLength(8)
    spanishNodes.forEach((node: HTMLElement, i: number) =>
      expect(node).toHaveTextContent(textArray[i]),
    )
  })

  it('renders a general link to google maps when user is NOT in santa barbara county', () => {
    const { getAllByRole } = renderWithAllContext(
      <LocationRecordDisplay locationInfo={dummyLocationRecord} id={id} />,
      { sbCoords: { isInSBCounty: false } },
    )

    const googleMapsLink: HTMLElement = getAllByRole('note')[1]

    expect(googleMapsLink).toHaveAttribute(
      'href',
      expect.stringMatching(generalGoogleMapsLink),
    )
  })

  it('renders a link to google maps with directions when user is in santa barbara county', () => {
    const { getAllByRole } = renderWithAllContext(
      <LocationRecordDisplay locationInfo={dummyLocationRecord} id={id} />,
      { sbCoords: { isInSBCounty: true } },
    )

    const googleMapsLink: HTMLElement = getAllByRole('note')[1]

    expect(googleMapsLink).toHaveAttribute(
      'href',
      expect.stringMatching(directionGoogleMapsLink),
    )
  })
})
