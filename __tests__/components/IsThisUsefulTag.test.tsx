import { renderWithAllContext } from '../../__helpers__/contexts'

import { SPANISH } from '../../constants/language'

import IsThisUsefulTag, { copy } from '../../components/IsThisUsefulTag'

describe('<IsThisUsefulTag />', () => {
  it('renders english content correctly', () => {
    const { getByRole, getAllByRole } = renderWithAllContext(
      <IsThisUsefulTag />,
    )

    const { useful, yes, no } = copy.english

    const [menuNode, termNode] = [getByRole('menubar'), getByRole('term')]

    const [yesNode, noNode] = getAllByRole('link')

    expect(menuNode).toBeInTheDocument()
    expect(termNode).toHaveTextContent(useful)
    expect(yesNode).toHaveTextContent(yes)
    expect(noNode).toHaveTextContent(no)
  })

  it('renders spanish content correctly', () => {
    const { getByRole, getAllByRole } = renderWithAllContext(
      <IsThisUsefulTag />,
      {
        language: SPANISH,
      },
    )

    const { useful, yes, no } = copy.spanish

    const [menuNode, termNode] = [getByRole('menubar'), getByRole('term')]

    const [yesNode, noNode] = getAllByRole('link')

    expect(menuNode).toBeInTheDocument()
    expect(termNode).toHaveTextContent(useful)
    expect(yesNode).toHaveTextContent(yes)
    expect(noNode).toHaveTextContent(no)
  })
})
