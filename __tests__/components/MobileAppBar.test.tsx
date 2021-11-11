import {
  fireEvent,
  // waitFor
} from '@testing-library/react'
import { useRouter } from 'next/router'

import { renderWithAllContext } from '../../__helpers__/contexts'

import MobileAppBar from '../../components/MobileAppBar'

jest.mock('next/router', () => ({
  useRouter: jest.fn(),
}))

const back = jest.fn()
// @ts-ignore
useRouter.mockImplementation(() => ({ back }))

describe('<MobileAppBar />', () => {
  it('renders correctly', () => {
    const { getByRole } = renderWithAllContext(<MobileAppBar />)

    const toolbarNode: HTMLElement = getByRole('toolbar')

    expect(toolbarNode).toBeInTheDocument()
  })

  it('fires back method correctly', () => {
    const { getByTestId } = renderWithAllContext(<MobileAppBar />)

    const backButtonNode = getByTestId('back-button')

    fireEvent.click(backButtonNode)

    expect(back).toHaveBeenCalled()
  })

  // it('shows search bar correctly', async () => {
  //   const { getByTestId, getByRole } = renderWithAllContext(<MobileAppBar />)

  //   const showSearchButtonNode: HTMLElement = getByTestId('show-search-button')

  //   fireEvent.click(showSearchButtonNode)

  //   const search: HTMLElement = await waitFor(() => getByRole('search'))

  //   expect(search).toBeInTheDocument()
  // })
})
