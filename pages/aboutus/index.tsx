import { Paper, Typography, Grid } from '@mui/material'
import { BusinessCenter, VerifiedUser, Forum } from '@mui/icons-material'
import useLanguage from '../../hooks/useLanguage'
import { useStyles, siteTitle, aboutCopy } from '../../constants/'
import { HeadTags } from '../../components'

const AboutUs = () => {
  const classes = useStyles()
  const { language } = useLanguage()
  let activeCopy = aboutCopy[language]
  return (
    <>
      <HeadTags
        title={`${siteTitle} | ${activeCopy.title}`}
        href="/aboutus"
        description="Learn all about the organizations and people that made ThriveSBC"
      />
      <Grid
        container
        style={{
          marginTop: '2rem',
          justifyContent: 'center',
          whiteSpace: 'pre-line',
        }}
        spacing={4}
      >
        <Grid item>
          <Typography
            align="center"
            style={{ margin: 'auto', justifyContent: 'center' }}
            gutterBottom
            variant="h2"
            component="h1"
          >
            {activeCopy.title}
          </Typography>
        </Grid>
        <Grid item>
          <Paper className={classes.aboutPaper}>
            <div>
              <p className={classes.aboutP}>{activeCopy.appPurpose}</p>
            </div>
          </Paper>
        </Grid>
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
