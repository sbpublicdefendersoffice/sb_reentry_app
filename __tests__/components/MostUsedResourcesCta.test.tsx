import { fireEvent } from '@testing-library/react'
import { useRouter } from 'next/router'

import { renderWithAllContext } from '../../__helpers__/contexts'

import { SPANISH } from '../../constants/language'

import MostUsedResourcesCta, {
  imgSrc,
  url,
  copy,
} from '../../components/MostUsedResourcesCta'

const roles: string[] = ['region', 'img', 'heading', 'article', 'button']

jest.mock('next/router', () => ({
  useRouter: jest.fn(),
}))

const push = jest.fn()

// @ts-ignore
useRouter.mockImplementation(() => ({ push }))

describe('<MostUsedResourcesCta />', () => {
  it('renders correctly', () => {
    const { getByRole } = renderWithAllContext(<MostUsedResourcesCta />)

    const nodes: HTMLElement[] = roles.map((role: string) => getByRole(role))

    nodes.forEach((node: HTMLElement) => expect(node).toBeInTheDocument())

    expect(nodes[1]).toHaveAttribute('src', imgSrc)
  })

  it('renders english specific content', () => {
    const { getByRole } = renderWithAllContext(<MostUsedResourcesCta />)

    const nodes: HTMLElement[] = roles
      .slice(1)
      .map((role: string) => getByRole(role))

    const copyContent: string[] = Object.values(copy.english)

    nodes.forEach((node: HTMLElement, i: number) => {
      if (!i) expect(node).toHaveAttribute('alt', copyContent[i])
      else expect(node).toHaveTextContent(copyContent[i])
    })
  })

  it('renders spanish specific content', () => {
    const { getByRole } = renderWithAllContext(<MostUsedResourcesCta />, {
      language: SPANISH,
    })

    const nodes: HTMLElement[] = roles
      .slice(1)
      .map((role: string) => getByRole(role))

    const copyContent: string[] = Object.values(copy.spanish)

    nodes.forEach((node: HTMLElement, i: number) => {
      if (!i) expect(node).toHaveAttribute('alt', copyContent[i])
      else expect(node).toHaveTextContent(copyContent[i])
    })
  })

  it('calls push method', () => {
    const { getByRole } = renderWithAllContext(<MostUsedResourcesCta />)

    const buttonNode: HTMLElement = getByRole(roles.pop())

    fireEvent.click(buttonNode)

    expect(push).toHaveBeenCalledWith(url, url)
  })
})
