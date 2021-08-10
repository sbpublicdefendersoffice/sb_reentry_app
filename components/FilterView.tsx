/* eslint-disable */
import {
  FilterCity,
  FilterService,
  FilterLanguage,
  FilterPeopleServed,
} from '.'
import { Filter } from '../types/filter'

const FilterView = ({
  fields,
  handleFieldsSelected,
  routeCategory,
}: Filter) => (
  <>
    <FilterCity fields={fields} handleFieldsSelected={handleFieldsSelected} />
    {/* <FilterService
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
      /> */}
  </>
)

export default FilterView
