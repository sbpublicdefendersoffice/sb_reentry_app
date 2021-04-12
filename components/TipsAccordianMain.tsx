import Typography from '@material-ui/core/Typography'
import Accordion from '@material-ui/core/Accordion'
import AccordionSummary from '@material-ui/core/AccordionSummary'
import AccordionDetails from '@material-ui/core/AccordionDetails'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import Grid from '@material-ui/core/Grid'
import { useStyles } from '../constants/materialStyles'
import useLanguage from '../hooks/useLanguage'
import { tipsAccordian } from '../constants/checklist-data'
const TipsAccordianMain = () => {
  const { language } = useLanguage()
  const activeTipsAccordianCopy = tipsAccordian[language]
  const classes = useStyles()
  return (
    <Accordion>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel3a-content"
        id="panel3a-header"
      >
        <Typography className={classes.heading}>
          {activeTipsAccordianCopy.title}
        </Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Typography className={classes.fontSize}>
              {activeTipsAccordianCopy.description}
            </Typography>
            <Typography className={classes.fontSize}>
              <h4 className={classes.h4Style}>
                {activeTipsAccordianCopy.actionClick}
              </h4>
            </Typography>
            <Typography>
              <div>
                <ul className={classes.ulist}>
                  <li className={classes.listItem}>
                    {activeTipsAccordianCopy.itemOne}
                  </li>
                  <li className={classes.listItem}>
                    {activeTipsAccordianCopy.itemTwo}
                  </li>
                  <li className={classes.listItem}>
                    {activeTipsAccordianCopy.itemThree}
                  </li>
                  <li className={classes.listItem}>
                    {activeTipsAccordianCopy.itemFour}
                  </li>
                </ul>
              </div>
            </Typography>
          </Grid>
        </Grid>
      </AccordionDetails>
    </Accordion>
  )
}
TipsAccordianMain.propTypes = {
  accord: {},
}
export default TipsAccordianMain
