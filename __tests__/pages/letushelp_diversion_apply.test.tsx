import { getPage } from 'next-page-tester'
import { waitFor, screen } from '@testing-library/react'

describe('diversion apply page', () => {
  it('renders diversion apply page', async () => {
    const { render } = await getPage({
      route: '/letushelp/diversion/apply',
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
