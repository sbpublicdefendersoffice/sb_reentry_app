import Typography from '@material-ui/core/Typography'
import Accordion from '@material-ui/core/Accordion'
import AccordionSummary from '@material-ui/core/AccordionSummary'
import AccordionDetails from '@material-ui/core/AccordionDetails'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import Grid from '@material-ui/core/Grid'
import { useStyles } from '../constants/materialStyles'
import { importantAccordian, jobAccordian } from '../constants/checklist-data'
import { Accordian } from '../types/accordian'
import useLanguage from '../hooks/useLanguage'
const linksData: Accordian[] = [importantAccordian, jobAccordian]
const LinksAccordian = () => {
  const { language } = useLanguage()
  const classes = useStyles()
  return (
    <>
      {linksData.map((link, key) => {
        const activeLink = link[language]
        return (
          <Accordion key={key}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel3a-content"
              id="panel3a-header"
            >
              <Typography className={classes.heading}>
                {' '}
                {activeLink.title}
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <Typography className={classes.fontSize}>
                    {activeLink.description}
                  </Typography>
                  <Typography>
                    <h4 className={classes.h4Style}>
                      {activeLink.actionClick}
                    </h4>
                  </Typography>
                  <Typography>
                    <div>
                      <a
                        className={classes.aBlock}
                        href={activeLink.itemOneUrl}
                      >
                        {activeLink.itemOne}
                      </a>
                      <a
                        className={classes.aBlock}
                        href={activeLink.itemTwoUrl}
                      >
                        {activeLink.itemTwo}
                      </a>
                      <a
                        className={classes.aBlock}
                        href={activeLink.itemThreeUrl}
                      >
                        {activeLink.itemThree}
                      </a>
                      <a
                        className={classes.aBlock}
                        href={activeLink.itemFourUrl}
                      >
                        {activeLink.itemFour}
                      </a>
                      <p className={classes.fontSize}>
                        {activeLink.disclaimer}
                      </p>
                    </div>
                  </Typography>
                </Grid>
              </Grid>
            </AccordionDetails>
          </Accordion>
        )
      })}
    </>
  )
}
export default LinksAccordian
