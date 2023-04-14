import { fireEvent } from '@testing-library/react'
import {
  renderWithLanguage,
  dummyLocationRecord,
  customFetch,
} from '../../__helpers__'

import SendText, {
  SendTextProps,
  copy,
  delayTimeInMs,
} from '../../components/SendText'
import { SPANISH } from '../../constants/language'

const { org_name, address, city, state, zip, id } = dummyLocationRecord

// @ts-ignore
window.fetch = customFetch(null)

const textDummyData: SendTextProps = {
  org_name,
  fullAddress: address,
  cityStateZip: `${city}, ${state} ${zip}`,
  id: String(id),
}

const dummyPhoneNumber: string = '1234567890'

const roles: string[] = ['form', 'textbox', 'button']

describe.skip('<SendText />', () => {
  it('renders correctly', () => {
    const { getByRole } = renderWithLanguage(<SendText {...textDummyData} />)

    roles.forEach((node: string) => expect(getByRole(node)).toBeInTheDocument())
  })

  it('renders english information correctly', () => {
    const { getByRole } = renderWithLanguage(<SendText {...textDummyData} />)

    const { error, placeholder, location } = copy.english

    const inputNode: HTMLElement = getByRole(roles[1])
    const buttonNode: HTMLElement = getByRole(roles[2])

    expect(buttonNode).toHaveTextContent(location)
    expect(inputNode).toHaveAttribute('placeholder', placeholder)

    fireEvent.click(buttonNode)

    expect(buttonNode).toHaveTextContent(error)
  })

  it('renders spanish information correctly', () => {
    const { getByRole } = renderWithLanguage(
      <SendText {...textDummyData} />,
      SPANISH,
    )

    const { error, placeholder, location } = copy.spanish

    const inputNode: HTMLElement = getByRole(roles[1])
    const buttonNode: HTMLElement = getByRole(roles[2])

    expect(buttonNode).toHaveTextContent(location)
    expect(inputNode).toHaveAttribute('placeholder', placeholder)

    fireEvent.click(buttonNode)

    expect(buttonNode).toHaveTextContent(error)
  })

  it('clears error value for button after three seconds', () => {
    const { getByRole } = renderWithLanguage(<SendText {...textDummyData} />)

    const { error, location } = copy.english

    const buttonNode: HTMLElement = getByRole(roles[2])

    fireEvent.click(buttonNode)

    expect(buttonNode).toHaveTextContent(error)

    setTimeout(
      () => expect(buttonNode).toHaveTextContent(location),
      delayTimeInMs,
    )
  })

  it('allows user to change value of input box', () => {
    const { getByRole } = renderWithLanguage(<SendText {...textDummyData} />)

    const inputNode: HTMLElement = getByRole(roles[1])

    fireEvent.change(inputNode, { target: { value: dummyPhoneNumber } })

    expect(inputNode).toHaveValue(dummyPhoneNumber)
  })

  it('sends text to api', () => {
    const { getByRole } = renderWithLanguage(<SendText {...textDummyData} />)

    const [inputNode, buttonNode] = [getByRole(roles[1]), getByRole(roles[2])]

    fireEvent.change(inputNode, { target: { value: dummyPhoneNumber } })
    fireEvent.click(buttonNode)

    expect(window.fetch).toHaveBeenCalled()
  })
})
