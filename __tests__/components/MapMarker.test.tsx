import { renderWithAllContext, dummyPGOrgRecord } from '../../__helpers__/'

import MapMarker from '../../components/MapMarker'

describe('<MapMarker />', () => {
  it('renders correctly', () => {
    renderWithAllContext(
      <MapMarker
        locationRecord={{
          ...dummyPGOrgRecord,
          city: 'Los Angeles',
          latitude: 5,
          longitude: 5,
        }}
        testWorkaround
      />,
    )
  })
})
