import { fireEvent } from '@testing-library/react'
import { useRouter } from 'next/router'

import { renderWithRouter } from '../../__helpers__/contexts'

import Navigator from '../../components/Navigator'

jest.mock('next/router', () => ({
  useRouter: jest.fn(),
}))

const back = jest.fn()
// @ts-ignore
useRouter.mockImplementation(() => ({ back }))

describe('<Navigator />', () => {
  it('renders correctly', () => {
    const { getByRole } = renderWithRouter(<Navigator />)

    const navigatorNode: HTMLElement = getByRole('navigation')

    expect(navigatorNode).toBeInTheDocument()
  })

  it('fires back method correctly', () => {
    const { getByRole } = renderWithRouter(<Navigator />)

    const linkNode = getByRole('link')

    fireEvent.click(linkNode)

    expect(back).toHaveBeenCalled()
  })
})
