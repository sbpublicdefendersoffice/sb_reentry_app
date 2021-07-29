import React, { useContext } from 'react'
import { Grid, Fab } from '@material-ui/core/'
import { FilterList, List, Room } from '@material-ui/icons/'
import { ViewContext } from '../hooks/'
const MobileButtonsLandingPage = ({ activeCopy, setOpen }) => {
  const { dispatch } = useContext(ViewContext)
  return (
    <>
      <Grid container spacing={2} justify="center">
        <Grid item xs={3}>
          <Fab
            variant="extended"
            onClick={e => {
              e.preventDefault()
              dispatch({
                type: 'toggleList',
              })
            }}
          >
            <List />
            {activeCopy.list}
          </Fab>
        </Grid>
        <Grid item xs={3}>
          <Fab
            variant="extended"
            onClick={e => {
              e.preventDefault()
              dispatch({
                type: 'toggleMap',
              })
            }}
          >
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
