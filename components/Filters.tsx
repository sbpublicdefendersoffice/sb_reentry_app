import { Grid } from '@mui/material'
import FilterCity from './FilterCity'
import FilterService from './FilterService'

import { Filter } from '../types/filter'
const CategoryFilters = ({
  fields,
  handleFieldsSelected,
  routeCategory,
}: Filter) => {
  return (
    <>
      <Grid container>
        <FilterCity
          fields={fields}
          handleFieldsSelected={handleFieldsSelected}
        />
        <FilterService
          fields={fields}
          handleFieldsSelected={handleFieldsSelected}
          routeCategory={routeCategory}
        />
        {/* <FilterLanguage
          fields={fields}
          handleFieldsSelected={handleFieldsSelected}
        />
        <FilterPeopleServed
          fields={fields}
          handleFieldsSelected={handleFieldsSelected}
        /> */}
      </Grid>
    </>
  )
}
export default CategoryFilters
