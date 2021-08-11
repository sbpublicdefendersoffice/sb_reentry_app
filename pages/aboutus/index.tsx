import Head from 'next/head'
import { Paper, Typography, Grid } from '@material-ui/core/'
import { BusinessCenter, VerifiedUser, Forum } from '@material-ui/icons/'
import useLanguage from '../../hooks/useLanguage'
import { useStyles, siteTitle, aboutCopy } from '../../constants/'

const AboutUs = () => {
  const classes = useStyles()
  const { language } = useLanguage()
  let activeCopy = aboutCopy[language]
  return (
    <>
      <Head>
        <title>{`${siteTitle} | ${activeCopy.title}`}</title>
      </Head>
      <Typography
        align="center"
        style={{ marginTop: '3rem' }}
        gutterBottom
        variant="h2"
        component="h1"
      >
        {activeCopy.title}
      </Typography>
      ``
      <Grid
        container
        style={{ marginTop: '10rem' }}
        justify="center"
        spacing={4}
      >
        <Grid style={{ display: 'flex' }} item xs={12} sm={3}>
          <Paper className={classes.aboutPaperIconCards}>
            <VerifiedUser className={classes.icons} />
            <h1> {activeCopy.provide}</h1>
          </Paper>
        </Grid>
        <Grid style={{ display: 'flex' }} item xs={12} sm={3}>
          <Paper className={classes.aboutPaperIconCards}>
            <BusinessCenter className={classes.icons} />
            <h1> {activeCopy.support}</h1>
          </Paper>
        </Grid>

        <Grid style={{ display: 'flex' }} item xs={12} sm={3}>
          <Paper className={classes.aboutPaperIconCards}>
            <Forum className={classes.icons} />
            <h1>{activeCopy.community}</h1>
          </Paper>
        </Grid>
        <Grid item>
          <Paper className={classes.aboutPaper}>
            <div>
              <h1> {activeCopy.howWeDid}</h1>
              <h2 style={{ marginTop: '1rem', marginBottom: '2rem' }}>
                {activeCopy.ourProcess}
              </h2>
              <p className={classes.aboutP}>
                {activeCopy.partnered}
                <br />
                <br />
                {activeCopy.building}
              </p>
            </div>
          </Paper>
        </Grid>
      </Grid>
    </>
  )
}
export default AboutUs
