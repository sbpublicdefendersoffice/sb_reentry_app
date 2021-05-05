import Head from 'next/head'
import Accordion from '@material-ui/core/Accordion'
import AccordionSummary from '@material-ui/core/AccordionSummary'
import AccordionDetails from '@material-ui/core/AccordionDetails'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import Typography from '@material-ui/core/Typography'
import { LegalTerms, legaltermsCopy } from '../../../types/legalterms'
import {
  AppellateCourts,
  BurdenOfProof,
  CapitalOffense,
  Discovery,
  DoubleJeopardy,
  ExclusionaryRule,
  Felony,
  FifthAmendment,
  HungJury,
  Infraction,
  Judge,
  Justice,
  Magistrate,
  MirandaRights,
  PresumptionOfInnocence,
  ReasonableDoubt,
  Strikes,
  Subpoena,
  TrialCourts,
  Wobbler,
  Wobblette,
} from '../../../constants/legalterms-data'
import { siteTitle } from '../../../constants/copy'
import Grid from '@material-ui/core/Grid'
import useLanguage from '../../../hooks/useLanguage'
import { useStyles } from '../../../constants/materialStyles'
const LegalTermsPage = () => {
  const { language } = useLanguage()
  const classes = useStyles()
  const terms: LegalTerms[] = [
    AppellateCourts,
    BurdenOfProof,
    CapitalOffense,
    Discovery,
    DoubleJeopardy,
    ExclusionaryRule,
    Felony,
    FifthAmendment,
    HungJury,
    Infraction,
    Judge,
    Justice,
    Magistrate,
    MirandaRights,
    PresumptionOfInnocence,
    ReasonableDoubt,
    Strikes,
    Subpoena,
    TrialCourts,
    Wobbler,
    Wobblette,
  ]
  const activeCopy = legaltermsCopy[language]
  return (
    <>
      <Head>
        <title>{`${siteTitle} | ${activeCopy.title}`}</title>
      </Head>
      <Typography
        style={{ marginTop: '4rem' }}
        align="center"
        gutterBottom
        variant="h1"
        component="h1"
      >
        {activeCopy.title}{' '}
      </Typography>
      <Typography
        style={{ marginTop: '2rem', marginBottom: '2rem' }}
        align="center"
        gutterBottom
        variant="h4"
        component="h4"
      >
        {activeCopy.description}
      </Typography>
      <Grid container style={{ justifyContent: 'center' }} spacing={3}>
        {terms.map((term, key) => {
          const activeTerm = term[language]
          return (
            <Grid key={key} item xs={11}>
              <Accordion key={key}>
                <AccordionSummary
                  data-testid="accordion"
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel3a-content"
                  id="panel3a-header"
                >
                  <Typography className={classes.heading}>
                    {' '}
                    {activeTerm.title}
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography className={classes.accordDescription}>
                    {activeTerm.description}
                  </Typography>
                </AccordionDetails>
              </Accordion>
            </Grid>
          )
        })}
        {}
      </Grid>
    </>
  )
}
export default LegalTermsPage
