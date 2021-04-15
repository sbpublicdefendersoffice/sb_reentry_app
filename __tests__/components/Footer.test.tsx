import { renderWithLanguage } from '../../__helpers__'

import { staticPageRoutes, SPANISH } from '../../constants'
import Footer, { copyright, linkInfo } from '../../components/Footer'

describe('<Footer />', () => {
  it('renders language agnostic content correctly', () => {
    const { text, href } = linkInfo

    const { getByRole, getAllByRole } = renderWithLanguage(<Footer />)

    const footerNode: HTMLElement = getByRole('region')
    const copyrightNode: HTMLElement = getByRole('contentinfo')
    const lastLinkNode: HTMLElement = getAllByRole('link').pop()

    expect(footerNode).toBeInTheDocument()
    expect(lastLinkNode).toHaveAttribute('href', href)
    expect(lastLinkNode).toHaveTextContent(text)
    expect(copyrightNode).toHaveTextContent(copyright)
  })

  it('renders english specific content correctly', () => {
    const { getAllByRole } = renderWithLanguage(<Footer />)

    const linkNodes: HTMLElement[] = getAllByRole('link').slice(0, -1)

    expect(linkNodes).toHaveLength(4)
    linkNodes.forEach((node: HTMLElement, i: number) =>
      expect(node).toHaveTextContent(staticPageRoutes[i].title_english),
    )
  })

  it('renders spanish specific content correctly', () => {
    const { getAllByRole } = renderWithLanguage(<Footer />, SPANISH)

    const linkNodes: HTMLElement[] = getAllByRole('link').slice(0, -1)
    expect(linkNodes).toHaveLength(4)
    linkNodes.forEach((node: HTMLElement, i: number): void =>
      expect(node).toHaveTextContent(staticPageRoutes[i].title_spanish),
    )
  })
})
