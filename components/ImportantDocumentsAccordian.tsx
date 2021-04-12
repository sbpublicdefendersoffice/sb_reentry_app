import Typography from '@material-ui/core/Typography'
import Accordion from '@material-ui/core/Accordion'
import AccordionSummary from '@material-ui/core/AccordionSummary'
import AccordionDetails from '@material-ui/core/AccordionDetails'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import Grid from '@material-ui/core/Grid'
import { useStyles } from '../constants/materialStyles'
import { importantAccordian } from '../constants/checklist-data'
import useLanguage from '../hooks/useLanguage'
const ImportantDocumentsAccordian = () => {
  const { language } = useLanguage()
  const activeImportantAccordianCopy = importantAccordian[language]
  const classes = useStyles()
  return (
    <Accordion>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel3a-content"
        id="panel3a-header"
      >
        <Typography className={classes.heading}>
          {' '}
          {activeImportantAccordianCopy.title}
        </Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Typography className={classes.fontSize}>
              {activeImportantAccordianCopy.description}
            </Typography>
            <Typography>
              <h4 className={classes.h4Style}>
                {activeImportantAccordianCopy.actionClick}
              </h4>
            </Typography>
            <Typography>
              <div>
                <a
                  className={classes.aBlock}
                  href={activeImportantAccordianCopy.itemOneUrl}
                >
                  {activeImportantAccordianCopy.itemOne}
                </a>
                <a
                  className={classes.aBlock}
                  href={activeImportantAccordianCopy.itemTwoUrl}
                >
                  {activeImportantAccordianCopy.itemTwo}
                </a>
                <a
                  className={classes.aBlock}
                  href={activeImportantAccordianCopy.itemThreeUrl}
                >
                  {activeImportantAccordianCopy.itemThree}
                </a>
                <a
                  className={classes.aBlock}
                  href={activeImportantAccordianCopy.itemFourUrl}
                >
                  {activeImportantAccordianCopy.itemFour}
                </a>
                <p className={classes.fontSize}>
                  {activeImportantAccordianCopy.disclaimer}
                </p>
              </div>
            </Typography>
          </Grid>
        </Grid>
      </AccordionDetails>
    </Accordion>
  )
}

export default ImportantDocumentsAccordian
