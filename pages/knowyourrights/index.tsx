import Head from 'next/head'
import { useState } from 'react'
import { makeStyles, createStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardActionArea from '@material-ui/core/CardActionArea'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import Modal from '@material-ui/core/Modal'
import HighlightOffIcon from '@material-ui/icons/HighlightOff'

import { ENGLISH } from '../../constants/language'
import useLanguage from '../../hooks/useLanguage'

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      maxWidth: '70%',
      marginLeft: '2rem',
    },
    media: {
      height: '20rem',
    },
    cardContent: {
      textAlign: 'center',
      width: 'auto',
      maxHeight: '10rem',
      justifyContent: 'center',
      backgroundColor: '#13395E',
      color: 'white',
    },
    paper: {
      backgroundColor: 'white',

      width: 'auto',
      marginLeft: '45rem',
      height: '80%',
      position: 'absolute',
      top: '50%',
      transform: 'translateY(-50%)',
      padding: '1rem',
      borderColor: 'white !important',
      overflow: 'auto',
      maxHeight: '70rem',
      '@media (max-width: 1280px)': {
        marginLeft: '.5rem',
        width: '28rem',
      },
    },
    icons: {
      position: 'fixed',
      color: '#13395e',
      margin: 'auto',
      fontSize: '3rem',
    },
  }),
)
interface Item {
  name: string
  spanishName: string
  organization: string
  flyerPDF: string
  spanishFlyerPDF: string
}
const flyers: Item[] = [
  {
    name: 'Police Interaction for Black and Brown People',
    spanishName: 'Interacción policial para personas negras y morenas',
    organization: 'ACLU',
    flyerPDF: 'https://i.ibb.co/xFcqtKz/KYR-Black-Brown-Police-ENGLISH.jpg',
    spanishFlyerPDF: 'https://i.ibb.co/P5jTZcp/KYR-Black-and-Brown-Spanish.jpg',
  },
  {
    name:
      'What to do if questioned by Police, FBI, Custom Agents or Immigration Officers',
    spanishName:
      'Qué hacer si es interrogado por la policía, el FBI, agentes de aduanas o oficiales de inmigración',
    organization: 'ACLU',
    flyerPDF: 'https://i.ibb.co/VDHYQQd/KYR-Questioned-by-Police-ENGLISH.jpg',
    spanishFlyerPDF:
      'https://i.ibb.co/0y6VVXk/KYR-Questioned-by-Police-SPANISH.jpg',
  },

  {
    name: 'Know your rights: Police Interactions ',
    spanishName: 'Conozca sus derechos: Interacciones policiales',
    organization: 'ACLU',
    flyerPDF: 'https://i.ibb.co/gP9yVBJ/KYR-Police-Interactions-English.jpg',
    spanishFlyerPDF:
      'https://i.ibb.co/cT7HSNB/KYR-Police-Interactions-SPANISH.jpg',
  },
  {
    name: 'Know your rights: the TRUST ACT ',
    spanishName: 'Conozca sus derechos: la LEY DE CONFIANZA',
    organization: 'ACLU',
    flyerPDF: 'https://i.ibb.co/vL9bChn/TRUST-ACT-KYR.jpg',
    spanishFlyerPDF:
      'https://i.ibb.co/0y6VVXk/KYR-Questioned-by-Police-SPANISH.jpg',
  },
  {
    name: 'Know your rights on trains and buses ',
    spanishName: 'Conozca sus derechos en trenes y autobuses',
    organization: 'ACLU',
    flyerPDF:
      'https://i.ibb.co/XxKGDYD/KYR-Trains-and-Buses-Immigration-ENGLISH.jpg',
    spanishFlyerPDF:
      'https://i.ibb.co/9gLM3qz/KYR-Trains-and-Buses-2-SPANISH.jpg',
  },
]

const KnowYourRights = () => {
  const classes = useStyles()
  const { language } = useLanguage()
  const [open, setOpen] = useState(false)
  const [activeItem, setActiveItem] = useState<Item | null>(null)

  const handleOpen = item => {
    console.log('item:', item)
    setActiveItem(item)
    setOpen(true)
  }
  const handleClose = () => {
    setOpen(false)
  }

  return (
    <>
      <Head>
        <title>
          {`Santa Barbara Reentry | ${
            language === ENGLISH ? `Know your Rights` : `Conoce tus derechos `
          }`}
        </title>
      </Head>
      <div>
        <Typography
          style={{ marginTop: '3rem' }}
          align="center"
          gutterBottom
          variant="h2"
          component="h3"
        >
          {language === ENGLISH ? `Know your Rights` : `Conoce tus derechos `}
        </Typography>
        <Grid
          container
          spacing={2}
          direction="row"
          justify="flex-start"
          alignItems="flex-start"
        >
          {flyers.map((flyer, key) => {
            return (
              <Grid item xs={12} sm={3} key={key}>
                <Card className={classes.root}>
                  <CardActionArea>
                    <button type="button" onClick={() => handleOpen(flyer)}>
                      <CardMedia
                        className={classes.media}
                        image={
                          language === ENGLISH
                            ? `${flyer.flyerPDF}`
                            : `${flyer.spanishFlyerPDF} `
                        }
                        title={
                          language === ENGLISH
                            ? `${flyer.name}`
                            : `${flyer.spanishName} `
                        }
                      />

                      <CardContent className={classes.cardContent}>
                        <Typography gutterBottom variant="h5" component="h2">
                          {language === ENGLISH
                            ? `${flyer.name}`
                            : `${flyer.spanishName} `}
                        </Typography>

                        <Typography gutterBottom variant="h5" component="h2">
                          {flyer.organization}
                        </Typography>
                      </CardContent>
                    </button>
                  </CardActionArea>
                </Card>
              </Grid>
            )
          })}
          <Grid item xs={12} sm={6}>
            <Modal
              open={open}
              onClose={handleClose}
              aria-labelledby="simple-modal-title"
              aria-describedby="simple-modal-description"
            >
              <div className={classes.paper}>
                <button onClick={handleClose}>
                  <HighlightOffIcon className={classes.icons} />
                </button>
                {activeItem && (
                  <a
                    style={{ marginTop: '2rem' }}
                    href={
                      language === ENGLISH
                        ? `${activeItem.flyerPDF}`
                        : `${activeItem.spanishFlyerPDF} `
                    }
                    download="Flyer"
                  >
                    <img
                      src={
                        language === ENGLISH
                          ? `${activeItem.flyerPDF}`
                          : `${activeItem.spanishFlyerPDF} `
                      }
                    />
                  </a>
                )}
              </div>
            </Modal>
          </Grid>
        </Grid>
        {}
      </div>
    </>
  )
}
export default KnowYourRights
