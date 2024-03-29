import {
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Grid,
} from '@mui/material'
import { ExpandMore } from '@mui/icons-material'
import { CopyHolder } from '../types/'
import { TipsAccord } from '../constants/checklist-data'
import useLanguage from '../hooks/useLanguage'
import { useStyles } from '../constants/materialStyles'
const TipsAccordian = () => {
  const { language } = useLanguage()
  const classes = useStyles()
  const checklist: CopyHolder[] = [TipsAccord]
  return (
    <>
      {checklist.map((item, key) => {
        const activeCopy = item[language]
        return (
          <Accordion key={key} style={{ margin: '1rem' }}>
            <AccordionSummary
              expandIcon={<ExpandMore />}
              aria-controls="panel3a-content"
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
                      className={classes.accordDescription}
                      style={{ marginBottom: '2rem' }}
                    >
                      {activeCopy.action}
                    </h4>
                  </Typography>
                  <Typography>
                    <ul className={classes.ulist}>
                      <li className={classes.listItem}>{activeCopy.item1}</li>
                      <li className={classes.listItem}>{activeCopy.item2}</li>
                      {activeCopy.item3 && (
                        <li className={classes.listItem}>{activeCopy.item3}</li>
                      )}
                      {activeCopy.item4 && (
                        <li className={classes.listItem}>{activeCopy.item4}</li>
                      )}
                      {activeCopy.item5 && (
                        <li className={classes.listItem}>{activeCopy.item5}</li>
                      )}
                    </ul>
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
export default TipsAccordian
