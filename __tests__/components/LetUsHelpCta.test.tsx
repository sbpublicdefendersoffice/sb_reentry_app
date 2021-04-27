import { fireEvent } from '@testing-library/react'
import { useRouter } from 'next/router'

import { renderWithAllContext } from '../../__helpers__'

import LetUsHelpCta, { url, copy } from '../../components/LetUsHelpCta'
import { SPANISH } from '../../constants/language'

jest.mock('next/router', () => ({
  useRouter: jest.fn(),
}))

const push = jest.fn()

// @ts-ignore
useRouter.mockImplementation(() => ({ push }))

describe('<LetUsHelpCta />', () => {
  it('renders correctly in english', () => {
    const { getAllByRole, getByRole } = renderWithAllContext(<LetUsHelpCta />)

    const { title1, title2, explanation, buttonText } = copy.english

    const [titleNode1, titleNode2] = getAllByRole('heading')
    const explanationNode: HTMLElement = getByRole('article')
    const buttonNode: HTMLElement = getByRole('button')

    expect(titleNode1).toHaveTextContent(title1)
    expect(titleNode2).toHaveTextContent(title2)
    expect(explanationNode).toHaveTextContent(explanation)
    expect(buttonNode).toHaveTextContent(buttonText)
  })

  it('renders correctly in spanish', () => {
    const { getAllByRole, getByRole } = renderWithAllContext(<LetUsHelpCta />, {
      language: SPANISH,
    })

    const { title1, title2, explanation, buttonText } = copy.spanish

    const [titleNode1, titleNode2] = getAllByRole('heading')
    const explanationNode: HTMLElement = getByRole('article')
    const buttonNode: HTMLElement = getByRole('button')

    expect(titleNode1).toHaveTextContent(title1)
    expect(titleNode2).toHaveTextContent(title2)
    expect(explanationNode).toHaveTextContent(explanation)
    expect(buttonNode).toHaveTextContent(buttonText)
  })

  it('calls push method correctly', () => {
    const { getByRole } = renderWithAllContext(<LetUsHelpCta />)

    const buttonNode: HTMLElement = getByRole('button')

    fireEvent.click(buttonNode)

    expect(push).toHaveBeenCalledWith(url, url)
  })
})
