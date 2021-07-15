import React from 'react'
import { Grid } from '@material-ui/core/'
import { Title } from '../ui/'
const DisplayCategoryImage = ({ displayCategory, routeCategory }) => {
  return (
    <>
      <Grid item xs={12}>
        <Title>{displayCategory}</Title>
      </Grid>
      <Grid item xs={12} sm={12} md={4}>
        <img
          style={{
            width: '15rem',
            height: '15rem',
          }}
          src={`/icons/${routeCategory.replace(' ', '')}.svg`}
          alt={`Pic of ${displayCategory}`}
        />
      </Grid>
    </>
  )
}
export default DisplayCategoryImage
