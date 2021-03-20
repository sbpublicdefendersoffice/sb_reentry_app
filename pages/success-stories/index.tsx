import Head from 'next/head'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import Typography from '@material-ui/core/Typography'
import { SuccessStory } from '../../types/successStory'
import {
  copy,
  ArturoSuccessStory,
  LisaSuccessStory,
} from '../../constants/successStory-data'
import Grid from '@material-ui/core/Grid'
import useLanguage from '../../hooks/useLanguage'
import { useStyles } from '../../constants/materialStyles'
const SuccessStories = () => {
  const { language } = useLanguage()
  const classes = useStyles()
  const successStories: SuccessStory[] = [ArturoSuccessStory, LisaSuccessStory]
  const activeCopy = copy[language]
  return (
    <>
      <Head>
        <title>{`Santa Barbara Reentry | ${activeCopy.title}`}</title>
      </Head>
      <Typography
        style={{ marginTop: '2rem' }}
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
            <Grid item xs={12} sm={2} key={key}>
              <Card className={classes.root}>
                <CardMedia
                  className={classes.media}
                  image={story.profilePic}
                  title={story.alt}
                />
                <CardContent className={classes.cardContent}>
                  <Typography gutterBottom variant="h5" component="h2">
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
                    style={{ fontSize: '1.6rem', marginTop: '3rem' }}
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
    </>
  )
}
export default SuccessStories
