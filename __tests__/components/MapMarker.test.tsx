import { renderWithAllContext, dummyPGOrgPlusLoc } from '../../__helpers__/'

import MapMarker from '../../components/MapMarker'

describe('<MapMarker />', () => {
  it('renders correctly', () => {
    renderWithAllContext(
      <MapMarker locationRecord={dummyPGOrgPlusLoc} testWorkaround />,
    )
  })
})
