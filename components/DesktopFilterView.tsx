import React from 'react'
import { Paper } from '@material-ui/core/'
import { CategoryFilters } from '../components/'
const DesktopFilterView = ({
  activeCopy,
  fields,
  handleFieldsSelected,
  routeCategory,
}) => {
  return (
    <>
      <Paper
        elevation={3}
        style={{
          marginLeft: '3rem',
          marginBottom: '5rem',
          padding: '3rem',
        }}
      >
        <p
          style={{
            fontSize: '1.5rem',
            marginTop: '1rem',
            marginBottom: '2rem',
          }}
        >
          {activeCopy.chooseFilters}
        </p>
        <CategoryFilters
          fields={fields}
          handleFieldsSelected={handleFieldsSelected}
          routeCategory={routeCategory}
        />
      </Paper>
    </>
  )
}
export default DesktopFilterView
