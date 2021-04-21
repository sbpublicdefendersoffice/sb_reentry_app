import { act, render, fireEvent } from '@testing-library/react'

import { resizeWindow } from '../../__helpers__/window'
import Details from '../../ui/Details'

describe('<Details />', () => {
  it('renders correctly', () => {
    const { getByRole } = render(
      <Details open summary="testing is great">
        <span>children</span>
      </Details>,
    )

    const [detailsNode, summaryNode] = [
      getByRole('aria-details'),
      getByRole('definition'),
    ]

    expect(summaryNode).toBeInTheDocument()
    expect(detailsNode).toBeInTheDocument()
  })

  it('opens and closes', () => {
    const { getByRole } = render(
      <Details open summary="testing is great">
        <span>children</span>
      </Details>,
    )

    const detailsNode: HTMLElement = getByRole('aria-details')

    expect(detailsNode).toHaveAttribute('open')

    fireEvent.click(detailsNode)

    expect(detailsNode).toHaveAttribute('open')
  })

  it('sets to open when screen is larger than 699px', () => {
    const { getByRole } = render(
      <Details summary="testing is great">
        <span>children</span>
      </Details>,
    )

    const detailsNode: HTMLElement = getByRole('aria-details')

    act(() => resizeWindow(699))

    act(() => resizeWindow(1080))

    expect(detailsNode).toHaveAttribute('open')
  })
})
