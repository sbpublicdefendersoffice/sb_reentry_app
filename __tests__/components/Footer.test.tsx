import { renderWithLanguage } from '../__helpers__'
import Footer from '../../components/Footer'

describe('<Footer />', () => {
  it("displays SBPD office's link", (): void => {
    const { getByText } = renderWithLanguage(<Footer />)
    const pdLink: HTMLElement = getByText(
      "Santa Barbara County Public Defender's Office",
    )
    expect(pdLink).toBeInTheDocument()
  })
})
