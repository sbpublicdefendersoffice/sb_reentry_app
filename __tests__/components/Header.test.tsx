import { act } from '@testing-library/react'
import { renderWithLanguage, resizeWindow } from '../__helpers__'

import { SPANISH, staticPageRoutes } from '../../constants'

import Header from '../../components/Header'

describe('<Header />', () => {
  it('renders language agnostic content correctly', () => {
    const { getByRole } = renderWithLanguage(<Header />)

    const headerNodes: HTMLElement[] = [
      'banner',
      'img',
      'navigation',
      'menu',
    ].map((role: string) => getByRole(role))

    headerNodes.forEach((node: HTMLElement) => expect(node).toBeInTheDocument())
  })

  it('renders english specific content correctly', () => {
    const { getAllByRole } = renderWithLanguage(<Header />)

    const routeNodes: HTMLElement[] = getAllByRole('term')

    routeNodes.forEach((node: HTMLElement, i: number) =>
      expect(node).toHaveTextContent(staticPageRoutes[i].title_english),
    )
  })

  it('renders spanish specific content correctly', () => {
    const { getAllByRole } = renderWithLanguage(<Header />, SPANISH)

    const routeNodes: HTMLElement[] = getAllByRole('term')

    routeNodes.forEach((node: HTMLElement, i: number) =>
      expect(node).toHaveTextContent(staticPageRoutes[i].title_spanish),
    )
  })

  it('does not render burger above 700px screen width', () => {
    const { getByRole } = renderWithLanguage(<Header />)

    expect(() => getByRole('button')).toThrowError()
  })

  it('renders 4 static page links above 700px screen width', () => {
    const { getAllByRole } = renderWithLanguage(<Header />)

    const routeNodes: HTMLElement[] = getAllByRole('term')

    expect(routeNodes).toHaveLength(4)
  })

  it('does render burger at or below 700px screen width', () => {
    const { getByRole } = renderWithLanguage(<Header />)

    act(() => resizeWindow(700))

    const burgerButtonNode: HTMLElement = getByRole('button')

    expect(burgerButtonNode).toBeInTheDocument()
  })

  it('renders 8 static page links at or below 700px screen width', () => {
    const { getAllByRole } = renderWithLanguage(<Header />)

    const routeNodes: HTMLElement[] = getAllByRole('term')

    expect(routeNodes).toHaveLength(8)
  })
})
