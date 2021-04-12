import Head from 'next/head'
import { useState, useRef } from 'react'
import Card from '@material-ui/core/Card'
import CardActionArea from '@material-ui/core/CardActionArea'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import Grid from '@material-ui/core/Grid'
import { useOnClickOutside } from '../../hooks/useOnClickOutside'
import Link from '@material-ui/core/Link'
import Typography from '@material-ui/core/Typography'
import Modal from '@material-ui/core/Modal'
import HighlightOffIcon from '@material-ui/icons/HighlightOff'
import { ENGLISH } from '../../constants/language'
import useLanguage from '../../hooks/useLanguage'
import {
  InformedImmigrant,
  IAmerica,
  ACLUImmigrants,
  ACLUDisability,
  NILC,
  NationalImmigration,
  NWIRP,
  ImmigrationProject,
  LACooperativa,
} from '../../constants/rights-links'
import {
  PoliceInteractionBlackAndBrownPDF,
  PoliceInteractionPDF,
  QuestionedByPolicePDF,
  TrustActPDF,
  TrainsBusesPDF,
  TrainsBusesImmigrationPDF,
  SB1421PDF,
  SB54PDF,
} from '../../constants/rights-data'
import { FlyerPDF, Item, RightsLinks } from '../../types/flyerPDF'
import { useStyles } from '../../constants/materialStyles'

const KnowYourRights = () => {
  const classes = useStyles()
  const { language } = useLanguage()
  const [open, setOpen] = useState(false)
  const node = useRef()
  useOnClickOutside(node, () => setOpen(false))
  const flyers: FlyerPDF[] = [
    PoliceInteractionBlackAndBrownPDF,
    QuestionedByPolicePDF,
    TrustActPDF,
    PoliceInteractionPDF,
    TrainsBusesPDF,
    SB1421PDF,
    TrainsBusesImmigrationPDF,
    SB54PDF,
  ]
  const links: RightsLinks[] = [
    InformedImmigrant,
    IAmerica,
    ACLUImmigrants,
    ACLUDisability,
    NILC,
    NationalImmigration,
    NWIRP,
    ImmigrationProject,
    LACooperativa,
  ]
  const [activeItem, setActiveItem] = useState<Item | undefined>(undefined)
  const handleOpen = (item: Item) => {
    setActiveItem(item)
    console.log('item:', item)
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
            const activeFlyer = flyer[language]
            return (
              <Grid item xs={12} sm={3} key={key}>
                <Card className={classes.flyerRoot}>
                  <CardActionArea>
                    <button
                      type="button"
                      onClick={() => handleOpen(activeFlyer)}
                      style={{ width: '100%' }}
                    >
                      <CardMedia
                        className={classes.flyerMedia}
                        image={activeFlyer.flyerPDF}
                        title={activeFlyer.name}
                      />
                      <CardContent className={classes.flyerCardContent}>
                        <Typography gutterBottom variant="h5" component="h2">
                          {activeFlyer.name}
                        </Typography>
                        <Typography gutterBottom variant="h5" component="h2">
                          {activeFlyer.organization}
                        </Typography>
                      </CardContent>
                    </button>
                  </CardActionArea>
                </Card>
              </Grid>
            )
          })}
          <Grid item xs={12} sm={12}>
            <h1 className={classes.cardContent}>Here are more links below</h1>
            {links.map((link, key) => {
              return (
                <Typography
                  className={classes.aBlock}
                  style={{ textAlign: 'center' }}
                  key={key}
                >
                  <Link
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {link.name}
                  </Link>
                </Typography>
              )
            })}
          </Grid>
          <Grid item xs={12} sm={6} ref={node}>
            <Modal
              open={open}
              onClose={handleClose}
              aria-labelledby="simple-modal-title"
              aria-describedby="simple-modal-description"
            >
              <div className={classes.paperModal}>
                <button onClick={handleClose}>
                  <HighlightOffIcon className={classes.flyerIcons} />
                </button>
                {activeItem && (
                  <a
                    style={{ marginTop: '2rem', width: '100%' }}
                    href={activeItem.flyerPDF}
                    download="Flyer"
                    id="simple-modal-title"
                  >
                    <img
                      id="simple-modal-description"
                      src={activeItem.flyerPDF}
                      style={{ width: '100%' }}
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
