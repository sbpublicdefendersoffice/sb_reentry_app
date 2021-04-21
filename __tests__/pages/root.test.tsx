import { getPage } from 'next-page-tester'
import { waitFor, screen } from '@testing-library/react'

describe('home page', () => {
  it('renders home page', async () => {
    const { render } = await getPage({
      route: '/',
      useApp: true,
      useDocument: true,
    })

    render()

    const doc: HTMLElement = await waitFor(() =>
      screen.getByTestId('end_of_doc'),
    )

    expect(doc).toBeInTheDocument()
  })
})
