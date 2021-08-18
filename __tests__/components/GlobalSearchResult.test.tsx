import { render } from '@testing-library/react'

import { dummyPGOrgRecord } from '../../__helpers__/dummyData'
import GlobalSearchResult, {
  GlobalSearchResultProps,
} from '../../components/GlobalSearchResult'

const globalSearchResultTestProps: GlobalSearchResultProps = {
  record: dummyPGOrgRecord,
  searchQuery: '',
  delimiter: ', ',
  setIsFocused: () => {},
}

describe('<GlobalSearchResult />', () => {
  it('renders language agnostic content correctly', () => {
    const { getByRole } = render(
      <GlobalSearchResult {...globalSearchResultTestProps} />,
    )

    const imgSrc: string =
      globalSearchResultTestProps.record.multiple_categories[0]

    const [liNode, imgNode] = [getByRole('listitem'), getByRole('img')]

    expect(liNode).toBeInTheDocument()

    expect(imgNode).toHaveAttribute(
      'src',
      `/icons/${imgSrc.replace(' ', '')}.svg`,
    )
    expect(imgNode).toHaveAttribute('alt', `${imgSrc}_icon`)
  })

  it('renders english specific content correctly', () => {
    const { getByRole } = render(
      <GlobalSearchResult {...globalSearchResultTestProps} />,
    )
    const { record, delimiter } = globalSearchResultTestProps
    const { name_english, tags_english } = record

    const [nameNode, termsNode] = [getByRole('heading'), getByRole('term')]

    expect(nameNode).toHaveTextContent(name_english)
    expect(termsNode).toHaveTextContent(tags_english.join(delimiter))
  })

  it('renders spanish specific content correctly', () => {
    const { getByRole } = render(
      <GlobalSearchResult
        {...globalSearchResultTestProps}
        record={{ ...dummyPGOrgRecord, name_english: '', tags_english: null }}
      />,
    )
    const { record, delimiter } = globalSearchResultTestProps
    const { name_spanish, tags_spanish } = record

    const [nameNode, termsNode] = [getByRole('heading'), getByRole('term')]

    expect(nameNode).toHaveTextContent(name_spanish)
    expect(termsNode).toHaveTextContent(tags_spanish.join(delimiter))
  })

  it('shows outline heart if favorite icon is not clicked', () => {
    const { getByTestId } = render(
      <GlobalSearchResult {...globalSearchResultTestProps} />,
    )
    const outLineHeart: HTMLElement = getByTestId('outline-heart')

    expect(outLineHeart).toBeInTheDocument()
  })
})
