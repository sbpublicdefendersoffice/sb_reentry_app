import { fireEvent, waitFor } from '@testing-library/dom'

import { renderWithAllContext } from '../../__helpers__/contexts'

import { SPANISH } from '../../constants/language'

import { copy as childCopy } from '../../components/IsThisUsefulForm'
import IsThisUsefulTag, { copy } from '../../components/IsThisUsefulTag'

describe('<IsThisUsefulTag />', () => {
  it('renders english content correctly', () => {
    const { getByRole, getAllByRole } = renderWithAllContext(
      <IsThisUsefulTag />,
    )

    const { useful, yes, no } = copy.english

    const [menuNode, termNode] = [getByRole('region'), getByRole('term')]

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

    const [menuNode, termNode] = [getByRole('region'), getByRole('term')]

    const [yesNode, noNode] = getAllByRole('link')

    expect(menuNode).toBeInTheDocument()
    expect(termNode).toHaveTextContent(useful)
    expect(yesNode).toHaveTextContent(yes)
    expect(noNode).toHaveTextContent(no)
  })

  it('displays child form component', async () => {
    const { getAllByRole, getByRole } = renderWithAllContext(
      <IsThisUsefulTag />,
    )

    const yesNode: HTMLElement = getAllByRole('link')[0]

    fireEvent.click(yesNode)

    const formNode: HTMLElement = await waitFor(() => getByRole('form'))

    expect(formNode).toBeInTheDocument()
  })

  it('does not display child form component if router prop asPath is falsy', () => {
    const { getAllByRole, getByRole } = renderWithAllContext(
      <IsThisUsefulTag />,
      {
        routerOptions: { asPath: '' },
      },
    )

    const yesNode: HTMLElement = getAllByRole('link')[0]

    fireEvent.click(yesNode)

    expect(() => getByRole('form')).toThrowError()
  })

  it('switches text when radio buttons are clicked', async () => {
    const { getAllByRole } = renderWithAllContext(<IsThisUsefulTag />)

    const { usefulHeading, notUsefulHeading } = childCopy.english

    const yesNode: HTMLElement = getAllByRole('link')[0]

    fireEvent.click(yesNode)

    const headingNode: HTMLElement = await waitFor(() =>
      getAllByRole('article').pop(),
    )

    expect(headingNode).toHaveTextContent(usefulHeading)

    const noRadio: HTMLElement = getAllByRole('radio').pop()

    fireEvent.click(noRadio)

    expect(headingNode).toHaveTextContent(notUsefulHeading)
  })

  it('closes child form component when X switch is clicked', async () => {
    const { getAllByRole, getByRole } = renderWithAllContext(
      <IsThisUsefulTag />,
    )

    const yesNode: HTMLElement = getAllByRole('link')[0]

    fireEvent.click(yesNode)

    const switchNode: HTMLElement = await waitFor(() => getByRole('switch'))

    fireEvent.click(switchNode)

    expect(() => getByRole('form')).toThrowError()
  })
})
