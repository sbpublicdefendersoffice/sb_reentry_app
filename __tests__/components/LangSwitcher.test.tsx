import { fireEvent } from '@testing-library/react'

import { renderWithAllContext } from '../__helpers__/contexts'
import { SPANISH } from '../../constants/language'

import LangSwitcher, { disabledTimeInMs } from '../../components/LangSwitcher'

describe('<LangSwitcher />', () => {
  it('initally renders switch correcly', () => {
    const { getByRole } = renderWithAllContext(<LangSwitcher />)

    const labelNode: HTMLElement = getByRole('option')

    expect(labelNode).toBeInTheDocument()
  })

  it('renders component as unchecked when language is english', () => {
    const { getByRole } = renderWithAllContext(<LangSwitcher />)

    const checkboxNode: HTMLElement = getByRole('checkbox')

    expect(checkboxNode).not.toHaveAttribute('checked')
  })

  it('renders component as checked when language is spanish', () => {
    const { getByRole } = renderWithAllContext(<LangSwitcher />, {
      language: SPANISH,
    })

    const checkboxNode: HTMLElement = getByRole('checkbox')

    expect(checkboxNode).toHaveAttribute('checked')
  })

  it('turns check attribute on and off when clicked', () => {
    const { getByRole } = renderWithAllContext(<LangSwitcher />)

    const checkboxNode: HTMLElement = getByRole('checkbox')

    fireEvent.click(checkboxNode)

    setTimeout(
      () => expect(checkboxNode).toHaveAttribute('checked'),
      disabledTimeInMs,
    )

    fireEvent.click(checkboxNode)

    setTimeout(
      () => expect(checkboxNode).toHaveAttribute('checked', ''),
      disabledTimeInMs,
    )
  })
})
