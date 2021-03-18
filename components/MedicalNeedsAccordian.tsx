import Typography from '@material-ui/core/Typography'
import Accordion from '@material-ui/core/Accordion'
import AccordionSummary from '@material-ui/core/AccordionSummary'
import AccordionDetails from '@material-ui/core/AccordionDetails'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import Grid from '@material-ui/core/Grid'
import { useStyles } from '../constants/materialStyles'
const MedicalNeedsAccordian = ({ activeCopy }) => {
  const classes = useStyles()
  return (
    <Accordion>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel3a-content"
        id="panel3a-header"
      >
        <Typography className={classes.heading}>
          {activeCopy.medicalNeeds}
        </Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Typography className={classes.fontSize}>
              {activeCopy.medicalNeedsDescription}
            </Typography>
            <Typography>
              <h4 className={classes.h4Style}>
                {activeCopy.medicalNeedsClick}
              </h4>
            </Typography>
            <Typography>
              <div>
                <a className={classes.aBlock} href="">
                  Medi-Cal
                </a>
                <a className={classes.aBlock} href="">
                  {activeCopy.healthInsuranceInfo}
                </a>
                <a className={classes.aBlock} href="">
                  Medicare
                </a>
                <a className={classes.aBlock} href="">
                  {activeCopy.medicalClinics}
                </a>
              </div>
            </Typography>
          </Grid>
        </Grid>
      </AccordionDetails>
    </Accordion>
  )
}
MedicalNeedsAccordian.propTypes = {
  activeCopy: {},
}
export default MedicalNeedsAccordian
