import { fireEvent } from '@testing-library/react'
import { useRouter } from 'next/router'

import { renderWithAllContext } from '../../__helpers__'
import { SPANISH } from '../../constants/language'

import AddYourOrg, { copy, url } from '../../components/AddYourOrg'

jest.mock('next/router', () => ({
  useRouter: jest.fn(),
}))

const push = jest.fn()

// @ts-ignore
useRouter.mockImplementation(() => ({ push }))

describe('<AddYourOrg />', () => {
  it('renders component correctly', () => {
    const { getByRole } = renderWithAllContext(<AddYourOrg />)

    const addYourOrgNode: HTMLElement = getByRole('region')

    expect(addYourOrgNode).toBeInTheDocument()
  })

  it('renders english specific content correctly', () => {
    const { getByRole, getAllByRole } = renderWithAllContext(<AddYourOrg />)

    const [titleNode, articleNodes, buttonNode] = [
      getByRole('heading'),
      getAllByRole('article'),
      getByRole('button'),
    ]

    const { org, explain1, explain2, btnTxt } = copy.english

    expect(titleNode).toHaveTextContent(org)
    expect(articleNodes[0]).toHaveTextContent(explain1)
    expect(articleNodes[1]).toHaveTextContent(explain2)
    expect(buttonNode).toHaveTextContent(btnTxt)
  })

  it('renders spanish specific content correctly', () => {
    const { getByRole, getAllByRole } = renderWithAllContext(<AddYourOrg />, {
      language: SPANISH,
    })

    const [titleNode, articleNodes, buttonNode] = [
      getByRole('heading'),
      getAllByRole('article'),
      getByRole('button'),
    ]

    const { org, explain1, explain2, btnTxt } = copy.spanish

    expect(titleNode).toHaveTextContent(org)
    expect(articleNodes[0]).toHaveTextContent(explain1)
    expect(articleNodes[1]).toHaveTextContent(explain2)
    expect(buttonNode).toHaveTextContent(btnTxt)
  })

  it('call push method', () => {
    const { getByRole } = renderWithAllContext(<AddYourOrg />)

    const buttonNode: HTMLElement = getByRole('button')

    fireEvent.click(buttonNode)

    expect(push).toHaveBeenCalledWith(url, url)
  })
})
