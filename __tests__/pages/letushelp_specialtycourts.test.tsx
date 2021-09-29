import { getPage } from 'next-page-tester'
import { waitFor, screen } from '@testing-library/react'

describe('specialty courts page', () => {
  it('renders specialty courts page', async () => {
    const { render } = await getPage({
      route: '/letushelp/specialtycourts',
      useApp: true,
    })

    render()

    const doc: HTMLElement = await waitFor(() =>
      screen.getByTestId('end_of_doc'),
    )

    expect(doc).toBeInTheDocument()
  })
})
