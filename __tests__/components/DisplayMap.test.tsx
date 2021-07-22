import { renderWithAllContext, dummyPGOrgRecord } from '../../__helpers__'

import { SPANISH } from '../../constants/language'

import DisplayMap from '../../components/DisplayMap'

describe('<DisplayMap />', () => {
  it('renders correctly in english', () => {
    const { getByRole } = renderWithAllContext(
      <DisplayMap
        latLongInfo={[
          {
            ...dummyPGOrgRecord,
            city: 'Los Angeles',
            latitude: 5,
            longitude: 5,
          },
        ]}
        testWorkaround
      />,
    )

    const [mapNode, summaryNode] = [getByRole('main'), getByRole('definition')]

    expect(mapNode).toBeInTheDocument()
    expect(summaryNode).toHaveTextContent('Map')
  })

  it('renders correctly in spanish', () => {
    const { getByRole } = renderWithAllContext(
      <DisplayMap
        latLongInfo={[
          {
            ...dummyPGOrgRecord,
            city: 'Los Angeles',
            latitude: 5,
            longitude: 5,
          },
        ]}
        testWorkaround
      />,
      { language: SPANISH },
    )

    const [mapNode, summaryNode] = [getByRole('main'), getByRole('definition')]

    expect(mapNode).toBeInTheDocument()
    expect(summaryNode).toHaveTextContent('Mapa')
  })
})
