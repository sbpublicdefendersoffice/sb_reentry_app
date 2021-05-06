import { probations } from '../constants/probation-data'
import Paper from '@material-ui/core/Paper'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import Accordion from '@material-ui/core/Accordion'
import AccordionSummary from '@material-ui/core/AccordionSummary'
import AccordionDetails from '@material-ui/core/AccordionDetails'
import Grid from '@material-ui/core/Grid'
import useLanguage from '../hooks/useLanguage'
import Typography from '@material-ui/core/Typography'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import { useStyles } from '../constants/materialStyles'
import ListItemText from '@material-ui/core/ListItemText'
import { ENGLISH } from '../constants/language'
const ProbationAccordian = () => {
  const { language } = useLanguage()
  const classes = useStyles()
  return (
    <>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography className={classes.heading}>
            {language === ENGLISH
              ? 'Report To Your Probation or Parole Officer'
              : 'Informe a su oficial de libertad condicional o bajo palabra'}
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Paper className={classes.paper}>
                {' '}
                <Typography>
                  {language === ENGLISH
                    ? 'When first releasing it is recommended to check in with your probation officer withing 24 hours, or as ordered by the Court, or as instructed by an officer. Please reach out to Probation or Parole in the resource below for any additional questions that you may have'
                    : 'Al ser liberado por primera vez, se recomienda que se registre con su oficial de libertad condicional dentro de las 24 horas, o según lo ordene el Tribunal, o según las instrucciones de un oficial. Comuníquese con Libertad condicional o Libertad bajo palabra en el recurso a continuación para cualquier pregunta adicional que pueda tener.'}
                </Typography>
              </Paper>
            </Grid>
            <Grid item xs={12}>
              <Paper className={classes.paper}>
                {' '}
                <Typography className={classes.heading}>
                  <h5>
                    {language === ENGLISH
                      ? 'Santa Barbara Probation Agency'
                      : 'Agencia de Libertad Condicional de Santa Bárbara'}
                  </h5>
                  <div
                    style={{
                      display: 'flex',
                      textAlign: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <p> {language === ENGLISH ? 'Website:' : 'Sitio web:'} </p>
                    <a href="www.sbprobation.org/"> www.sbprobation.org/</a>
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
                justifyContent: 'center',
              }}
            >
              {' Probation Report & Resource Center (PRRC)'}
            </h2>

            {probations.map((probation, key) => {
              return (
                <Grid item xs={6} key={key} sm={4}>
                  <Paper className={classes.paperCard}>
                    <List>
                      <ListItem
                        style={{ fontWeight: 'bold', fontSize: '1.5rem' }}
                      >
                        <ListItemText
                          style={{
                            textAlign: 'center',
                            justifyContent: 'center',
                          }}
                        >
                          {probation.name}
                        </ListItemText>
                      </ListItem>
                      <ListItem>
                        <ListItemText
                          style={{
                            textAlign: 'center',
                            justifyContent: 'center',
                          }}
                          primary={probation.phone}
                        />
                      </ListItem>
                      <ListItem>
                        <ListItemText
                          style={{
                            textAlign: 'center',
                            justifyContent: 'center',
                          }}
                        >
                          <div>{probation.address}</div>
                          <div>{probation.cityStateZip}</div>
                        </ListItemText>
                      </ListItem>
                    </List>
                  </Paper>
                </Grid>
              )
            })}

            <Grid item xs={12}>
              <Paper className={classes.paper}>
                <List>
                  <ListItem>
                    <ListItemText
                      style={{
                        textAlign: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      <div>
                        {language === ENGLISH
                          ? 'Division of Adult Parole Operations'
                          : 'División de Operaciones de Libertad Condicional para Adultos:'}{' '}
                      </div>
                      <div>
                        {'Website: '}
                        <a href="https://www.cdcr.ca.gov/parole/northern-region-directory/">
                          {language === ENGLISH
                            ? 'Northern County Directory'
                            : 'Directorio del norte del condado'}
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
