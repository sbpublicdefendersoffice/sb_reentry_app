import { useRouter } from 'next/router'
import { getPage } from 'next-page-tester'
import { waitFor, screen, fireEvent } from '@testing-library/react'

jest.mock('next/router', () => ({
  useRouter: jest.fn(),
}))

const push = jest.fn()

// @ts-ignore
useRouter.mockImplementation(() => ({ push }))

describe('diversion are you a client page', () => {
  it('renders diversion are you a client page and calls ', async () => {
    const { render } = await getPage({
      route: '/letushelp/diversion/areyouaclient',
      useApp: true,
      useDocument: true,
    })

    render()

    const doc: HTMLElement = await waitFor(() =>
      screen.getByTestId('end_of_doc'),
    )
    const buttonNodes: HTMLElement[] = [
      await waitFor(() => screen.getByTestId('NoButton')),
      await waitFor(() => screen.getByTestId('YesButton')),
    ]

    buttonNodes.forEach((node: HTMLElement) => fireEvent.click(node))

    expect(doc).toBeInTheDocument()
    expect(push).toHaveBeenCalledTimes(2)
  })
})
