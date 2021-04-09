import { ReactElement } from 'react'
import { render, RenderResult } from '@testing-library/react'

import { Provider as LangProvider } from '../../hooks/useLanguage'
import Footer from '../../components/Footer'

// eslint-disable-next-line @typescript-eslint/no-empty-function
const blankFn = (): void => {}

const renderWithLanguage = (component: ReactElement): RenderResult =>
  render(
    <LangProvider
      value={{
        language: 'english',
        setLanguage: blankFn,
      }}
    >
      {component}
    </LangProvider>,
  )

describe('<Footer />', () => {
  it("displays SBPD office's link", (): void => {
    const { getByText } = renderWithLanguage(<Footer />)
    const pdLink: HTMLElement = getByText(
      "Santa Barbara County Public Defender's Office",
    )
    expect(pdLink).toBeInTheDocument()
  })
})
