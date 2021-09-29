import { getPage } from 'next-page-tester'
import { waitFor, screen } from '@testing-library/react'

describe('about us page', () => {
  it('renders about us page', async () => {
    const { render } = await getPage({
      route: '/aboutus',
      useApp: true,
    })

    render()

    const doc: HTMLElement = await waitFor(() =>
      screen.getByTestId('end_of_doc'),
    )

    expect(doc).toBeInTheDocument()
  })
})
