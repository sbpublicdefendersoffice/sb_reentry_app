import Head from 'next/head'
import { makeStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import Typography from '@material-ui/core/Typography'
import { CopyHolder, ENGLISH } from '../../types/language'
import Grid from '@material-ui/core/Grid'
import useLanguage from '../../hooks/useLanguage'
const useStyles = makeStyles({
  root: {
    maxWidth: 345,
    margin: 'auto',
  },
  media: {
    height: '20rem',
  },
  cardContent: {
    textAlign: 'center',
  },
})
const SuccessStories = () => {
  const { language } = useLanguage()
  const classes = useStyles()
  const copy: CopyHolder = {
    english: {
      title: 'Success Stories',
    },

    spanish: {
      title: 'Historias de éxito',
    },
  }

  const activeCopy = copy[language]
  const successStories = [
    {
      name: 'Arturo "Cheech" Raygoza',

      role: 'President of BIG E',
      spanishRole: 'Presidente de BIG E',
      organization: 'Alan Hancock College',
      spanishOrganization: 'Universidad Allan Hancock',
      profilePic: 'https://i.ibb.co/R0mMtMv/BIO-Picture.jpg',
      alt: 'picture of Arturo Raygoza',
      spanishAlt: 'foto de Arturo Raygoza',
      bio:
        'I am a formerly incarcerated student who after thirteen years in and out of prison, graduated with my AS degree in Automotive Technology. I recently switched my career to Sociology with Transfer and plan on attending either UCSB or Berkeley. I’m currently President of the B.I.G.E.(Beyond Incarceration Greater Education) Club which helps formerly incarcerated individuals enroll in college and lower recidivism. I also work for Allan Hancock College’s Beyond Barriers program as a student mentor, giving back to my community what was freely given to me.',
      spanishBio:
        'Soy un estudiante anteriormente encarcelado que después de trece años dentro y fuera de prisión, se graduó con mi título de AS en Tecnología Automotriz. Recientemente cambié mi carrera a Sociología con Transferencia y planeo asistir a UCSB o Berkeley. Actualmente soy presidente del Club B.I.G.E. (Beyond Incarceration Greater Education), que ayuda a las personas anteriormente encarceladas a inscribirse en la universidad y reducir la reincidencia. También trabajo para el programa Beyond Barriers de Allan Hancock College como mentor estudiantil, devolviendo a mi comunidad lo que me fue dado gratuitamente.',
    },
    {
      name: 'Lisa Rising',
      role: 'Student',
      organization: 'Underground Scholars UCSB',
      profilePic: 'https://i.ibb.co/kK1Kt7s/lisarising.jpg',
      bio: `My name is Lisandra "Lisa" Barrera Rising. I currently attend Santa Barbara City College in pursuit to attaining my major in Sociology. I have proudly overcome the systemic oppression of the injustice system by beating a 13 year opiate addiction, losing and regaining parental custody over my daughter while going in and out of jail. Today, I have found a passion in my academic journey and want to support and encourage anybody else going through the same challenges I once experienced. Anything is possible through community and valuable resources! Let's all stand to make a change and prove society we can persevere despite our pasts mistakes.`,
      spanishBio: `Mi nombre es Lisandra "Lisa" Barrera Rising. Actualmente asisto a Santa Barbara City College en pos de obtener mi especialización en Sociología. He superado con orgullo la opresión sistémica del sistema de injusticia superando una adicción a los opiáceos durante 13 años, perdiendo y recuperando la custodia de los padres sobre mi hija mientras entraba y salía de la cárcel. Hoy, he encontrado una pasión en mi viaje académico y quiero apoyar y alentar a cualquier otra persona que atraviese los mismos desafíos que una vez experimenté. ¡Todo es posible a través de la comunidad y recursos valiosos! Estemos todos para hacer un cambio y demostrarle a la sociedad que podemos perseverar a pesar de los errores del pasado.`,
    },
  ]
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
          return (
            <Grid item xs={12} sm={2} key={key}>
              <Card className={classes.root}>
                <CardMedia
                  className={classes.media}
                  image={successStory.profilePic}
                  title={
                    language === ENGLISH
                      ? `${successStory.alt} `
                      : `${successStory.spanishAlt} `
                  }
                />
                <CardContent className={classes.cardContent}>
                  <Typography gutterBottom variant="h5" component="h2">
                    {successStory.name}
                  </Typography>
                  <Typography gutterBottom variant="h5" component="h2">
                    {language === ENGLISH
                      ? `${successStory.role} `
                      : `${successStory.spanishRole} `}
                  </Typography>
                  <Typography gutterBottom variant="h5" component="h2">
                    {language === ENGLISH
                      ? `${successStory.organization} `
                      : `${successStory.spanishOrganization} `}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    component="p"
                  >
                    {language === ENGLISH
                      ? `${successStory.bio} `
                      : `${successStory.spanishBio} `}
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
