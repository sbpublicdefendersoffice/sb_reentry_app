import { getPage } from 'next-page-tester'
import { waitFor, screen } from '@testing-library/react'

describe('know your rights page', () => {
  it('renders know your rights page', async () => {
    const { render } = await getPage({
      route: '/knowyourrights',
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
