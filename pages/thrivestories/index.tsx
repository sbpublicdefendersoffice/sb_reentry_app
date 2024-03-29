import { Card, CardContent, CardMedia, Typography, Grid } from '@mui/material'
import { SuccessStory } from '../../types/successStory'
import useLanguage from '../../hooks/useLanguage'
import {
  useStyles,
  siteTitle,
  successCopy,
  ArturoSuccessStory,
  LisaSuccessStory,
  MelissaSuccessStory,
  RyanRisingSuccessStory,
  JuanBranGudielSuccessStory,
  GilbertoAnthonyMurilloSuccessStory,
} from '../../constants/'
import { HeadTags } from '../../components'
const ThriveStories = () => {
  const { language } = useLanguage()
  const classes = useStyles()
  const successStories: SuccessStory[] = [
    ArturoSuccessStory,
    LisaSuccessStory,
    RyanRisingSuccessStory,
    MelissaSuccessStory,
    GilbertoAnthonyMurilloSuccessStory,
    JuanBranGudielSuccessStory,
  ]
  const activeCopy = successCopy[language]
  return (
    <>
      <HeadTags
        title={`${siteTitle} | ${activeCopy.title}`}
        href="/thrivestories"
        description="Thrive Stories: Inspiring stories from the justice-impacted"
      />
      <div className={classes.root} style={{ margin: '0 auto' }}>
        <Typography
          style={{ marginTop: '4rem' }}
          align="center"
          gutterBottom
          variant="h2"
          component="h2"
        >
          {activeCopy.title}{' '}
        </Typography>
        <Grid container style={{ justifyContent: 'center' }} spacing={3}>
          {successStories.map((successStory, key) => {
            const story = successStory[language]
            return (
              <Grid item key={key}>
                <Card className={classes.card}>
                  <CardMedia
                    className={classes.media}
                    image={story.profilePic}
                    title={story.alt}
                  />
                  <CardContent className={classes.cardContent}>
                    <Typography gutterBottom variant="h4" component="h4">
                      {story.name}
                    </Typography>
                    <Typography gutterBottom variant="h5" component="h2">
                      {story.role}
                    </Typography>
                    <Typography gutterBottom variant="h5" component="h2">
                      {story.organization}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="textSecondary"
                      component="h3"
                      style={{
                        fontSize: '1.6rem',
                        marginTop: '3rem',
                        color: 'black',
                        padding: 'var(--pad-lg)',
                      }}
                    >
                      {story.bio}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            )
          })}
          {}
        </Grid>
      </div>
    </>
  )
}
export default ThriveStories
