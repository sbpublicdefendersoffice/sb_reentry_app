import { useRouter } from 'next/router'
import { fireEvent } from '@testing-library/react'

import { renderWithAllContext } from '../../__helpers__/contexts'
import { SPANISH } from '../../constants/language'
import AreYouAClient, { copy } from '../../components/AreYouAClient'

jest.mock('next/router', () => ({
  useRouter: jest.fn(),
}))

const push = jest.fn()

// @ts-ignore
useRouter.mockImplementation(() => ({ push }))

const route: string = 'diversion'

describe('<AreYouAClient />', () => {
  it('renders correctly with route props', () => {
    const { getAllByRole } = renderWithAllContext(
      <AreYouAClient route={route} />,
    )

    const [noNode, yesNode] = getAllByRole('button')

    expect(noNode).toHaveAttribute('name', `/letushelp/${route}/apply`)
    expect(yesNode).toHaveAttribute('name', `/letushelp/${route}`)
  })

  it('renders english specific content', () => {
    const { getByRole, getAllByRole } = renderWithAllContext(
      <AreYouAClient route={route} />,
    )

    const { currentClient, no, yes } = copy.english

    const headingNode: HTMLElement = getByRole('heading')
    const [noNode, yesNode] = getAllByRole('button')

    expect(headingNode).toHaveTextContent(currentClient)
    expect(noNode).toHaveTextContent(no)
    expect(yesNode).toHaveTextContent(yes)
  })

  it('renders spanish specific content', () => {
    const { getByRole, getAllByRole } = renderWithAllContext(
      <AreYouAClient route={route} />,
      { language: SPANISH },
    )

    const { currentClient, no, yes } = copy.spanish

    const headingNode: HTMLElement = getByRole('heading')
    const [noNode, yesNode] = getAllByRole('button')

    expect(headingNode).toHaveTextContent(currentClient)
    expect(noNode).toHaveTextContent(no)
    expect(yesNode).toHaveTextContent(yes)
  })

  it('executes push func correctly when called', () => {
    const { getAllByRole } = renderWithAllContext(
      <AreYouAClient route={route} />,
    )

    const buttonNodes: HTMLElement[] = getAllByRole('button')

    buttonNodes.forEach((node: HTMLElement) => fireEvent.click(node))

    expect(push).toHaveBeenCalledTimes(2)
  })
})
