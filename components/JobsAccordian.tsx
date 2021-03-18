import Typography from '@material-ui/core/Typography'
import Accordion from '@material-ui/core/Accordion'
import AccordionSummary from '@material-ui/core/AccordionSummary'
import AccordionDetails from '@material-ui/core/AccordionDetails'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import Grid from '@material-ui/core/Grid'
import { useStyles } from '../constants/materialStyles'
const JobsAccordian = ({ activeCopy }) => {
  const classes = useStyles()
  return (
    <Accordion>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel3a-content"
        id="panel3a-header"
      >
        <Typography className={classes.heading}>
          {activeCopy.jobSearch}
        </Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Typography className={classes.fontSize}>
              {activeCopy.jobSearchDescription}
            </Typography>
            <Typography>
              <h4 className={classes.h4Style}>{activeCopy.jobSearchClick}</h4>
            </Typography>
            <Typography>
              <div>
                <a
                  className={classes.aBlock}
                  href="https://www.70millionjobs.com/"
                >
                  70 Million Jobs
                </a>

                <a className={classes.aBlock} href="https://www.linkedin.com/">
                  LinkedIn
                </a>
                <a className={classes.aBlock} href="https://www.indeed.com/">
                  Indeed
                </a>
              </div>
            </Typography>
          </Grid>
        </Grid>
      </AccordionDetails>
    </Accordion>
  )
}
JobsAccordian.propTypes = {
  activeCopy: {},
}
export default JobsAccordian
