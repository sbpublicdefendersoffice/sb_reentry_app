import { getPage } from 'next-page-tester'
import { waitFor, screen } from '@testing-library/react'

describe('success stories page', () => {
  it('renders success stories page', async () => {
    const { render } = await getPage({
      route: '/successstories',
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
