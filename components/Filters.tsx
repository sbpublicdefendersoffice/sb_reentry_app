import { Grid } from '@material-ui/core'
import {
  FilterCity,
  FilterService,
  FilterLanguage,
  FilterPeopleServed,
} from '../components/'
import { Filter } from '../types/filter'
const CategoryFilters = ({
  fields,
  handleFieldsSelected,
  routeCategory,
}: Filter) => {
  return (
    <>
      <Grid container >
        <FilterCity
          fields={fields}
          handleFieldsSelected={handleFieldsSelected}
        />
        <FilterService
          fields={fields}
          handleFieldsSelected={handleFieldsSelected}
          routeCategory={routeCategory}
        />
        <FilterLanguage
          fields={fields}
          handleFieldsSelected={handleFieldsSelected}
        />
        <FilterPeopleServed
          fields={fields}
          handleFieldsSelected={handleFieldsSelected}
        />
      </Grid>
    </>
  )
}
export default CategoryFilters
