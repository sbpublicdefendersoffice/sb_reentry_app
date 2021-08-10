/* eslint-disable */
import { Grid } from '@material-ui/core/'
import CategoryFilters from '../components/Filters'

const DesktopFilterView = ({ fields, handleFieldsSelected, routeCategory }) => (
  <Grid container>
    <CategoryFilters
      fields={fields}
      handleFieldsSelected={handleFieldsSelected}
      routeCategory={routeCategory}
    />
  </Grid>
)

export default DesktopFilterView
