import { getPage } from 'next-page-tester'
// import { waitFor, screen } from '@testing-library/react'

describe('category page', () => {
  it('renders category page', async () => {
    const { render } = await getPage({
      route: '/food',
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
