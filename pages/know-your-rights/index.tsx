import Head from 'next/head'
import React from 'react'
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardActionArea from '@material-ui/core/CardActionArea'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import Link from '@material-ui/core/Link'
import Typography from '@material-ui/core/Typography'
import Modal from '@material-ui/core/Modal'
import HighlightOffIcon from '@material-ui/icons/HighlightOff'

const useStyles = makeStyles((theme: Theme) =>
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
const KnowYourRights = () => {
  const classes = useStyles()
  const [open, setOpen] = React.useState(false)
  const [activeItem, setActiveItem] = React.useState({})
  console.log('styles')
  const flyers = [
    {
      name: 'Police Interaction for Black and Brown People',
      organization: 'ACLU',
      profilePic: 'https://i.ibb.co/xFcqtKz/KYR-Black-Brown-Police-ENGLISH.jpg',
    },
    {
      name:
        'What to do if questioned by Police, FBI, Custom Agents or Immigration Officers',
      organization: 'ACLU',
      profilePic:
        'https://i.ibb.co/VDHYQQd/KYR-Questioned-by-Police-ENGLISH.jpg',
    },
    {
      name: 'Know your rights: Police Interactions ',
      organization: 'ACLU',
      profilePic:
        'https://i.ibb.co/gP9yVBJ/KYR-Police-Interactions-English.jpg',
    },
    {
      name: 'Know your rights: the TRUST ACT ',
      organization: 'ACLU',
      profilePic: 'https://i.ibb.co/vL9bChn/TRUST-ACT-KYR.jpg',
    },
    {
      name: 'Know your rights on trains and buses ',
      organization: 'ACLU',
      profilePic:
        'https://i.ibb.co/XxKGDYD/KYR-Trains-and-Buses-Immigration-ENGLISH.jpg',
    },
  ]
  const handleOpen = item => {
    setActiveItem(item)
    setOpen(true)
  }
  const handleClose = () => {
    setOpen(false)
  }
  return (
    <>
      <Head>
        <title>{`Santa Barbara Reentry | Know Your Rights`}</title>
      </Head>
      <div>
        <Typography
          style={{ marginTop: '3rem' }}
          align="center"
          gutterBottom
          variant="h2"
          component="h3"
        >
          Know your Rights
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
                        image={flyer.profilePic}
                        title="Contemplative Reptile"
                      />

                      <CardContent className={classes.cardContent}>
                        <Typography gutterBottom variant="h5" component="h2">
                          {flyer.name}
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
                {/* <img
                  style={{ marginTop: '2rem' }}
                  id="simple-modal-title"
                  src={activeItem.profilePic}
                  alt="some text"
                /> */}
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
