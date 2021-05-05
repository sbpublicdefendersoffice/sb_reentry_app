import { renderWithLanguage } from '../../__helpers__/contexts'

import { SPANISH, letUsHelpRoutes } from '../../constants'

import LetUsHelpTiles, { copy } from '../../components/LetUsHelpTiles'

describe('<LetUsHelpTiles />', () => {
  it('renders content correctly', () => {
    const { getByRole, getAllByRole } = renderWithLanguage(<LetUsHelpTiles />)

    const [tileHolderNode, headingNodes, singleTileNodes, imgNodes] = [
      getByRole('list'),
      getAllByRole('heading'),
      getAllByRole('listitem'),
      getAllByRole('img'),
    ]

    expect(tileHolderNode).toBeInTheDocument()
    expect(headingNodes).toHaveLength(3)
    expect(singleTileNodes).toHaveLength(10)
    expect(imgNodes).toHaveLength(10)

    imgNodes.forEach((node: HTMLElement, i: number) =>
      expect(node).toHaveAttribute('src', letUsHelpRoutes[i].imgPath),
    )
  })

  it('renders english specific content correctly', () => {
    const { getAllByRole } = renderWithLanguage(<LetUsHelpTiles />)

    const [termNodes, headingNodes] = [
      getAllByRole('term'),
      getAllByRole('heading'),
    ]

    const copyContent: string[] = Object.values(copy.english)

    termNodes.forEach((node: HTMLElement, i: number) =>
      expect(node).toHaveTextContent(letUsHelpRoutes[i].title_english),
    )
    headingNodes.forEach((node: HTMLElement, i: number) =>
      expect(node).toHaveTextContent(copyContent[i]),
    )
  })

  it('renders spanish specific content correctly', () => {
    const { getAllByRole } = renderWithLanguage(<LetUsHelpTiles />, SPANISH)

    const [termNodes, headingNodes] = [
      getAllByRole('term'),
      getAllByRole('heading'),
    ]

    const copyContent: string[] = Object.values(copy.spanish)

    termNodes.forEach((node: HTMLElement, i: number) =>
      expect(node).toHaveTextContent(letUsHelpRoutes[i].title_spanish),
    )
    headingNodes.forEach((node: HTMLElement, i: number) =>
      expect(node).toHaveTextContent(copyContent[i]),
    )
  })
})
