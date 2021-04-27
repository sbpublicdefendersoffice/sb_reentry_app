import { render } from '@testing-library/react'

import LetUsHelpContainer from '../../components/LetUsHelpContainer'

describe('<LetUsHelpContainer />', () => {
  it('renders correctly', () => {
    const { getByRole } = render(
      <LetUsHelpContainer>
        <span>how you doing?</span>
      </LetUsHelpContainer>,
    )

    const sectionNode: HTMLElement = getByRole('region')

    expect(sectionNode).toBeInTheDocument()
  })
})
