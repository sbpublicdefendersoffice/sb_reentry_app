import { getPage } from 'next-page-tester'
import { waitFor, screen, fireEvent } from '@testing-library/react'

import { englishDummyOrgData, customFetch } from '../../__helpers__/dummyData'

// @ts-ignore
window.fetch = customFetch(englishDummyOrgData)

describe('category page', () => {
  it('renders category page', async () => {
    const { render } = await getPage({
      route: '/food',
      useApp: true,
      useDocument: true,
    })

    render()

    const doc: HTMLElement = await waitFor(() =>
      screen.getByTestId('end_of_doc'),
    )

    const search: HTMLElement = await waitFor(() =>
      screen.getByTestId('FetchedDataSearch'),
    )

    fireEvent.change(search, { target: { value: 'feelgood' } })
    fireEvent.change(search, { target: { value: '' } })

    expect(doc).toBeInTheDocument()
  })
})
