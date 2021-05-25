import Head from 'next/head'
import {
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Grid,
} from '@material-ui/core/'
import { CopyHolder } from '../../types/language'
import useLanguage from '../../hooks/useLanguage'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import {
  faqCopy,
  whereToStart,
  probation,
  transferProbation,
  treatment,
  refill,
  covid,
  documents,
  useStyles,
  siteTitle,
  volunteer,
} from '../../constants/'
const FaqPage = () => {
  const { language } = useLanguage()
  const classes = useStyles()
  const faqs: CopyHolder[] = [
    whereToStart,
    probation,
    transferProbation,
    volunteer,
    treatment,
    refill,
    covid,
    documents,
  ]
  const activeCopy = faqCopy[language]
  return (
    <div className={classes.root}>
      <Head>
        <title>{`${siteTitle} | ${activeCopy.title}`}</title>
      </Head>
      <Typography
        style={{ marginTop: '3rem' }}
        align="center"
        variant="h2"
        component="h2"
      >
        {activeCopy.title}
      </Typography>
      <Typography
        style={{
          marginTop: '2rem',
          marginBottom: '2rem',
          padding: '2rem',
          textAlign: 'justify',
        }}
        align="center"
        variant="h4"
        component="h4"
      >
        {activeCopy.description}
      </Typography>
      <div>
        {' '}
        {faqs.map((item, key) => {
          const activeCopy = item[language]
          return (
            <Accordion key={key} style={{ margin: '1rem' }}>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel3a-content"
                data-testid="accordion"
                id="panel3a-header"
              >
                <Typography>
                  {' '}
                  <p className={classes.heading}>{activeCopy.listItem}</p>
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Grid container spacing={3}>
                  <Grid item xs={12}>
                    <Typography>
                      {activeCopy && activeCopy.href1 && (
                        <a
                          target="_blank"
                          rel="noopener noreferrer"
                          href={activeCopy.href1}
                          className={classes.accordDescriptionLink}
                        >
                          <p className={classes.accordDescription}>
                            {' '}
                            {activeCopy.description}
                          </p>
                        </a>
                      )}
                      {activeCopy && activeCopy.href2 && (
                        <a
                          target="_blank"
                          rel="noopener noreferrer"
                          href={activeCopy.href2}
                          className={classes.accordDescriptionLink}
                        >
                          <p
                            className={classes.accordDescription}
                            style={{ marginTop: '1.5rem' }}
                          >
                            {' '}
                            {activeCopy.description2}
                          </p>
                        </a>
                      )}

                      {activeCopy && !activeCopy.href1 && !activeCopy.href2 && (
                        <p className={classes.accordDescription}>
                          {activeCopy.description}
                        </p>
                      )}
                    </Typography>
                  </Grid>
                </Grid>
              </AccordionDetails>
            </Accordion>
          )
        })}
      </div>
    </div>
  )
}
export default FaqPage
