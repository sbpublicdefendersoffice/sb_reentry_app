import NextLink from 'next/link'
import {
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Grid,
} from '@material-ui/core/'
import { PictureWithOval, LetUsHelpHeading } from '../../components'
import { Title, Paragraph } from '../../ui'
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
  volunteer,
  edits,
  feedback,
  flexFullWidth,
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
    edits,
    feedback,
  ]
  const activeCopyFAQ = faqCopy[language]
  return (
    <div className={classes.root}>
      <div style={flexFullWidth}>
        <PictureWithOval color="highlight" pic="faqPic.jpeg" />
        <LetUsHelpHeading>
          <Title>{activeCopyFAQ.title}</Title>
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
                        <p className={classes.accordDescription}>
                          {' '}
                          {activeCopy.description}
                          <a
                            target="_blank"
                            rel="noopener noreferrer"
                            href={activeCopy.href1}
                          >
                            {activeCopyFAQ.clickHere}
                          </a>
                        </p>
                      )}
                      {activeCopy && activeCopy.nextLink && (
                        <p
                          className={classes.accordDescription}
                          style={{
                            marginTop: '1.5rem',
                            display: 'inline-block',
                          }}
                        >
                          {' '}
                          {activeCopy.description}
                          <NextLink href={activeCopy.nextLink}>
                            {activeCopyFAQ.clickHere}
                          </NextLink>
                        </p>
                      )}
                      {activeCopy && activeCopy.nextLinkTwo && (
                        <p
                          className={classes.accordDescription}
                          style={{
                            display: 'inline-block',
                          }}
                        >
                          {activeCopy.description2}
                          <NextLink href={activeCopy.nextLinkTwo}>
                            {activeCopyFAQ.clickHere}
                          </NextLink>
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
  )
}
export default FaqPage
