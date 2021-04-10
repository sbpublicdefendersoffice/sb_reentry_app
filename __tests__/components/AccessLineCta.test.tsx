import { renderWithAllContext } from '../__helpers__'
import AccessLineCta, {
  copy,
  accessLineInfo,
} from '../../components/AccessLineCta'
import { SPANISH } from '../../constants/language'

describe('<AccessLineCta />', () => {
  it('renders access line information', () => {
    const { getByRole } = renderWithAllContext(<AccessLineCta />)

    const { displayNumber, href } = accessLineInfo

    const displayNode: HTMLElement = getByRole('link_paragraph')
    const linkNode: HTMLElement = getByRole('link')

    expect(displayNode).toHaveTextContent(displayNumber)
    expect(linkNode).toHaveAttribute('href', href)
  })

  it('renders correctly in english', () => {
    const { getAllByRole, getByRole } = renderWithAllContext(<AccessLineCta />)

    const { agency, title, instruction, buttonText, call } = copy.english

    const [agencyNode, titleNode] = getAllByRole('heading')
    const instructionNode: HTMLElement = getByRole('article')
    const buttonNode: HTMLElement = getByRole('button')
    const linkNode: HTMLElement = getByRole('link')

    expect(agencyNode).toHaveTextContent(agency)
    expect(titleNode).toHaveTextContent(title)
    expect(instructionNode).toHaveTextContent(instruction)
    expect(buttonNode).toHaveTextContent(buttonText)
    expect(linkNode).toHaveTextContent(call)
  })

  it('renders correctly in spanish', () => {
    const { getAllByRole, getByRole } = renderWithAllContext(
      <AccessLineCta />,
      SPANISH,
    )

    const { agency, title, instruction, buttonText, call } = copy.spanish

    const [agencyNode, titleNode] = getAllByRole('heading')
    const instructionNode: HTMLElement = getByRole('article')
    const buttonNode: HTMLElement = getByRole('button')
    const linkNode: HTMLElement = getByRole('link')

    expect(agencyNode).toHaveTextContent(agency)
    expect(titleNode).toHaveTextContent(title)
    expect(instructionNode).toHaveTextContent(instruction)
    expect(buttonNode).toHaveTextContent(buttonText)
    expect(linkNode).toHaveTextContent(call)
  })
})
