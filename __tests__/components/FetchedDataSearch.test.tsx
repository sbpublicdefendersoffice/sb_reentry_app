import { fireEvent, waitFor } from '@testing-library/dom'

import { renderWithLanguage } from '../../__helpers__'

import { searchCopy, SPANISH } from '../../constants'
import FetchedDataSearch, {
  FetchedDataSearchProps,
} from '../../components/FetchedDataSearch'

const FetchedDataSearchTestProps: FetchedDataSearchProps = {
  displayCategory: 'Food',
  originalRecords: [{ createdTime: String(Date.now()), fields: {}, id: '' }],
  setRecords: () => {},
}

describe('<FetchedDataSearch />', () => {
  it('renders static, language agnostic content correctly', () => {
    const { getByRole, getByLabelText } = renderWithLanguage(
      <FetchedDataSearch {...FetchedDataSearchTestProps} />,
    )

    const searchNodes: HTMLElement[] = [
      getByRole('searchbox'),
      getByLabelText('Search Fetched Data'),
      getByRole('search'),
      getByRole('tooltip'),
    ]

    searchNodes.forEach((node: HTMLElement): void =>
      expect(node).toBeInTheDocument(),
    )
  })

  it('renders english specific content correctly', async () => {
    const { getByRole } = renderWithLanguage(
      <FetchedDataSearch {...FetchedDataSearchTestProps} />,
    )
    const { displayCategory } = FetchedDataSearchTestProps
    const { search, tooltip } = searchCopy.english

    const placeholderCopy: string = `${search} ${displayCategory}...`

    const [searchNode, tooltipNode] = [
      getByRole('search'),
      getByRole('tooltip'),
    ]
    fireEvent.mouseOver(tooltipNode)

    const popUpNode: HTMLElement = await waitFor(() => getByRole('note'))

    expect(searchNode).toHaveAttribute('placeholder', placeholderCopy)
    expect(popUpNode).toHaveTextContent(tooltip)
  })

  it('renders english specific content correctly', async () => {
    const { getByRole } = renderWithLanguage(
      <FetchedDataSearch {...FetchedDataSearchTestProps} />,
      SPANISH,
    )
    const { displayCategory } = FetchedDataSearchTestProps
    const { search, tooltip } = searchCopy.spanish

    const placeholderCopy: string = `${search} ${displayCategory}...`

    const [searchNode, tooltipNode] = [
      getByRole('search'),
      getByRole('tooltip'),
    ]

    fireEvent.mouseOver(tooltipNode)

    const popUpNode: HTMLElement = await waitFor(() => getByRole('note'))

    expect(searchNode).toHaveAttribute('placeholder', placeholderCopy)
    expect(popUpNode).toHaveTextContent(tooltip)
  })
})
