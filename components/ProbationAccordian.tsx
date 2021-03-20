import Typography from '@material-ui/core/Typography'
import Accordion from '@material-ui/core/Accordion'
import AccordionSummary from '@material-ui/core/AccordionSummary'
import AccordionDetails from '@material-ui/core/AccordionDetails'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import Grid from '@material-ui/core/Grid'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import { probations } from '../constants/probations'
import Paper from '@material-ui/core/Paper'
import useLanguage from '../hooks/useLanguage'
import { useStyles } from '../constants/materialStyles'
import ProbationList from './ProbationList'
import { probationAccordian } from '../constants/checklist-data'
const ProbationAccordian = () => {
  const classes = useStyles()
  const { language } = useLanguage()
  const activeProbationAccordianCopy = probationAccordian[language]
  return (
    <Accordion>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1a-content"
        id="panel1a-header"
      >
        <Typography className={classes.heading}>
          {activeProbationAccordianCopy.title}
        </Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Paper className={classes.paper}>
              {' '}
              <Typography className={classes.fontSize}>
                {activeProbationAccordianCopy.description}
                {activeProbationAccordianCopy.actionClick}
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={12}>
            <Paper className={classes.paper}>
              {' '}
              <Typography className={classes.heading}>
                <h5 className={classes.h4Style}>
                  {activeProbationAccordianCopy.itemOne}
                </h5>
                <div className={classes.centerFlex}>
                  <p> {activeProbationAccordianCopy.itemTwo}</p>
                  <a href={activeProbationAccordianCopy.itemTwoUrl}>
                    {' '}
                    {activeProbationAccordianCopy.itemTwoUrl}
                  </a>
                </div>
              </Typography>
            </Paper>
          </Grid>
          <h2 className={classes.centerCard}>
            {activeProbationAccordianCopy.itemThree}
          </h2>

          {probations.map((probation, key) => {
            const activeProbation = probation[language]

            return <ProbationList activeProbation={activeProbation} key={key} />
          })}

          <Grid item xs={12}>
            <Paper className={classes.paper}>
              <List>
                <ListItem>
                  <ListItemText classes={{ primary: classes.listItemText }}>
                    <div>{activeProbationAccordianCopy.itemThree}</div>
                    <div>
                      <a href={activeProbationAccordianCopy.itemFourUrl}>
                        {activeProbationAccordianCopy.itemFour}
                      </a>
                    </div>
                  </ListItemText>
                </ListItem>
              </List>
            </Paper>
          </Grid>
        </Grid>
      </AccordionDetails>
    </Accordion>
  )
}
ProbationAccordian.propTypes = {
  activeCopy: {},
}
export default ProbationAccordian
