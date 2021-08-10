/* eslint-disable */
import { Grid, Paper } from '@material-ui/core/'
import { CategoryFilters } from '../components/'
const DesktopFilterView = ({
  activeCopy,
  fields,
  handleFieldsSelected,
  routeCategory,
}) => {
  return (
    <>
      <Grid container>
        <Grid item xs={12}>
          <p
            style={{
              fontSize: '1.5rem',
              marginTop: '1rem',
              marginBottom: '2rem',
            }}
          >
            {activeCopy.chooseFilters}
          </p>
        </Grid>
        <CategoryFilters
          fields={fields}
          handleFieldsSelected={handleFieldsSelected}
          routeCategory={routeCategory}
        />
      </Grid>
    </>
  )
}
export default DesktopFilterView
