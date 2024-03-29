import { CSSProperties } from 'react'
import { copy } from '../../../constants/prearraignment-data'
import { siteTitle } from '../../../constants/copy'
import { Grid } from '@mui/material'
import useLanguage from '../../../hooks/useLanguage'
import { Title, Paragraph } from '../../../ui'
import { useStyles } from '../../../constants/materialStyles'
import { HeadTags } from '../../../components'

const cntr: CSSProperties = { display: 'flex', justifyContent: 'center' }

const PreArraignmentPage = () => {
  const { language } = useLanguage()
  const classes = useStyles()
  const activeCopy = copy[language]
  return (
    <>
      <HeadTags
        title={`${siteTitle} | ${activeCopy.title}`}
        href="/letushelp/prearraignment"
        description="Our collection of resources concering Pre-Arraignment"
      />
      <div style={{ margin: '3rem 0 2rem 0' }}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={2} style={cntr}>
            <img src={'/icons/prearraignment.svg'} alt="Pre-arraignment icon" />
          </Grid>
          <Grid item xs={12} sm={10}>
            <Title className={classes.arraignTextCenter}>
              {activeCopy.title}{' '}
            </Title>
            <h2 className={classes.arraignTextCenter}>{activeCopy.subtitle}</h2>
            <Paragraph className={classes.arraignPP} size="med-text">
              {activeCopy.description}
            </Paragraph>
          </Grid>
          <hr
            style={{
              border: '0',
              clear: 'both',
              display: 'block',
              width: '100%',
              marginBottom: '3rem',
              backgroundColor: '#12385e',
              height: '2px',
            }}
          />
          <Grid item xs={12} sm={3} style={cntr}>
            <img src={'/icons/phone.svg'} alt="Phone icon" />
          </Grid>
          <Grid item xs={12} sm={8}>
            <h2 className={classes.arraignTextCenter}>
              {activeCopy.gatherPersonalTitle}
            </h2>
            <Paragraph className={classes.arraignP} size="med-text">
              {activeCopy.gatherPersonal}
            </Paragraph>
          </Grid>
          <Grid item xs={12} sm={3} style={cntr}>
            <img src={'/icons/documents.svg'} alt="Document Icon" />
          </Grid>
          <Grid item xs={12} sm={8}>
            <h2 className={classes.arraignTextCenter}>
              {activeCopy.gatherWitnessTitle}
            </h2>
            <Paragraph className={classes.arraignP} size="med-text">
              {activeCopy.gatherWitness}
            </Paragraph>
          </Grid>
        </Grid>
      </div>
    </>
  )
}
export default PreArraignmentPage
