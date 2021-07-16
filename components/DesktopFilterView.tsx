import React from 'react'
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
      <Grid item md={12}>
        <Paper
          elevation={3}
          style={{
            margin: 'auto',
            marginBottom: '5rem',
            display: 'flex',
            padding: '3rem',
            width: '80%',
          }}
        >
          <Grid container>
            <Grid item md={12}>
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
        </Paper>
      </Grid>
    </>
  )
}
export default DesktopFilterView
