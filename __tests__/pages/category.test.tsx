import { getPage } from 'next-page-tester'
import { waitFor, screen, fireEvent } from '@testing-library/react'

import {
  dummyTranslateRecordResponse,
  customFetch,
} from '../../__helpers__/dummyData'

// @ts-ignore
window.fetch = customFetch(dummyTranslateRecordResponse)

describe('category page', () => {
  it('renders category page and performs search', async () => {
    let orgCardsNode

    const { render } = await getPage({
      route: '/food',
      useApp: true,
      useDocument: true,
    })

    render()

    const { getByTestId, getAllByTestId } = screen

    const [docNode, searchNode] = [
      await waitFor(() => getByTestId('end_of_doc')),
      await waitFor(() => getByTestId('FetchedDataSearch')),
    ]
    orgCardsNode = await waitFor(() => getAllByTestId('OrgRecordCard'))

    expect(orgCardsNode).toHaveLength(2)

    fireEvent.change(searchNode, { target: { value: 'pasta' } })
    expect(searchNode).toHaveValue('pasta')

    orgCardsNode = await waitFor(() => getAllByTestId('OrgRecordCard'))
    expect(orgCardsNode).toHaveLength(1)

    fireEvent.change(searchNode, { target: { value: '' } })
    expect(searchNode).toHaveValue('')

    expect(docNode).toBeInTheDocument()
  })
})
