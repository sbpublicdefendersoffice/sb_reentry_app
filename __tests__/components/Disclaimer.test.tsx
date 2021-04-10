import { renderWithLanguage } from '../__helpers__'
import { SPANISH } from '../../constants/language'

import Disclaimer, { copy } from '../../components/Disclaimer'

describe('<Disclaimer />', () => {
  it('renders properly', () => {
    const { getByRole } = renderWithLanguage(<Disclaimer />)

    const disclaimerNode: HTMLElement = getByRole('article')

    expect(disclaimerNode).toBeInTheDocument()
  })

  it('displays properly in english', () => {
    const { getByRole } = renderWithLanguage(<Disclaimer />)

    const {
      // disclaimer,
      disclaimerCopy,
    } = copy.english

    // const disclaimerNode: HTMLElement = getByRole('strong')
    const disclaimerCopyNode: HTMLElement = getByRole('paragraph')

    // expect(disclaimerNode).toHaveTextContent(disclaimer)
    expect(disclaimerCopyNode).toHaveTextContent(disclaimerCopy)
  })

  it('displays properly in spanish', () => {
    const { getByRole } = renderWithLanguage(<Disclaimer />, SPANISH)

    const {
      //  disclaimer,
      disclaimerCopy,
    } = copy.spanish

    // const disclaimerNode: HTMLElement = getByRole('strong')
    const disclaimerCopyNode: HTMLElement = getByRole('paragraph')

    // expect(disclaimerNode).toHaveTextContent(disclaimer)
    expect(disclaimerCopyNode).toHaveTextContent(disclaimerCopy)
  })
})
