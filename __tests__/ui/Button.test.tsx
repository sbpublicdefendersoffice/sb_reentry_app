import { render } from '@testing-library/react'
import Button from '../../ui/Button'

describe('<Button />', () => {
  it('renders as block', () => {
    const { getByRole } = render(
      <Button block>
        <span>Don't touch me!</span>
      </Button>,
    )

    const buttonNode: HTMLElement = getByRole('button')

    expect(buttonNode.style.display).toBe('block')
  })
})
