import { renderWithLanguage } from '../../__helpers__/contexts'

import LetUsHelpTitle, { copy } from '../../components/LetUsHelpTitle'
import { SPANISH } from '../../constants/language'

describe('<LetUsHelpCta />', () => {
  it('renders correctly in english', () => {
    const { getByRole } = renderWithLanguage(<LetUsHelpTitle />)

    const { pageTitle, pageHeading } = copy.english

    const [titleNode, articleNode] = [
      getByRole('heading'),
      getByRole('article'),
    ]

    expect(titleNode).toHaveTextContent(pageTitle)
    expect(articleNode).toHaveTextContent(pageHeading)
  })

  it('renders correctly in spanish', () => {
    const { getByRole } = renderWithLanguage(<LetUsHelpTitle />, SPANISH)

    const { pageTitle, pageHeading } = copy.spanish

    const [titleNode, articleNode] = [
      getByRole('heading'),
      getByRole('article'),
    ]

    expect(titleNode).toHaveTextContent(pageTitle)
    expect(articleNode).toHaveTextContent(pageHeading)
  })
})
