import {
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Grid,
} from '@material-ui/core/'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'

import { PictureWithOval, LetUsHelpHeading, HeadTags } from '../../components'
import { Title, Paragraph } from '../../ui'
import { CopyHolder } from '../../types/language'
import useLanguage from '../../hooks/useLanguage'
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
  volunteer,
  edits,
  feedback,
  flexFullWidth,
  resumeTemplate,
  siteTitle,
  alcoholAndDrugClass,
  duiPrograms,
  sr22,
  clearMyRecord,
} from '../../constants/'

const FaqPage = () => {
  const { language } = useLanguage()
  const classes = useStyles()

  const faqs: CopyHolder[] = [
    clearMyRecord,
    resumeTemplate,
    whereToStart,
    covid,
    probation,
    transferProbation,
    volunteer,
    treatment,
    refill,
    alcoholAndDrugClass,
    duiPrograms,
    sr22,
    documents,
    edits,
    feedback,
  ]
  const activeCopyFAQ = faqCopy[language]
  return (
    <>
      <HeadTags
        title={`${siteTitle} | FAQ`}
        href="/faq"
        description="Frequently Asked Questions about ThriveSBC"
      />
      <div className={classes.root}>
        <div style={flexFullWidth}>
          <PictureWithOval color="highlight" pic="faqPic.jpg" />
          <LetUsHelpHeading>
            <Title style={{ margin: '2rem 3rem', fontFamily: 'sans-serif' }}>
              {activeCopyFAQ.title}
            </Title>
            <Paragraph size="med-text">{activeCopyFAQ.description}</Paragraph>
          </LetUsHelpHeading>
        </div>
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
                          <span style={{ display: 'inline !important' }}>
                            <p
                              className={classes.accordDescription}
                              style={{
                                wordBreak: 'break-word',
                                display: 'inline',
                              }}
                            >
                              {' '}
                              {activeCopy.description}
                              <a
                                target="_blank"
                                rel="noopener noreferrer"
                                href={activeCopy.href1}
                                style={{}}
                              >
                                {activeCopyFAQ.clickHere}
                              </a>
                            </p>
                          </span>
                        )}
                        {activeCopy && activeCopy.nextLink && (
                          <p
                            className={classes.accordDescription}
                            style={{
                              marginTop: '1.5rem',
                              display: 'inline-block',
                              wordBreak: 'break-word',
                            }}
                          >
                            {' '}
                            {activeCopy.description}
                            <a href={activeCopy.nextLink}>
                              <p>{activeCopyFAQ.clickHere}</p>
                            </a>
                          </p>
                        )}
                        {activeCopy && activeCopy.nextLinkTwo && (
                          <p className={classes.accordDescription}>
                            {activeCopy.description2}
                            <a href={activeCopy.nextLinkTwo}>
                              <p>{activeCopyFAQ.clickHere}</p>
                            </a>
                          </p>
                        )}
                        {activeCopy &&
                          !activeCopy.href1 &&
                          !activeCopy.nextLink &&
                          !activeCopy.nextLinkTwo && (
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
    </>
  )
}
export default FaqPage
