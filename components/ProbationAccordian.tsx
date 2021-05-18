import { probations } from '../constants/probation-data'
import {
  Paper,
  List,
  ListItem,
  Accordion,
  ListItemText,
  AccordionSummary,
  AccordionDetails,
  Grid,
  Typography,
} from '@material-ui/core/'
import useLanguage from '../hooks/useLanguage'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import { useStyles } from '../constants/materialStyles'
import { ProbationAccord } from '../constants/checklist-data'
const ProbationAccordian = () => {
  const { language } = useLanguage()
  const classes = useStyles()
  const activeCopy = ProbationAccord[language]
  return (
    <>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel3a-content"
          id="panel3a-header"
        >
          <Typography className={classes.heading}>
            {activeCopy.listItem}
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Paper>
                {' '}
                <Typography
                  style={{ padding: '2rem' }}
                  className={classes.accordDescription}
                >
                  {activeCopy.description}
                </Typography>
              </Paper>
            </Grid>
            <Grid item xs={12}>
              <Paper>
                {' '}
                <Typography
                  style={{ padding: '2rem' }}
                  className={classes.centerFlex}
                >
                  <h5>{activeCopy.action}</h5>
                  <div
                    style={{
                      display: 'flex',
                      textAlign: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <p className={classes.centerFlex}> {activeCopy.item1} </p>
                    <a
                      href={activeCopy.href1}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {' '}
                      www.sbprobation.org
                    </a>
                  </div>
                </Typography>
              </Paper>
            </Grid>
            <h2
              style={{
                marginBottom: '2rem',
                marginTop: '2rem',
                width: '100%',
                textAlign: 'center',
                fontSize: '1.6rem',
                justifyContent: 'center',
              }}
            >
              {' Probation Report & Resource Center (PRRC)'}
            </h2>

            {probations.map((probation, key) => {
              return (
                <Grid item xs={6} key={key} sm={4}>
                  <Paper>
                    <List className={classes.centerFlex}>
                      <ListItem>
                        <ListItemText>
                          <div className={classes.centerFlex}>
                            {probation.name}
                          </div>
                        </ListItemText>
                      </ListItem>
                      <ListItem>
                        <ListItemText>
                          {' '}
                          <div className={classes.centerFlex}>
                            {' '}
                            <a role="link" href={probation.phoneRef}>
                              <p role="link_paragraph"> {probation.phone}</p>
                            </a>
                          </div>
                        </ListItemText>
                      </ListItem>
                      <ListItem>
                        <ListItemText>
                          <a
                            role="link"
                            href={probation.gMapLink}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <p
                              role="link_paragraph"
                              className={classes.centerFlex}
                            >
                              {probation.address}
                            </p>
                            <p
                              role="link_paragraph"
                              className={classes.centerFlex}
                            >
                              {probation.cityStateZip}
                            </p>
                          </a>
                        </ListItemText>
                      </ListItem>
                    </List>
                  </Paper>
                </Grid>
              )
            })}

            <Grid item xs={12}>
              <Paper>
                <List>
                  <ListItem>
                    <ListItemText style={{ padding: '2rem' }}>
                      <div className={classes.centerFlex}>
                        {activeCopy.item2}{' '}
                      </div>
                      <div className={classes.centerFlex}>
                        {activeCopy.item1}
                        <a
                          className={classes.centerFlex}
                          href={activeCopy.href3}
                          style={{ borderBottom: 'none' }}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {activeCopy.item3}
                        </a>
                      </div>
                    </ListItemText>
                  </ListItem>
                </List>
              </Paper>
            </Grid>
          </Grid>
        </AccordionDetails>
      </Accordion>
    </>
  )
}
export default ProbationAccordian
