import { renderWithLanguage, dispatchPwaEvent } from '../../__helpers__'

import { SPANISH } from '../../constants/language'

import PwaDownload, { copy } from '../../components/PwaDownload'

const roles: string[] = ['heading', 'note', 'button']

describe('<PwaDownload />', () => {
  it('renders correctly in english', () => {
    const { getByRole } = renderWithLanguage(<PwaDownload />)

    dispatchPwaEvent()

    const copyText: string[] = Object.values(copy.english)

    const pwaNodes: HTMLElement[] = roles.map((role: string) => getByRole(role))

    pwaNodes.forEach((node: HTMLElement, i: number) =>
      expect(node).toHaveTextContent(copyText[i]),
    )
  })

  it('renders correctly in spanish', () => {
    const { getByRole } = renderWithLanguage(<PwaDownload />, SPANISH)

    dispatchPwaEvent()

    const copyText: string[] = Object.values(copy.spanish)

    const pwaNodes: HTMLElement[] = roles.map((role: string) => getByRole(role))

    pwaNodes.forEach((node: HTMLElement, i: number) =>
      expect(node).toHaveTextContent(copyText[i]),
    )
  })
})
