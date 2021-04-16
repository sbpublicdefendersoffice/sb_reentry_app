import {
  renderWithLanguage,
  renderWithAllContext,
  dummySortedRecord,
} from '../../__helpers__'

import { SPANISH } from '../../constants/language'

import OrgRecordDisplay, { copy } from '../../components/OrgRecordDisplay'

describe('<OrgRecordDisplay />', () => {
  it('renders correctly with no data passed down', () => {
    const { getByRole } = renderWithLanguage(
      <OrgRecordDisplay sortedRecord={{}} />,
    )

    const [recordDisplayNode, titleNode, disclaimerNode] = [
      getByRole('menu'),
      getByRole('heading'),
      getByRole('article'),
    ]

    expect(recordDisplayNode).toBeInTheDocument()
    expect(disclaimerNode).toBeInTheDocument()
    expect(titleNode).toHaveTextContent('')

    expect(() => getByRole('list')).toThrowError()
  })

  it('renders correctly when data IS passed down', () => {
    const { getByText } = renderWithAllContext(
      <OrgRecordDisplay sortedRecord={dummySortedRecord} />,
    )
    const passedDownTextValues: string[] = Object.values(
      dummySortedRecord,
    ).slice(0, -1)

    passedDownTextValues.forEach((text: string) =>
      expect(getByText(text)).toBeInTheDocument(),
    )
  })

  it('renders english specific content correctly', () => {
    const { getAllByRole } = renderWithAllContext(
      <OrgRecordDisplay sortedRecord={dummySortedRecord} />,
    )

    const textValues: string[] = Object.values(copy.english).slice(1)

    textValues.forEach((text: string, i: number) =>
      expect(getAllByRole('term')[i]).toHaveTextContent(text),
    )
  })

  it('renders spanish specific content correctly', () => {
    const { getAllByRole } = renderWithAllContext(
      <OrgRecordDisplay sortedRecord={dummySortedRecord} />,
      { language: SPANISH },
    )

    const textValues: string[] = Object.values(copy.spanish).slice(1)

    textValues.forEach((text: string, i: number) =>
      expect(getAllByRole('term')[i]).toHaveTextContent(text),
    )
  })
})
