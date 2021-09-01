/* eslint-disable */
import { Fab } from '@material-ui/core/'
import { FilterList, List, Room } from '@material-ui/icons/'
import { useView } from '../hooks/'

const MobileButtonsLandingPage = ({ activeCopy, setOpen }) => {
  const { dispatch } = useView()
  return (
    <>
      <div
        style={{
          margin: 'auto',
          marginTop: '2rem',
          marginBottom: '2rem',
          width: '100%',
        }}
      >
        <Fab
          variant="extended"
          style={{ margin: '1rem' }}
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
          style={{ margin: '1rem' }}
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

        <Fab
          variant="extended"
          style={{ margin: '1rem' }}
          onClick={() => setOpen(true)}
        >
          <FilterList />
          {activeCopy.filter}
        </Fab>
      </div>
    </>
  )
}
export default MobileButtonsLandingPage
