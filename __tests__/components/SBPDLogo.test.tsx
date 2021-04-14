import { renderWithLanguage } from '../../__helpers__/contexts'

import { SPANISH } from '../../constants/language'

import SBPDLogo, { altText } from '../../components/SBPDLogo'

describe('<SBPDLogo />', () => {
  it('renders correctly in english', () => {
    const { getByRole } = renderWithLanguage(<SBPDLogo />)

    const logoNode: HTMLElement = getByRole('img')

    expect(logoNode).toHaveAttribute('alt', altText.english)
  })

  it('renders correctly in spanish', () => {
    const { getByRole } = renderWithLanguage(<SBPDLogo />, SPANISH)

    const logoNode: HTMLElement = getByRole('img')

    expect(logoNode).toHaveAttribute('alt', altText.spanish)
  })
})
