import Head from 'next/head'
import { copy } from '../../../constants/prearraignment-data'
import { siteTitle } from '../../../constants/copy'
import Grid from '@material-ui/core/Grid'
import useLanguage from '../../../hooks/useLanguage'
import { Title, Paragraph } from '../../../ui'
import { useStyles } from '../../../constants/materialStyles'
const PreArraignmentPage = () => {
  const { language } = useLanguage()
  const classes = useStyles()
  const activeCopy = copy[language]
  return (
    <>
      <Head>
        <title>{`${siteTitle} | ${activeCopy.title}`}</title>
      </Head>
      <div style={{ margin: '6rem 0 2rem 0' }}>
        <Grid container spacing={3}>
          <Grid item xs={11} sm={2}>
            <img
              className={classes.arraignIcons}
              src={'/icons/prearraignment.svg'}
              alt="Pre-arraignment icon"
            />
          </Grid>
          <Grid item xs={11} sm={10}>
            <Title className={classes.arraignTextCenter}>
              {activeCopy.title}{' '}
            </Title>
            <h2 className={classes.arraignTextCenter}>{activeCopy.subtitle}</h2>
            <Paragraph className={classes.arraignP} size="med-text">
              {activeCopy.description}
            </Paragraph>
          </Grid>
          <hr
            style={{
              border: '0',
              clear: 'both',
              display: 'block',
              width: '100%',
              backgroundColor: '#12385e',
              height: '2px',
            }}
          />
          <Grid item xs={11} sm={3}>
            <img
              className={classes.arraignIcons}
              src={'/icons/phone.svg'}
              alt="Phone icon"
            />
          </Grid>
          <Grid item xs={11} sm={8}>
            <Paragraph className={classes.arraignP} size="med-text">
              <b>{activeCopy.gatherPersonalTitle}</b>
              {activeCopy.gatherPersonal}
            </Paragraph>
          </Grid>
          <Grid item xs={11} sm={3}>
            <img
              className={classes.arraignIcons}
              src={'/icons/documents.svg'}
              alt="Document Icon"
            />
          </Grid>
          <Grid item xs={11} sm={8}>
            <Paragraph className={classes.arraignP} size="med-text">
              <b>{activeCopy.gatherWitnessTitle}</b>
              {activeCopy.gatherWitness}
            </Paragraph>
          </Grid>
        </Grid>
      </div>
    </>
  )
}
export default PreArraignmentPage
