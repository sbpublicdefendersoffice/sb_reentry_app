import React from 'react'
import { Paragraph } from '../ui'
import { Grid } from '@material-ui/core/'
import { useStyles } from '../constants/'
const CategoryDescription = ({ activeCopy, displayDescription }) => {
  const classes = useStyles()
  return (
    <>
      {' '}
      <Grid item xs={12} sm={12} md={8}>
        <p className={classes.landingPageDescription}>{displayDescription}</p>
      </Grid>
      <Grid item xs={12} md={12}>
        <Paragraph
          style={{
            textAlign: 'center',
            display: 'block',
            fontSize: '2rem',
            fontFamily: 'Roboto',
          }}
        >
          {activeCopy.chooseFilter}
        </Paragraph>
      </Grid>
    </>
  )
}

export default CategoryDescription
