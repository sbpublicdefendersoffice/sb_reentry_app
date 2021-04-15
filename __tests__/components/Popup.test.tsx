import { render } from '@testing-library/react'

import { PopupInfo } from '../../types/maps'
import Popup from '../../components/Popup'

const testText: string = "'Tests' === 'The Best' // true"

const coords: PopupInfo = { clientX: 10, clientY: 20 }

describe('<Popup />', () => {
  it('renders correctly', () => {
    const { getByRole } = render(<Popup {...coords}>{testText}</Popup>)

    const popupNode: HTMLElement = getByRole('note')

    expect(popupNode.style.left).toEqual(`${coords.clientX + 10}px`)
    expect(popupNode.style.top).toEqual(`${coords.clientY + 10}px`)
  })
})
