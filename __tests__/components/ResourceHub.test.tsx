import { renderWithLanguage } from '../../__helpers__/contexts'

import { resourceRoutes, SPANISH } from '../../constants/'

import ResourceHub, { copy } from '../../components/ResourceHub'

describe.skip('<ResourceHub />', () => {
  it('renders language agnostic content correctly', () => {
    const { getAllByRole } = renderWithLanguage(<ResourceHub />)

    const imgNodes: HTMLElement[] = getAllByRole('img')

    imgNodes.forEach((node: HTMLElement, i: number) =>
      expect(node).toHaveAttribute('src', resourceRoutes[i].imgPath),
    )
  })

  it('renders english content correctly', () => {
    const { getByRole, getAllByRole } = renderWithLanguage(<ResourceHub />)

    const { hub, direction } = copy.english

    const [titleNode, directionNode] = [
      getByRole('heading'),
      getByRole('article'),
    ]

    const imgNodes: HTMLElement[] = getAllByRole('img')
    const routeTitleNodes: HTMLElement[] = getAllByRole('note')

    imgNodes.forEach((node: HTMLElement, i: number) =>
      expect(node).toHaveAttribute(
        'alt',
        `${resourceRoutes[i].title_english}_icon`,
      ),
    )

    routeTitleNodes.forEach((node: HTMLElement, i: number) =>
      expect(node).toHaveTextContent(resourceRoutes[i].title_english),
    )

    expect(titleNode).toHaveTextContent(hub)
    expect(directionNode).toHaveTextContent(direction)
  })

  it('renders spanish content correctly', () => {
    const { getByRole, getAllByRole } = renderWithLanguage(
      <ResourceHub />,
      SPANISH,
    )

    const { hub, direction } = copy.spanish

    const [titleNode, directionNode] = [
      getByRole('heading'),
      getByRole('article'),
    ]

    const imgNodes: HTMLElement[] = getAllByRole('img')
    const routeTitleNodes: HTMLElement[] = getAllByRole('note')

    imgNodes.forEach((node: HTMLElement, i: number) =>
      expect(node).toHaveAttribute(
        'alt',
        `${resourceRoutes[i].title_spanish}_icon`,
      ),
    )

    routeTitleNodes.forEach((node: HTMLElement, i: number) =>
      expect(node).toHaveTextContent(resourceRoutes[i].title_spanish),
    )

    expect(titleNode).toHaveTextContent(hub)
    expect(directionNode).toHaveTextContent(direction)
  })
})
