import { act, fireEvent } from '@testing-library/react'
import { resizeWindow, renderWithAllContext } from '../../__helpers__'

import { SPANISH, staticPageRoutes } from '../../constants'

import Header from '../../components/Header'

describe('<Header />', () => {
  it('renders language agnostic content correctly', () => {
    const { getByRole, getAllByRole } = renderWithAllContext(<Header />)

    const headerNodes: HTMLElement[] = ['banner', 'navigation', 'menu'].map(
      (role: string) => getByRole(role),
    )

    const imgNode: HTMLElement = getAllByRole('img')[0]

    const allNodes: HTMLElement[] = [...headerNodes, imgNode]

    allNodes.forEach((node: HTMLElement) => expect(node).toBeInTheDocument())
  })

  it('renders english specific content correctly', () => {
    const { getAllByRole } = renderWithAllContext(<Header />)

    const routeNodes: HTMLElement[] = getAllByRole('term')

    routeNodes.forEach((node: HTMLElement, i: number) =>
      expect(node).toHaveTextContent(staticPageRoutes[i].title_english),
    )
  })

  it('renders spanish specific content correctly', () => {
    const { getAllByRole } = renderWithAllContext(<Header />, {
      language: SPANISH,
    })

    const routeNodes: HTMLElement[] = getAllByRole('term')

    routeNodes.forEach((node: HTMLElement, i: number) =>
      expect(node).toHaveTextContent(staticPageRoutes[i].title_spanish),
    )
  })

  // it('does not render burger above 700px screen width', () => {
  //   const { getByRole } = renderWithAllContext(<Header />)

  //   expect(() => getByRole('button')).toThrowError()
  // })

  it('renders 5 static page links above 700px screen width', () => {
    const { getAllByRole } = renderWithAllContext(<Header />)

    const routeNodes: HTMLElement[] = getAllByRole('term')

    expect(routeNodes).toHaveLength(5)
  })

  it('does render burger at or below 700px screen width', () => {
    const { getAllByRole } = renderWithAllContext(<Header />)

    act(() => resizeWindow(700))

    const burgerButtonNode: HTMLElement = getAllByRole('button')[0]

    fireEvent.click(burgerButtonNode)

    const routeNode: HTMLElement = getAllByRole('term')[0]

    expect(burgerButtonNode).toBeInTheDocument()
    expect(routeNode).toBeVisible()
  })

  it('renders 10 static page links at or below 700px screen width', () => {
    const { getAllByRole } = renderWithAllContext(<Header />)

    const routeNodes: HTMLElement[] = getAllByRole('term')

    expect(routeNodes).toHaveLength(11)
  })
})
