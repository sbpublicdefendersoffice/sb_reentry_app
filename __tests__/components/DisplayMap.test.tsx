import { renderWithAllContext, dummyLocationRecord } from '../../__helpers__'

import { SPANISH } from '../../constants/language'

import DisplayMap from '../../components/DisplayMap'

describe('<DisplayMap />', () => {
  it('renders correctly in english', () => {
    const { getByRole } = renderWithAllContext(
      <DisplayMap latLongInfo={[dummyLocationRecord]} testWorkaround />,
    )

    const [mapNode, summaryNode] = [getByRole('main'), getByRole('definition')]

    expect(mapNode).toBeInTheDocument()
    expect(summaryNode).toHaveTextContent('Map')
  })

  it('renders correctly in spanish', () => {
    const { getByRole } = renderWithAllContext(
      <DisplayMap latLongInfo={[dummyLocationRecord]} testWorkaround />,
      { language: SPANISH },
    )

    const [mapNode, summaryNode] = [getByRole('main'), getByRole('definition')]

    expect(mapNode).toBeInTheDocument()
    expect(summaryNode).toHaveTextContent('Mapa')
  })
})
