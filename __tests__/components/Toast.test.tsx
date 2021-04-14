import { renderWithToast } from '../../__helpers__/contexts'

import Toast, { delayTimeInMs } from '../../components/Toast'

const toastTestText: string = 'Toast it up!'

describe('<Toast />', () => {
  it('does not render when there is no toast text', () => {
    const { getByRole } = renderWithToast(<Toast />)

    expect(() => getByRole('alert')).toThrowError()
  })

  it('renders when there is toast text', () => {
    const { getByRole } = renderWithToast(<Toast />, toastTestText)

    const [toastNode, textNode] = [getByRole('alert'), getByRole('alertdialog')]

    expect(toastNode).toBeInTheDocument()
    expect(textNode).toHaveTextContent(toastTestText)
  })

  it('stops rendering toast after delay time has elapsed', () => {
    const { getByRole } = renderWithToast(<Toast />, toastTestText)

    const toastNode: HTMLElement = getByRole('alert')

    expect(toastNode).toBeInTheDocument()

    setTimeout(() => expect(toastNode).not.toBeInTheDocument(), delayTimeInMs)
  })
})
