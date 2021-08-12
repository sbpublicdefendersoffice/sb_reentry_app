/* eslint-disable */
import { Grid } from '@material-ui/core/'
const DisplayCategoryImage = ({ displayCategory, routeCategory }) => {
  return (
    <>
      <Grid item xs={12} sm={12} md={4} style={{ maxWidth: '100%' }}>
        <img
          style={{
            width: '15rem',
            height: '9rem',
          }}
          src={`/icons/${routeCategory.replace(' ', '')}.svg`}
          alt={`Pic of ${displayCategory}`}
        />
      </Grid>
    </>
  )
}
export default DisplayCategoryImage
