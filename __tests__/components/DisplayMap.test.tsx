import { renderWithAllContext, dummyPGOrgPlusLoc } from '../../__helpers__'

import { SPANISH } from '../../constants/language'

import DisplayMap from '../../components/DisplayMap'

const mapProps = { latLongInfo: [dummyPGOrgPlusLoc], testWorkaround: true }

describe('<DisplayMap />', () => {
  it('renders correctly in english', () => {
    const { getByRole } = renderWithAllContext(<DisplayMap {...mapProps} />)

    const [mapNode, summaryNode] = [getByRole('main'), getByRole('definition')]

    expect(mapNode).toBeInTheDocument()
    expect(summaryNode).toHaveTextContent('Map')
  })

  it('renders correctly in spanish', () => {
    const { getByRole } = renderWithAllContext(<DisplayMap {...mapProps} />, {
      language: SPANISH,
    })

    const [mapNode, summaryNode] = [getByRole('main'), getByRole('definition')]

    expect(mapNode).toBeInTheDocument()
    expect(summaryNode).toHaveTextContent('Mapa')
  })
})
