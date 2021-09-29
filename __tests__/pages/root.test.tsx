import { getPage } from 'next-page-tester'
import { waitFor, screen, fireEvent } from '@testing-library/react'
import { useRouter } from 'next/router'

jest.mock('next/router', () => ({
  useRouter: jest.fn(),
}))

const push = jest.fn()

// @ts-ignore
useRouter.mockImplementation(() => ({ push }))

describe('home page', () => {
  it('renders home page', async () => {
    const { render } = await getPage({
      route: '/',
      useApp: true,
    })

    render()

    const [doc, buttonNodes]: [HTMLElement, HTMLElement[]] = await waitFor(
      () => [screen.getByTestId('end_of_doc'), screen.getAllByRole('button')],
    )

    buttonNodes.forEach((node: HTMLElement) => fireEvent.click(node))

    expect(doc).toBeInTheDocument()
    expect(push).toHaveBeenCalledTimes(2)
  })
})
