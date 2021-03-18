import Typography from '@material-ui/core/Typography'
import Accordion from '@material-ui/core/Accordion'
import AccordionSummary from '@material-ui/core/AccordionSummary'
import AccordionDetails from '@material-ui/core/AccordionDetails'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import Grid from '@material-ui/core/Grid'
import { useStyles } from '../constants/materialStyles'
const FoodAccordian = ({ activeCopy }) => {
  const classes = useStyles()
  return (
    <Accordion>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel2a-content"
        id="panel2a-header"
      >
        <Typography className={classes.heading}>
          {activeCopy.foodResources}
        </Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Typography>
              <div className={classes.fontSize}>
                {activeCopy.foodResourcesDescription}
              </div>
            </Typography>
            <Typography>
              <h4 className={classes.h4Style}>
                {activeCopy.foodResourceClick}
              </h4>
            </Typography>
            <Typography>
              <div>
                <a className={classes.aBlock} href="">
                  {activeCopy.foodPantries}
                </a>
                <a className={classes.aBlock} href="">
                  {activeCopy.foodMeals}
                </a>
                <a className={classes.aBlock} href="">
                  Cal-Fresh ( {activeCopy.foodStamps})
                </a>
              </div>
            </Typography>
          </Grid>
        </Grid>
      </AccordionDetails>
    </Accordion>
  )
}
FoodAccordian.propTypes = {
  activeCopy: {},
}
export default FoodAccordian
