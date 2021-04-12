import Typography from '@material-ui/core/Typography'
import Accordion from '@material-ui/core/Accordion'
import AccordionSummary from '@material-ui/core/AccordionSummary'
import AccordionDetails from '@material-ui/core/AccordionDetails'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import Grid from '@material-ui/core/Grid'
import { useRouter } from 'next/router'
import { useStyles } from '../constants/materialStyles'
import Button from '../ui/Button'
const Accordian = ({ accord }) => {
  const classes = useStyles()
  const { push } = useRouter()
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
                <Button
                  className={classes.aBlock}
                  onClick={() =>
                    push(`/search`, `/search?query=${accord.itemOneUrl}`)
                  }
                >
                  {accord.itemOne}
                </Button>
                <Button
                  className={classes.aBlock}
                  onClick={() =>
                    push(`/search`, `/search?query=${accord.itemTwoUrl}`)
                  }
                >
                  {accord.itemTwo}
                </Button>

                {accord && accord.itemThree ? (
                  <Button
                    className={classes.aBlock}
                    onClick={() =>
                      push(`/search`, `/search?query=${accord.itemThreeUrl}`)
                    }
                  >
                    {accord.itemThree}
                  </Button>
                ) : null}
                {accord && accord.itemFour ? (
                  <Button
                    className={classes.aBlock}
                    onClick={() =>
                      push('/search', `/search?query=${accord.itemFourUrl}`)
                    }
                  >
                    {accord.itemFour}
                  </Button>
                ) : null}
                {accord && accord.itemFive ? (
                  <Button
                    className={classes.aBlock}
                    onClick={() =>
                      push(`/search`, `/search?query=${accord.itemFiveUrl}`)
                    }
                  >
                    {accord.itemFive}
                  </Button>
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
