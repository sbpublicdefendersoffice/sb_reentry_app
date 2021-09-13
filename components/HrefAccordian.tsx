import {
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Grid,
} from '@material-ui/core/'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import { CopyHolder } from '../types/'
import {
  ImportantDocumentsAccord,
  JobAccord,
  FinanceAccord,
  useStyles,
} from '../constants/'
import { useLanguage } from '../hooks/'

const HrefAccordian = () => {
  const { language } = useLanguage()
  const classes = useStyles()
  const checklist: CopyHolder[] = [
    ImportantDocumentsAccord,
    JobAccord,
    FinanceAccord,
  ]
  return (
    <>
      {checklist.map((item, key) => {
        const activeCopy = item[language]
        return (
          <Accordion key={key} style={{ margin: '1rem' }}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel3a-content"
              data-testid="accordion"
              id="panel3a-header"
            >
              <Typography className={classes.heading}>
                {' '}
                {activeCopy.listItem}
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <Typography className={classes.accordDescription}>
                    {activeCopy.description}
                  </Typography>
                  <Typography>
                    <h4
                      style={{ marginBottom: '2rem' }}
                      className={classes.accordDescription}
                    >
                      {activeCopy.action}
                    </h4>
                  </Typography>
                  <Typography>
                    <div>
                      <a
                        target="_blank"
                        rel="noopener noreferrer"
                        className={classes.accordDescriptionLink}
                        href={activeCopy.href1}
                      >
                        <p>{activeCopy.item1}</p>
                      </a>
                      <a
                        style={{ display: 'block' }}
                        target="_blank"
                        className={classes.accordDescriptionLink}
                        rel="noopener noreferrer"
                        href={activeCopy.href2}
                      >
                        {activeCopy.item2}
                      </a>
                      {activeCopy.item3 && (
                        <a
                          style={{ display: 'block' }}
                          target="_blank"
                          className={classes.accordDescriptionLink}
                          rel="noopener noreferrer"
                          href={activeCopy.href3}
                        >
                          {activeCopy.item3}
                        </a>
                      )}
                      {activeCopy.item4 && (
                        <a
                          style={{ display: 'block' }}
                          className={classes.accordDescriptionLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          href={activeCopy.href4}
                        >
                          {activeCopy.item4}
                        </a>
                      )}
                      {activeCopy.item5 && (
                        <a
                          style={{ display: 'block' }}
                          className={classes.accordDescriptionLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          href={activeCopy.href5}
                        >
                          {activeCopy.item5}
                        </a>
                      )}
                      {activeCopy.disclaimer && (
                        <p
                          style={{ marginTop: '2rem' }}
                          className={classes.accordDescription}
                        >
                          {activeCopy.disclaimer}
                        </p>
                      )}
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
export default HrefAccordian
