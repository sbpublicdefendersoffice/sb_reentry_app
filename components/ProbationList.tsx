import Grid from '@material-ui/core/Grid'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import Paper from '@material-ui/core/Paper'
import { useStyles } from '../constants/materialStyles'

const ProbationList = ({ activeProbation, key }) => {
  const classes = useStyles()
  return (
    <Grid item xs={6} key={key} sm={4}>
      <Paper className={classes.paperCard}>
        <List>
          <ListItem>
            <ListItemText classes={{ primary: classes.listItemText }}>
              {activeProbation.name}
            </ListItemText>
          </ListItem>
          <ListItem>
            <ListItemText
              classes={{ primary: classes.listItemText }}
              primary={activeProbation.phone}
            />
          </ListItem>
          <ListItem>
            <ListItemText classes={{ primary: classes.listItemText }}>
              <div>{activeProbation.address}</div>
              <div>{activeProbation.cityStateZip}</div>
            </ListItemText>
          </ListItem>
        </List>
      </Paper>
    </Grid>
  )
}
ProbationList.propTypes = {
  activeProbation: {},
  key: {},
}
export default ProbationList
