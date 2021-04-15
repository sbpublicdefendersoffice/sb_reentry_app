import { renderWithAllContext } from '../../__helpers__/contexts'

import { searchCopy, SPANISH } from '../../constants/'
import LiveDataSearch from '../../components/LiveDataSearch'
import { fireEvent, waitFor } from '@testing-library/dom'

describe('<LiveDataSearch />', () => {
  it('renders correctly', () => {
    const { getByRole } = renderWithAllContext(<LiveDataSearch />)

    const dataSearchNode: HTMLElement = getByRole('searchbox')

    expect(dataSearchNode).toBeInTheDocument()
  })

  it('renders english contect correctly', async () => {
    const { getByRole } = renderWithAllContext(<LiveDataSearch />)

    const { search, tooltip } = searchCopy.english

    const [inputNode, tooltipNode] = [getByRole('search'), getByRole('tooltip')]

    fireEvent.mouseOver(tooltipNode)

    const popUpNode: HTMLElement = await waitFor(() => getByRole('note'))

    expect(inputNode).toHaveAttribute('placeholder', `${search}...`)
    expect(popUpNode).toHaveTextContent(tooltip)
  })

  it('renders spanish contect correctly', async () => {
    const { getByRole } = renderWithAllContext(<LiveDataSearch />, {
      language: SPANISH,
    })

    const { search, tooltip } = searchCopy.spanish

    const [inputNode, tooltipNode] = [getByRole('search'), getByRole('tooltip')]

    fireEvent.mouseOver(tooltipNode)

    const popUpNode: HTMLElement = await waitFor(() => getByRole('note'))

    expect(inputNode).toHaveAttribute('placeholder', `${search}...`)
    expect(popUpNode).toHaveTextContent(tooltip)
  })
})
