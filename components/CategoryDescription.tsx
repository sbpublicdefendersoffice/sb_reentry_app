/* eslint-disable */
import { Paragraph } from '../ui'
import { Grid } from '@material-ui/core/'
import { useStyles } from '../constants/'
const CategoryDescription = ({ activeCopy, displayDescription }) => {
  const classes = useStyles()
  return (
    <>
      {' '}
      <Grid item xs={12}>
        <p className={classes.landingPageDescription}>{displayDescription}</p>
      </Grid>
      <Grid
        item
        xs={12}
        md={12}
        lg={12}
        style={{ textAlign: 'center', minWidth: '100%' }}
      >
        <Paragraph
          style={{
            fontSize: '1.4rem',
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
