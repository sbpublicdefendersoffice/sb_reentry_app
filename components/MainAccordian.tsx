import Typography from '@material-ui/core/Typography'
import Accordion from '@material-ui/core/Accordion'
import AccordionSummary from '@material-ui/core/AccordionSummary'
import AccordionDetails from '@material-ui/core/AccordionDetails'
import Grid from '@material-ui/core/Grid'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import { Checklist } from '../types/checklist'
import { useRouter } from 'next/router'
import {
  FoodAccord,
  MedicalAccord,
  SobrietyAccord,
  MentalAccord,
} from '../constants/checklist-data'
import { useLanguage, useGlobalSearch } from '../hooks/'
import { useStyles } from '../constants/materialStyles'
const MainAccordian = () => {
  const { language } = useLanguage()
  const classes = useStyles()
  const { push } = useRouter()
  const { setSearchResults } = useGlobalSearch()
  const checklist: Checklist[] = [
    FoodAccord,
    MedicalAccord,
    SobrietyAccord,
    MentalAccord,
  ]
  const pushToSearch = e => {
    const { title } = e.target
    if (title) {
      setSearchResults(null)
      push('/search', `search?query=${title}`)
    }
  }
  return (
    <>
      {checklist.map((item, key) => {
        const activeCopy = item[language]
        return (
          <Accordion key={key}>
            <AccordionSummary
              data-testid="accordion"
              expandIcon={<ExpandMoreIcon />}
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
                      style={{ marginBottom: '2rem' }}
                      className={classes.accordDescription}
                    >
                      {activeCopy.action}
                    </h4>
                  </Typography>
                  <Typography>
                    <div>
                      <a
                        title={activeCopy.href1}
                        tabIndex={0}
                        style={{ display: 'block' }}
                        onClick={pushToSearch}
                        className={classes.heading}
                      >
                        {activeCopy.item1}
                      </a>
                      <a
                        title={activeCopy.href2}
                        tabIndex={0}
                        style={{ display: 'block' }}
                        className={classes.heading}
                        onClick={pushToSearch}
                      >
                        {activeCopy.item2}
                      </a>
                      {activeCopy.item3 && (
                        <a
                          title={activeCopy.href3}
                          tabIndex={0}
                          style={{ display: 'block' }}
                          className={classes.heading}
                          onClick={pushToSearch}
                        >
                          {activeCopy.item3}
                        </a>
                      )}
                      {activeCopy.item4 && (
                        <a
                          tabIndex={0}
                          title={activeCopy.href4}
                          style={{ display: 'block' }}
                          className={classes.heading}
                          onClick={pushToSearch}
                        >
                          {activeCopy.item4}
                        </a>
                      )}
                      {activeCopy.item5 && (
                        <a
                          tabIndex={0}
                          title={activeCopy.href5}
                          style={{ display: 'block' }}
                          className={classes.heading}
                          onClick={pushToSearch}
                        >
                          {activeCopy.item5}
                        </a>
                      )}
                      {activeCopy.pantry && (
                        <a
                          tabIndex={0}
                          data-testid="test-link"
                          title={activeCopy.pantry}
                          style={{ display: 'block' }}
                          className={classes.heading}
                          onClick={pushToSearch}
                        >
                          {activeCopy.pantry}
                        </a>
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
export default MainAccordian
