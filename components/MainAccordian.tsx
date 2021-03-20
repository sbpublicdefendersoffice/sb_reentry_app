import Typography from '@material-ui/core/Typography'
import Accordion from '@material-ui/core/Accordion'
import AccordionSummary from '@material-ui/core/AccordionSummary'
import AccordionDetails from '@material-ui/core/AccordionDetails'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import Grid from '@material-ui/core/Grid'
import { useStyles } from '../constants/materialStyles'
const Accordian = ({ accord }) => {
  const classes = useStyles()
  return (
    <Accordion>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel3a-content"
        id="panel3a-header"
      >
        <Typography className={classes.heading}>{accord.title}</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Grid container spacing={3}>
          <Grid item xs={12} className={classes.heading}>
            <Typography className={classes.fontSize}>
              {accord.description}
            </Typography>
            <Typography>
              <h4 className={classes.h4Style}>{accord.actionClick}</h4>
            </Typography>
            <Typography>
              <div>
                <a className={classes.aBlock} href={accord.itemOneUrl}>
                  {accord.itemOne}
                </a>
                <a className={classes.aBlock} href={accord.itemTwoUrl}>
                  {accord.itemTwo}
                </a>
                {accord && accord.itemThree ? (
                  <a className={classes.aBlock} href={accord.itemThreeUrl}>
                    {accord.itemThree}
                  </a>
                ) : null}
                {accord && accord.itemFour ? (
                  <a className={classes.aBlock} href={accord.itemFourURl}>
                    {accord.itemFour}
                  </a>
                ) : null}
                {accord && accord.itemFive ? (
                  <a className={classes.aBlock} href={accord.itemFiveUrl}>
                    {accord.itemFive}
                  </a>
                ) : null}
                {accord && accord.disclaimer ? (
                  <h2 className={classes.aBlock}>{accord.disclaimer}</h2>
                ) : null}
              </div>
            </Typography>
          </Grid>
        </Grid>
      </AccordionDetails>
    </Accordion>
  )
}
Accordian.propTypes = {
  accord: {},
}
export default Accordian
