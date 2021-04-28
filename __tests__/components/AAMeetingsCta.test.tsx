import { renderWithLanguage } from '../../__helpers__/contexts'

import { SPANISH } from '../../constants/language'
import AAMeetingsCta, {
  copy,
  hrefs,
  linkProps,
} from '../../components/AAMeetingsCta'

describe('<AAMeetingsCta />', () => {
  it('renders language agnostic content correctly', () => {
    const { getByRole, getAllByRole } = renderWithLanguage(<AAMeetingsCta />)

    const { target, rel } = linkProps
    const hrefArr: string[] = Object.values(hrefs)

    const [regionNode, listNode] = [getByRole('region'), getByRole('list')]

    const [listitemNodes, linkNodes] = [
      getAllByRole('listitem'),
      getAllByRole('link'),
    ]

    expect(regionNode).toBeInTheDocument()
    expect(listNode).toBeInTheDocument()

    expect(listitemNodes).toHaveLength(2)
    expect(linkNodes).toHaveLength(4)

    linkNodes.forEach((node: HTMLElement, i: number) => {
      expect(node).toHaveAttribute('target', target)
      expect(node).toHaveAttribute('rel', rel)
      expect(node).toHaveAttribute('href', hrefArr[i])
    })
  })

  it('renders english specific content correctly', () => {
    const { getByRole, getAllByRole } = renderWithLanguage(<AAMeetingsCta />)

    const copyArr = Object.values(copy.english)

    const titleCopy: string = copyArr[0]
    const articleCopy: string[] = copyArr.slice(1, 3)
    const linkCopy: string[] = copyArr.slice(3)

    const titleNode: HTMLElement = getByRole('heading')

    const [articleNodes, linkNodes] = [
      getAllByRole('article'),
      getAllByRole('link'),
    ]

    expect(titleNode).toHaveTextContent(titleCopy)
    articleNodes.forEach((node: HTMLElement, i: number) =>
      expect(node).toHaveTextContent(articleCopy[i]),
    )
    linkNodes.forEach((node: HTMLElement, i: number) =>
      expect(node).toHaveTextContent(linkCopy[i]),
    )
  })

  it('renders spanish specific content correctly', () => {
    const { getByRole, getAllByRole } = renderWithLanguage(
      <AAMeetingsCta />,
      SPANISH,
    )

    const copyArr = Object.values(copy.spanish)

    const titleCopy: string = copyArr[0]
    const articleCopy: string[] = copyArr.slice(1, 3)
    const linkCopy: string[] = copyArr.slice(3)

    const titleNode: HTMLElement = getByRole('heading')

    const [articleNodes, linkNodes] = [
      getAllByRole('article'),
      getAllByRole('link'),
    ]

    expect(titleNode).toHaveTextContent(titleCopy)
    articleNodes.forEach((node: HTMLElement, i: number) =>
      expect(node).toHaveTextContent(articleCopy[i]),
    )
    linkNodes.forEach((node: HTMLElement, i: number) =>
      expect(node).toHaveTextContent(linkCopy[i]),
    )
  })
})
