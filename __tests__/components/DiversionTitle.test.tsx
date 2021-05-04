import { renderWithLanguage } from '../../__helpers__/contexts'
import { SPANISH } from '../../constants/language'
import DiversionTitle, { copy, src } from '../../components/DiversionTitle'

describe('<DiversionTitle />', () => {
  it('rendersproperly', () => {
    const { getByRole } = renderWithLanguage(<DiversionTitle />)

    const [regionNode, imageNode] = [getByRole('region'), getByRole('img')]

    expect(regionNode).toBeInTheDocument()
    expect(imageNode).toHaveAttribute('src', src)
  })

  it('renders english specific content properly', () => {
    const { getByRole, getAllByRole } = renderWithLanguage(<DiversionTitle />)

    const { title, whatIs, explain } = copy.english
    const articleStrings: string[] = [whatIs, explain]

    const headingNode: HTMLElement = getByRole('heading')
    const articleNodes: HTMLElement[] = getAllByRole('article')

    expect(headingNode).toHaveTextContent(title)
    articleNodes.forEach((node: HTMLElement, i: number) =>
      expect(node).toHaveTextContent(articleStrings[i]),
    )
  })

  it('renders spanish specific content properly', () => {
    const { getByRole, getAllByRole } = renderWithLanguage(
      <DiversionTitle />,
      SPANISH,
    )

    const { title, whatIs, explain } = copy.spanish
    const articleStrings: string[] = [whatIs, explain]

    const headingNode: HTMLElement = getByRole('heading')
    const articleNodes: HTMLElement[] = getAllByRole('article')

    expect(headingNode).toHaveTextContent(title)
    articleNodes.forEach((node: HTMLElement, i: number) =>
      expect(node).toHaveTextContent(articleStrings[i]),
    )
  })
})
