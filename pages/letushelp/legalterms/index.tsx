import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Grid,
} from '@mui/material'
import { ExpandMore } from '@mui/icons-material'
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
import useLanguage from '../../../hooks/useLanguage'
import { Title, Paragraph } from '../../../ui'
import { useStyles } from '../../../constants/materialStyles'
import { HeadTags } from '../../../components'

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
      <HeadTags
        title={`${siteTitle} | ${activeCopy.title}`}
        href="/letushelp/legalterms"
        description="A collection of legal terms you may hear"
      />
      <div
        style={{
          margin: '4rem 0 2rem 0',
          textAlign: 'center',
          padding: '2rem',
        }}
      >
        <Title style={{ marginBottom: '2rem' }}>{activeCopy.title} </Title>
        <Paragraph size="med-text">{activeCopy.description}</Paragraph>
      </div>
      <Grid container style={{ justifyContent: 'center' }} spacing={3}>
        {terms.map((term, key) => {
          const activeTerm = term[language]
          return (
            <Grid key={key} item xs={11}>
              <Accordion key={key}>
                <AccordionSummary
                  data-testid="accordion"
                  expandIcon={<ExpandMore />}
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
