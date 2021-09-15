import { dummyPGOrgRecord, renderWithLanguage } from '../../__helpers__/'
import GlobalSearchResult, {
  GlobalSearchResultProps,
} from '../../components/GlobalSearchResult'
import { SPANISH } from '../../constants/language'

const globalSearchResultTestProps: GlobalSearchResultProps = {
  record: dummyPGOrgRecord,
  searchQuery: '',
  delimiter: ', ',
  setIsFocused: () => {},
}

describe('<GlobalSearchResult />', () => {
  it('renders language agnostic content correctly', () => {
    const { getByRole } = renderWithLanguage(
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
    const { getByRole } = renderWithLanguage(
      <GlobalSearchResult {...globalSearchResultTestProps} />,
    )
    const { record, delimiter } = globalSearchResultTestProps
    const { name_english, tags_english } = record

    const [nameNode, termsNode] = [getByRole('heading'), getByRole('term')]

    expect(nameNode).toHaveTextContent(name_english)
    expect(termsNode).toHaveTextContent(tags_english.join(delimiter))
  })

  it('renders spanish specific content correctly', () => {
    const { getByRole } = renderWithLanguage(
      <GlobalSearchResult
        {...globalSearchResultTestProps}
        record={{ ...dummyPGOrgRecord, name_english: '', tags_english: null }}
      />,
      SPANISH,
    )
    const { record, delimiter } = globalSearchResultTestProps
    const { name_spanish, tags_spanish } = record

    const [nameNode, termsNode] = [getByRole('heading'), getByRole('term')]

    expect(nameNode).toHaveTextContent(name_spanish)
    expect(termsNode).toHaveTextContent(tags_spanish.join(delimiter))
  })

  it('shows outline heart if favorite icon is not clicked', () => {
    const { getByTestId } = renderWithLanguage(
      <GlobalSearchResult {...globalSearchResultTestProps} />,
    )
    const outLineHeart: HTMLElement = getByTestId('outline-heart')

    expect(outLineHeart).toBeInTheDocument()
  })
})
