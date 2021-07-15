import { Fab, Grid } from '@material-ui/core/'
import { useStyles } from '../constants'
import { CategoryFilters } from '../components'
import { Filter } from '../types/filter'
const MobileFilterModal = ({
  fields,
  handleFieldsSelected,
  routeCategory,
  setOpen,
  activeCopy,
}: Filter) => {
  const classes = useStyles()
  return (
    <>
      <Grid
        container
        spacing={3}
        style={{ top: '45%', left: '50%', transform: `translate(-50%, -50%)` }}
        className={classes.paperFilter}
      >
        <Grid item xs={12} sm={12} md={3} style={{ marginLeft: '2rem' }}>
          <p style={{ textAlign: 'center', fontSize: '2rem' }}>
            {activeCopy.chooseFilters}
          </p>
        </Grid>
        <Grid item xs={12} style={{ marginLeft: '2rem' }}>
          <CategoryFilters
            fields={fields}
            handleFieldsSelected={handleFieldsSelected}
            routeCategory={routeCategory}
          />
        </Grid>
        <Grid
          item
          xs={12}
          sm={12}
          md={3}
          style={{ textAlign: 'center', margin: 'auto' }}
        >
          <Fab
            style={{
              textAlign: 'center',
              margin: 'auto',
              fontSize: '1.2rem',
              marginTop: '2rem',
            }}
            onClick={() => setOpen(false)}
            variant="extended"
          >
            {activeCopy.viewResults}
          </Fab>
        </Grid>
      </Grid>
    </>
  )
}
export default MobileFilterModal
