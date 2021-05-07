import { render } from '@testing-library/react'

import FullPageDecision from '../../components/FullPageDecision'

describe('<FullPageDecision />', () => {
  it('renders correctly', () => {
    const { getByRole } = render(
      <FullPageDecision>
        <span>hello</span>
      </FullPageDecision>,
    )

    const regionNode: HTMLElement = getByRole('region')

    expect(regionNode).toBeInTheDocument()
  })
})
