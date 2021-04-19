import Head from 'next/head'
import React from 'react'
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import BusinessCenterIcon from '@material-ui/icons/BusinessCenter'
import VerifiedUserIcon from '@material-ui/icons/VerifiedUser'
import ForumIcon from '@material-ui/icons/Forum'
import { ENGLISH, siteTitle } from '../../constants'

import useLanguage from '../../hooks/useLanguage'
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 3,
    },
    paper: {
      padding: theme.spacing(2),
      textAlign: 'center',
      width: 'auto',
      display: 'flex',
      color: theme.palette.text.secondary,
    },
    paperIconCards: {
      padding: theme.spacing(2),
      textAlign: 'center',
      width: '30rem',
      minWidth: '11rem',
      color: theme.palette.text.secondary,
      overflow: 'hidden',
    },
    icons: {
      color: '#13395e',
      margin: 'auto',
      fontSize: '8rem',
    },
    '@media (max-width: 500px)': {
      root: {
        flexGrow: 3,
      },
      paper: {
        textAlign: 'center',
        width: '30rem',
        display: 'flex',
        color: theme.palette.text.secondary,
      },
      paperIconCards: {
        width: '100%',
      },
    },
  }),
)
const AboutUs = () => {
  const classes = useStyles()
  const { language } = useLanguage()
  return (
    <>
      <Head>
        <title>
          {language === ENGLISH
            ? `${siteTitle} | About Us`
            : `${siteTitle} | Sobre nosotros`}
        </title>
      </Head>
      <Typography
        align="center"
        style={{ marginTop: '3rem' }}
        gutterBottom
        variant="h2"
        component="h1"
      >
        {language === ENGLISH ? 'About Us' : 'Sobre nosotros'}
      </Typography>
      <Grid
        container
        style={{ marginTop: '10rem' }}
        justify="center"
        spacing={4}
      >
        <Grid style={{ display: 'flex' }} item xs={12} sm={3}>
          <Paper className={classes.paperIconCards}>
            <VerifiedUserIcon className={classes.icons} />
            <h1>
              {' '}
              {language === ENGLISH
                ? 'Provide Accurate Information'
                : 'Proporcione información precisa'}
            </h1>
          </Paper>
        </Grid>
        <Grid style={{ display: 'flex' }} item xs={12} sm={3}>
          <Paper className={classes.paperIconCards}>
            <BusinessCenterIcon className={classes.icons} />
            <h1> {language === ENGLISH ? 'Support' : 'Apoyo'}</h1>
          </Paper>
        </Grid>

        <Grid style={{ display: 'flex' }} item xs={12} sm={3}>
          <Paper className={classes.paperIconCards}>
            <ForumIcon className={classes.icons} />
            <h1>
              {language === ENGLISH
                ? 'Community Outreach'
                : 'Alcance comunitario'}
            </h1>
          </Paper>
        </Grid>
        <Grid item>
          <Paper className={classes.paper}>
            <div>
              <h1>
                {' '}
                {language === ENGLISH ? 'How We did this' : 'Como lo hicimos'}
              </h1>
              <h2 style={{ marginTop: '1rem', marginBottom: '2rem' }}>
                {language === ENGLISH
                  ? 'Our Process at Code for America'
                  : 'Nuestro proceso en Code for America'}
              </h2>
              <p
                style={{
                  width: '60%',
                  lineHeight: '1.55rem',
                  margin: 'auto',
                  marginTop: '2rem',
                }}
              >
                {language === ENGLISH
                  ? ` Code for America parntered with the Santa Barbara County Public
Defender's office to develop a re-entry application for
indivuals who will be returning to Santa Barbara after
incarceration. Jeanmarie Levy, Timothy Malstead and Victor
Sauceda were assigned to developing this application in October
2020.`
                  : 'Code for America colaboró con la oficina del Defensor Público del Condado de Santa Bárbara para desarrollar una solicitud de reingreso para las personas que regresarán a Santa Bárbara después del encarcelamiento. Jeanmarie Levy, Timothy Malstead y Victor Sauceda fueron asignados a desarrollar esta aplicación en octubre de 2020'}
                <br />
                <br />
                {language === ENGLISH
                  ? `Building this application with a human-centered design is what allowed them to better understand the needs of the justice
impacted. After many interviews with justice impacted individuals and community based organizations they noticed a need for a centralized location of resource. After validating over 1000 resources available across the platfrom to ensure accuracy they hope that you are able to benefit from the use of this resource application. Good luck in your re-entry process. Santa Barbara County is rooting for you!!!`
                  : `Construir esta aplicación con un diseño centrado en el ser humano es lo que les permitió comprender mejor las necesidades de la justicia.
impactado. Después de muchas entrevistas con personas y organizaciones comunitarias impactadas por la justicia, notaron la necesidad de una ubicación centralizada de recursos. Después de validar más de 1000 recursos disponibles en la plataforma para garantizar la precisión, esperan que pueda beneficiarse del uso de esta aplicación de recursos. Buena suerte en tu proceso de reingreso. ¡El condado de Santa Bárbara te apoya!`}
              </p>
            </div>
          </Paper>
        </Grid>
      </Grid>
    </>
  )
}
export default AboutUs
