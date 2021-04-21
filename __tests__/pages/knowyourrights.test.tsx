import { getPage } from 'next-page-tester'
import { waitFor, screen, fireEvent } from '@testing-library/react'

describe('know your rights page', () => {
  it('renders know your rights page and tests modal functionality', async () => {
    const { render } = await getPage({
      route: '/knowyourrights',
      useApp: true,
      useDocument: true,
    })

    render()

    const doc: HTMLElement = await waitFor(() =>
      screen.getByTestId('end_of_doc'),
    )

    const flyerButtons: HTMLElement[] = await waitFor(() =>
      screen.getAllByTestId('flyer-button'),
    )

    const flyerButton: HTMLElement = flyerButtons[0]

    fireEvent.click(flyerButton)

    const modalButton: HTMLElement = await waitFor(() =>
      screen.getByTestId('modal'),
    )

    fireEvent.click(modalButton)

    expect(doc).toBeInTheDocument()
  })
})
