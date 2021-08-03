import React, { useContext } from 'react'
import { Grid, Fab } from '@material-ui/core/'
import { FilterList, List, Room } from '@material-ui/icons/'
import { ViewContext } from '../hooks/'
import { useStyles } from '../constants'

const MobileButtonsLandingPage = ({ activeCopy, setOpen }) => {
  const { dispatch } = useContext(ViewContext)
  const classes = useStyles()
  return (
    <>

     <div style={{margin: "auto", marginTop: "2rem", marginBottom: "2rem", width: "100%"}}>
          <Fab
            variant="extended"
            style={{margin: "1rem"}}
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
    
   
          <Fab
            variant="extended"
            style={{margin: "1rem"}}
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
 
          <Fab variant="extended" style={{margin: "1rem"}} onClick={() => setOpen(true)}>
            <FilterList />
            {activeCopy.filter}
          </Fab>
          </div>
    
    </>
  )
}
export default MobileButtonsLandingPage
