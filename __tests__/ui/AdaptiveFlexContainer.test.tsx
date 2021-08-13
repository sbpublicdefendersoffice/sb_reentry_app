import { render } from '@testing-library/react'
import AdaptiveFlexContainer from '../../ui/AdaptiveFlexContainer'

describe('<AdaptiveFlexContainer />', () => {
  it('renders', () => {
    const { getByRole } = render(
      <AdaptiveFlexContainer>
        <span>hello!</span>
      </AdaptiveFlexContainer>,
    )

    const containerNode: HTMLElement = getByRole('main')

    expect(containerNode).toBeInTheDocument()
  })
})
