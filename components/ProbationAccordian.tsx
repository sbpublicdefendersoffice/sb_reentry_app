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
import { useStyles, probationsCopy, ProbationAccord } from '../constants/'

const ProbationAccordian = () => {
  const { language } = useLanguage()
  const classes = useStyles()
  const activeCopy = ProbationAccord[language]
  return (
    <>
      <Accordion style={{ margin: '1rem' }}>
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
                  <h5 style={{ fontSize: '1.6rem' }}>{activeCopy.action}</h5>
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
                      className={classes.accordDescriptionLink}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {' '}
                      <p className={classes.centerFlex}>www.sbprobation.org</p>
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

            {probationsCopy.map((probation, key) => {
              return (
                <Grid item xs={6} key={key} sm={4}>
                  <Paper style={{ minHeight: '18rem' }}>
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
                            <a
                              className={classes.accordDescriptionLink}
                              role="link"
                              href={probation.phoneRef}
                            >
                              <p
                                className={classes.centerFlex}
                                role="link_paragraph"
                              >
                                {' '}
                                {probation.phone}
                              </p>
                            </a>
                          </div>
                        </ListItemText>
                      </ListItem>
                      <ListItem>
                        <ListItemText>
                          <a
                            role="link"
                            className={classes.accordDescriptionLink}
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
                          className={classes.accordDescriptionLink}
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
