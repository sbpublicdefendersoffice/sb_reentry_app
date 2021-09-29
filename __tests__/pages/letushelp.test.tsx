import { getPage } from 'next-page-tester'
import { waitFor, screen } from '@testing-library/react'

describe('let us help page', () => {
  it('renders let us help page', async () => {
    const { render } = await getPage({
      route: '/letushelp',
      useApp: true,
    })

    render()

    const doc: HTMLElement = await waitFor(() =>
      screen.getByTestId('end_of_doc'),
    )

    expect(doc).toBeInTheDocument()
  })
})
