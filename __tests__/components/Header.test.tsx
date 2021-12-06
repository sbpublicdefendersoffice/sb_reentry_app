import { act } from '@testing-library/react'
import { resizeWindow, renderWithAllContext } from '../../__helpers__'

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

  it('does not render burger above 700px screen width', () => {
    const { getByRole } = renderWithAllContext(<Header />)

    act(() => resizeWindow(700))
    act(() => resizeWindow(1200))

    expect(() => getByRole('button')).toThrowError()
  })

  it('renders 9 static page links above 700px screen width', () => {
    const { getAllByRole } = renderWithAllContext(<Header />)

    const routeNodes: HTMLElement[] = getAllByRole('term')

    expect(routeNodes).toHaveLength(11)
  })

  it('does render burger at or below 700px screen width', () => {
    const { getAllByRole } = renderWithAllContext(<Header />)

    act(() => resizeWindow(700))

    const burgerButtonNode: HTMLElement = getAllByRole('button')[0]

    expect(burgerButtonNode).toBeInTheDocument()
  })

  it('renders 9 static page links at or below 700px screen width', () => {
    const { getAllByRole } = renderWithAllContext(<Header />)

    const routeNodes: HTMLElement[] = getAllByRole('term')

    expect(routeNodes).toHaveLength(11)
  })
})
