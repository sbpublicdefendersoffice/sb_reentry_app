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
        <Grid item xs={12}>
          <p style={{ textAlign: 'center', fontSize: '2rem' }}>
            {activeCopy.chooseFilters}
          </p>
        </Grid>
        <Grid item xs={12} style={{ marginBottom: '2rem', marginLeft: '5rem' }}>
          <CategoryFilters
            fields={fields}
            handleFieldsSelected={handleFieldsSelected}
            routeCategory={routeCategory}
          />
        </Grid>
        <Grid item xs={12} style={{ textAlign: 'center' }}>
          <Fab
            style={{
              marginTop: '2rem',
              margin: 'auto',
              fontSize: '1.2rem',
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
