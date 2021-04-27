import { renderWithLanguage } from '../../__helpers__/contexts'

import { SPANISH, topThreeRoutes } from '../../constants/'
import { InfoWithDescription } from '../../types/routes'

import TopThreeCta, { copy } from '../../components/TopThreeCta'

describe('<TopThreeCta />', () => {
  it('renders language agnostic content correctly', () => {
    const { getByRole, getAllByRole } = renderWithLanguage(<TopThreeCta />)

    const [ctaNode, listNode, listItemNodes, imgNodes] = [
      getByRole('region'),
      getByRole('list'),
      getAllByRole('listitem'),
      getAllByRole('img'),
    ]

    expect(ctaNode).toBeInTheDocument()
    expect(listNode).toBeInTheDocument()
    expect(listItemNodes).toHaveLength(3)
    expect(imgNodes).toHaveLength(3)

    imgNodes.forEach((node: HTMLElement, i: number) =>
      expect(node).toHaveAttribute('src', topThreeRoutes[i].imgPath),
    )
  })

  it('renders english specific conent correctly', () => {
    const { getAllByRole } = renderWithLanguage(<TopThreeCta />)

    const englishCopy: string[] = Object.values(copy.english)
    const routeText: string[] = topThreeRoutes.reduce(
      (finalArr: string[], routeInfo: InfoWithDescription) => {
        finalArr.push(routeInfo.title_english)
        finalArr.push(routeInfo.text_english)

        return finalArr
      },
      [],
    )

    const copyTitleNodes: HTMLElement[] = getAllByRole('heading')
    const articleNodes: HTMLElement[] = getAllByRole('article')

    copyTitleNodes.forEach((node: HTMLElement, i: number) =>
      expect(node).toHaveTextContent(englishCopy[i]),
    )
    articleNodes.forEach((node: HTMLElement, i: number) =>
      expect(node).toHaveTextContent(routeText[i]),
    )
  })

  it('renders spanish specific conent correctly', () => {
    const { getAllByRole } = renderWithLanguage(<TopThreeCta />, SPANISH)

    const spanishCopy: string[] = Object.values(copy.spanish)
    const routeText: string[] = topThreeRoutes.reduce(
      (finalArr: string[], routeInfo: InfoWithDescription) => {
        finalArr.push(routeInfo.title_spanish)
        finalArr.push(routeInfo.text_spanish)

        return finalArr
      },
      [],
    )

    const copyTitleNodes: HTMLElement[] = getAllByRole('heading')
    const articleNodes: HTMLElement[] = getAllByRole('article')

    copyTitleNodes.forEach((node: HTMLElement, i: number) =>
      expect(node).toHaveTextContent(spanishCopy[i]),
    )
    articleNodes.forEach((node: HTMLElement, i: number) =>
      expect(node).toHaveTextContent(routeText[i]),
    )
  })
})
