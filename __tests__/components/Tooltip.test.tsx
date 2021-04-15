import { render, fireEvent, waitFor } from '@testing-library/react'

import Tooltip from '../../components/Tooltip'

const testText: string = 'Tests are fun!'

describe('<Tooltip />', () => {
  it('renders correctly when popup is NOT activated', () => {
    const { getByRole } = render(<Tooltip>{testText}</Tooltip>)

    const tooltipNode: HTMLElement = getByRole('tooltip')

    expect(tooltipNode).toBeInTheDocument()
    expect(() => getByRole('note')).toThrowError()
  })

  it('renders popup when mouse hovers over tooltip and stops rendering when mouse moves away', async () => {
    const { getByRole } = render(<Tooltip>{testText}</Tooltip>)

    const tooltipNode: HTMLElement = getByRole('tooltip')

    fireEvent.mouseOver(tooltipNode)

    const popUpNode: HTMLElement = await waitFor(() => getByRole('note'))

    expect(popUpNode).toHaveTextContent(testText)

    fireEvent.mouseOut(tooltipNode)

    expect(popUpNode).not.toBeInTheDocument()
  })
})
