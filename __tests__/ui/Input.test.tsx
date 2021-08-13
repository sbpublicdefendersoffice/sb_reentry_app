import { render } from '@testing-library/react'
import Input from '../../ui/Input'

describe('<Input />', () => {
  it('renders as block', () => {
    const { getByRole } = render(<Input block />)
    const inputNode: HTMLElement = getByRole('input')

    expect(inputNode.style.display).toBe('block')
  })
})
