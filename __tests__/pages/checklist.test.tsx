import { getPage } from 'next-page-tester'
import { waitFor, screen } from '@testing-library/react'

describe('checklist page', () => {
  it('renders checklist page', async () => {
    const { render } = await getPage({
      route: '/checklist',
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
