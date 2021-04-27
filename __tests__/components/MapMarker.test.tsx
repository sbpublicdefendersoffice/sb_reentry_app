import { renderWithAllContext, dummyLocationRecord } from '../../__helpers__/'

import MapMarker from '../../components/MapMarker'

describe('<MapMarker />', () => {
  it('renders correctly', () => {
    renderWithAllContext(
      <MapMarker locationRecord={dummyLocationRecord} testWorkaround />,
    )
  })
})
