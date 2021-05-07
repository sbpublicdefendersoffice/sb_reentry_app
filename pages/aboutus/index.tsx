import Head from 'next/head'
import React from 'react'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import BusinessCenterIcon from '@material-ui/icons/BusinessCenter'
import VerifiedUserIcon from '@material-ui/icons/VerifiedUser'
import ForumIcon from '@material-ui/icons/Forum'
import { siteTitle } from '../../constants'
import { copy } from '../../constants/aboutus-data'
import useLanguage from '../../hooks/useLanguage'
import { useStyles } from '../../constants/materialStyles'

const AboutUs = () => {
  const classes = useStyles()
  const { language } = useLanguage()
  let activeCopy = copy[language]
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
            <VerifiedUserIcon className={classes.icons} />
            <h1> {activeCopy.provide}</h1>
          </Paper>
        </Grid>
        <Grid style={{ display: 'flex' }} item xs={12} sm={3}>
          <Paper className={classes.aboutPaperIconCards}>
            <BusinessCenterIcon className={classes.icons} />
            <h1> {activeCopy.support}</h1>
          </Paper>
        </Grid>

        <Grid style={{ display: 'flex' }} item xs={12} sm={3}>
          <Paper className={classes.aboutPaperIconCards}>
            <ForumIcon className={classes.icons} />
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
