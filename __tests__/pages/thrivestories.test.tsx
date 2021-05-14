import { getPage } from 'next-page-tester'
import { waitFor, screen } from '@testing-library/react'

describe('thrive stories page', () => {
  it('renders thrive stories page', async () => {
    const { render } = await getPage({
      route: '/thrivestories',
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
