import { getPage } from 'next-page-tester'
import { waitFor, screen } from '@testing-library/react'

describe('diversion are you a client page', () => {
  it('renders diversion are you a client page', async () => {
    const { render } = await getPage({
      route: '/letushelp/diversion/areyouaclient',
      useApp: true,
    })

    render()

    const doc: HTMLElement = await waitFor(() =>
      screen.getByTestId('end_of_doc'),
    )

    expect(doc).toBeInTheDocument()
  })
})
