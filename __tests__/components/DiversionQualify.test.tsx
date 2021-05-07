import { renderWithLanguage } from '../../__helpers__/contexts'

import { SPANISH } from '../../constants/language'

import DiversionQualify, {
  iconsList,
  copy,
} from '../../components/DiversionQualify'

describe('<DiversionQualify />', () => {
  it('renders properly', () => {
    const { getByRole, getAllByRole } = renderWithLanguage(<DiversionQualify />)

    const [regionNode, imageNodes] = [getByRole('region'), getAllByRole('img')]

    expect(regionNode).toBeInTheDocument()
    imageNodes.forEach((node: HTMLElement, i: number) =>
      expect(node).toHaveAttribute('src', iconsList[i]),
    )
  })

  it('renders english content properly', () => {
    const { getAllByRole } = renderWithLanguage(<DiversionQualify />)
    const content: string[] = Object.values(copy.english)

    const headings: string[] = content.slice(0, 2)
    const articles: string[] = content.slice(2)

    const [headingNodes, articleNodes] = [
      getAllByRole('heading'),
      getAllByRole('article'),
    ]

    headingNodes.forEach((node: HTMLElement, i: number) =>
      expect(node).toHaveTextContent(headings[i]),
    )
    articleNodes.forEach((node: HTMLElement, i: number) =>
      expect(node).toHaveTextContent(articles[i]),
    )
  })

  it('renders spanish content properly', () => {
    const { getAllByRole } = renderWithLanguage(<DiversionQualify />, SPANISH)
    const content: string[] = Object.values(copy.spanish)

    const headings: string[] = content.slice(0, 2)
    const articles: string[] = content.slice(2)

    const [headingNodes, articleNodes] = [
      getAllByRole('heading'),
      getAllByRole('article'),
    ]

    headingNodes.forEach((node: HTMLElement, i: number) =>
      expect(node).toHaveTextContent(headings[i]),
    )
    articleNodes.forEach((node: HTMLElement, i: number) =>
      expect(node).toHaveTextContent(articles[i]),
    )
  })
})
