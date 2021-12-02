/* eslint-disable */
import { Fab } from '@mui/material'
import { FilterList, List, Room } from '@mui/icons-material'
import { useView } from '../hooks/'

const MobileButtonsLandingPage = ({ activeCopy, setOpen, showFilter }) => {
  const { setIsMapView } = useView()
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
            setIsMapView(false)
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
            setIsMapView(true)
          }}
        >
          <Room />
          {activeCopy.map}
        </Fab>

        {showFilter === 'true' && (
          <Fab
            variant="extended"
            style={{ margin: '1rem' }}
            onClick={() => setOpen(true)}
          >
            <FilterList />
            {activeCopy.filter}
          </Fab>
        )}
      </div>
    </>
  )
}
export default MobileButtonsLandingPage
