import React from 'react'
import { Grid, Fab } from '@material-ui/core/'
import { FilterList, List, Room } from '@material-ui/icons/'
const MobileButtonsLandingPage = ({ activeCopy, setCurrentView, setOpen }) => {
  return (
    <>
      {' '}
      <Grid container spacing={2} justify="center">
        <Grid item xs={3}>
          <Fab variant="extended" onClick={() => setCurrentView('list')}>
            <List />
            {activeCopy.list}
          </Fab>
        </Grid>
        <Grid item xs={3}>
          <Fab variant="extended" onClick={() => setCurrentView('map')}>
            <Room />
            {activeCopy.map}
          </Fab>
        </Grid>
        <Grid item xs={3}>
          <Fab variant="extended" onClick={() => setOpen(true)}>
            <FilterList />
            {activeCopy.filter}
          </Fab>
        </Grid>
      </Grid>
    </>
  )
}
export default MobileButtonsLandingPage
