import { renderWithLanguage } from '../../__helpers__/contexts'
import { SPANISH } from '../../constants/language'
import LetUsHelpIndexTitle from '../../components/LetUsHelpIndexTitle'
import { copy, src } from '../../pages/letushelp/diversion'

describe('<LetUsHelpIndexTitle />', () => {
  it('renders properly', () => {
    const { title, whatIs, explain } = copy.english
    const englishProps = { src, title, whatIs, explain }

    const { getByRole } = renderWithLanguage(
      <LetUsHelpIndexTitle {...englishProps} />,
    )

    const [regionNode, imageNode] = [getByRole('region'), getByRole('img')]

    expect(regionNode).toBeInTheDocument()
    expect(imageNode).toHaveAttribute('src', src)
  })

  it('renders english specific content properly', () => {
    const { title, whatIs, explain } = copy.english
    const englishProps = { src, title, whatIs, explain }

    const { getByRole, getAllByRole } = renderWithLanguage(
      <LetUsHelpIndexTitle {...englishProps} />,
    )

    const articleStrings: string[] = [whatIs, explain]

    const headingNode: HTMLElement = getByRole('heading')
    const articleNodes: HTMLElement[] = getAllByRole('article')

    expect(headingNode).toHaveTextContent(title)
    articleNodes.forEach((node: HTMLElement, i: number) =>
      expect(node).toHaveTextContent(articleStrings[i]),
    )
  })

  it('renders spanish specific content properly', () => {
    const { title, whatIs, explain } = copy.spanish
    const spanishProps = { src, title, whatIs, explain }

    const { getByRole, getAllByRole } = renderWithLanguage(
      <LetUsHelpIndexTitle {...spanishProps} />,
      SPANISH,
    )

    const articleStrings: string[] = [whatIs, explain]

    const headingNode: HTMLElement = getByRole('heading')
    const articleNodes: HTMLElement[] = getAllByRole('article')

    expect(headingNode).toHaveTextContent(title)
    articleNodes.forEach((node: HTMLElement, i: number) =>
      expect(node).toHaveTextContent(articleStrings[i]),
    )
  })
})
