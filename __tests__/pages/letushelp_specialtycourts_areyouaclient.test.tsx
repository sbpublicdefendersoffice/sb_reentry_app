import { getPage } from 'next-page-tester'
import { waitFor, screen } from '@testing-library/react'

describe('specialty courts are you a client page', () => {
  it('renders specialty courts are you a client page', async () => {
    const { render } = await getPage({
      route: '/letushelp/specialtycourts/areyouaclient',
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
