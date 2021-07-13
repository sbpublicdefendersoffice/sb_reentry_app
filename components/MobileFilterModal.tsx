import Fab from '@material-ui/core/Fab'
import Grid from '@material-ui/core/Grid'
import { Paragraph } from '../ui'
import { useLanguage } from '../hooks/'
import { useStyles } from '../constants'
import { CategoryFilters } from '../components'
import { Filter } from '../types/filter'
const MobileFilterModal = ({
  citySelected,
  serviceSelected,
  genderSelected,
  languageSelected,
  handleSelected,
  MenuProps,
  newServiceFilter,
  modalStyle,
  setOpen,
  activeCopy,
}: Filter) => {
  const classes = useStyles()
  return (
    <>
      <Grid
        container
        spacing={3}
        style={modalStyle}
        className={classes.paperFilter}
      >
        <Grid item xs={12} sm={12} md={3}>
          <Paragraph style={{ textAlign: 'center' }}>
            {activeCopy.chooseFilters}
          </Paragraph>
        </Grid>
        <CategoryFilters
          citySelected={citySelected}
          serviceSelected={serviceSelected}
          genderSelected={genderSelected}
          languageSelected={languageSelected}
          handleSelected={handleSelected}
          MenuProps={MenuProps}
          newServiceFilter={newServiceFilter}
        />
        <Grid
          item
          xs={12}
          sm={12}
          md={3}
          style={{ textAlign: 'center', margin: 'auto' }}
        >
          <Fab
            style={{ textAlign: 'center', margin: 'auto' }}
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
