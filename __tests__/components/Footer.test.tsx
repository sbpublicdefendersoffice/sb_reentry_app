import { renderWithLanguage } from '../../__helpers__'

import { SPANISH, PrivacyPolicyRoute } from '../../constants'
import Footer, { copyright } from '../../components/Footer'

describe('<Footer />', () => {
  it('renders language agnostic content correctly', () => {
    const { getByRole } = renderWithLanguage(<Footer />)

    const footerNode: HTMLElement = getByRole('region')
    const copyrightNode: HTMLElement = getByRole('contentinfo')
    // const lastLinkNode: HTMLElement = getAllByRole('link').pop()

    expect(footerNode).toBeInTheDocument()
    // expect(lastLinkNode).toHaveAttribute('href', '/privacypolicy')
    // expect(lastLinkNode).toHaveTextContent('Privacy Policy')
    expect(copyrightNode).toHaveTextContent(copyright)
  })

  it('renders english specific content correctly', () => {
    const { getAllByRole } = renderWithLanguage(<Footer />)

    const linkNodes: HTMLElement[] = getAllByRole('term').slice(0, -1)

    expect(linkNodes).toHaveLength(0)
    linkNodes.forEach((node: HTMLElement, i: number) =>
      expect(node).toHaveTextContent(PrivacyPolicyRoute[i].title_english),
    )
  })

  it('renders spanish specific content correctly', () => {
    const { getAllByRole } = renderWithLanguage(<Footer />, SPANISH)

    const linkNodes: HTMLElement[] = getAllByRole('term').slice(0, -1)
    expect(linkNodes).toHaveLength(0)
    linkNodes.forEach((node: HTMLElement, i: number): void =>
      expect(node).toHaveTextContent(PrivacyPolicyRoute[i].title_spanish),
    )
  })
})
