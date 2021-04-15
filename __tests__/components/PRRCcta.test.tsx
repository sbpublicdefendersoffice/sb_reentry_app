import { fireEvent } from '@testing-library/react'
import { useRouter } from 'next/router'

import { renderWithAllContext } from '../../__helpers__'

import PRRCcta, {
  url,
  as,
  copy,
  accessLineInfo,
} from '../../components/PRRCcta'
import { SPANISH } from '../../constants/language'

jest.mock('next/router', () => ({
  useRouter: jest.fn(),
}))

const push = jest.fn()

// @ts-ignore
useRouter.mockImplementation(() => ({ push }))

describe('<PRRCcta />', () => {
  it('renders PRRC information', () => {
    const { getAllByRole } = renderWithAllContext(<PRRCcta />)

    const { santaBarbara, santaMaria } = accessLineInfo

    const displayNumbers: string[] = [
      santaBarbara.displayNumber,
      santaMaria.displayNumber,
    ]

    const hrefs: string[] = [santaBarbara.href, santaMaria.href]

    const linkNodes: HTMLElement[] = getAllByRole('link')

    const paragraphNodes: HTMLElement[] = getAllByRole('link_paragraph')

    linkNodes.forEach((node: HTMLElement, i: number) =>
      expect(node).toHaveAttribute('href', hrefs[i]),
    )

    paragraphNodes.forEach((node: HTMLElement, i: number) =>
      expect(node).toHaveTextContent(displayNumbers[i]),
    )
  })

  it('renders correctly in english', () => {
    const { getByText } = renderWithAllContext(<PRRCcta />, {
      language: SPANISH,
    })

    const spanishTexts: string[] = Object.values(copy.spanish)

    const spanishTextNodes: HTMLElement[] = spanishTexts.map((text: string) =>
      getByText(text),
    )

    expect(spanishTextNodes).toHaveLength(5)
  })

  it('renders correctly in spanish', () => {
    const { getByText } = renderWithAllContext(<PRRCcta />)

    const englishTexts: string[] = Object.values(copy.english)

    const englishTextNodes: HTMLElement[] = englishTexts.map((text: string) =>
      getByText(text),
    )

    expect(englishTextNodes).toHaveLength(5)
  })

  it('calls push method correctly', () => {
    const { getByRole } = renderWithAllContext(<PRRCcta />)

    const buttonNode: HTMLElement = getByRole('button')

    fireEvent.click(buttonNode)

    expect(push).toHaveBeenCalledWith(url, as)
  })
})
