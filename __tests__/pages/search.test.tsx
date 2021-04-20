import { getPage } from 'next-page-tester'
// import { waitFor, screen } from '@testing-library/react'

describe('search page', () => {
  it('renders search page', async () => {
    const { render } = await getPage({
      route: '/search',
      useApp: true,
      useDocument: true,
    })

    render()

    // const doc: HTMLElement = await waitFor(() =>
    //   screen.getByTestId('end_of_doc'),
    // )

    // expect(doc).toBeInTheDocument()
  })
})
