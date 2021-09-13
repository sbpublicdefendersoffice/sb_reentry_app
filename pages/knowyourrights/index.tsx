import Head from 'next/head'
import { useState, useRef } from 'react'
import {
  Link,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Grid,
  Typography,
  Modal,
  Button,
} from '@material-ui/core/'
import { FlyerPDF, Item, RightsLinks } from '../../types/flyerPDF'
import { siteTitle, useStyles } from '../../constants/'
import { GetApp, Pageview, HighlightOff } from '@material-ui/icons/'
import { useOnClickOutside, useLanguage } from '../../hooks/'
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
  copy,
} from '../../constants/rights-data'
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
  const activeCopy = copy[language]
  const [activeItem, setActiveItem] = useState<Item | undefined>(undefined)
  const handleOpen = (item: Item) => {
    setActiveItem(item)
    setOpen(true)
  }
  const handleClose = () => {
    setOpen(false)
  }
  return (
    <>
      <Head>
        <title>{`${siteTitle} | ${activeCopy.title}`}</title>
      </Head>
      <div>
        <Typography
          style={{ marginTop: '3rem' }}
          align="center"
          gutterBottom
          variant="h2"
          component="h2"
        >
          {activeCopy.title}
        </Typography>
        <Typography
          style={{ marginTop: '3rem', marginBottom: '2rem', padding: '3rem' }}
          align="center"
          gutterBottom
          variant="h4"
          component="h4"
        >
          {activeCopy.description}
        </Typography>
        <Grid container spacing={3}>
          {flyers.map((flyer, key) => {
            const activeFlyer = flyer[language]
            return (
              <Grid item xs={12} sm={12} md={4} key={key}>
                <Card className={classes.root}>
                  <CardActionArea>
                    <CardContent className={classes.flyerCardContent}>
                      <div
                        style={{ width: '100% !important', display: 'flex' }}
                      >
                        <Grid container>
                          <Grid
                            item
                            sm={3}
                            md={6}
                            style={{ height: '15rem', margin: 'auto' }}
                          >
                            <button
                              data-testid="flyer-button"
                              type="button"
                              onClick={() => handleOpen(activeFlyer)}
                              style={{ height: '100%' }}
                            >
                              <CardMedia
                                className={classes.flyerMedia}
                                image={activeFlyer.thumb}
                                title={activeFlyer.name}
                              />
                            </button>
                          </Grid>
                          <Grid item xs={12} sm={8} md={6}>
                            <Typography
                              style={{
                                pointerEvents: 'none',
                                padding: '1rem',
                                textAlign: 'center',
                                margin: 'auto',
                              }}
                              gutterBottom
                              variant="h5"
                              component="h2"
                            >
                              {activeFlyer.name}
                            </Typography>
                            <Typography
                              style={{
                                pointerEvents: 'none',
                                padding: '.5rem',
                                height: '100%',
                              }}
                              gutterBottom
                              variant="h5"
                              component="h2"
                            >
                              {activeFlyer.organization}
                            </Typography>
                          </Grid>
                          <Grid item md={6} className={classes.downloadButtons}>
                            <a
                              style={{
                                marginTop: '2rem',
                                margin: 'auto',
                                color: 'white',
                                textDecoration: 'none !important',
                                padding: '1rem',
                              }}
                              href={activeFlyer.flyerPDF}
                              download="Flyer"
                              id="simple-modal-title"
                            >
                              <Button
                                data-testid="download-flyer"
                                onClick={() => handleOpen(activeFlyer)}
                                style={{
                                  marginTop: '2rem !important',
                                  color: 'white',
                                }}
                              >
                                {activeCopy.download}
                                <GetApp
                                  style={{
                                    color: 'white',
                                    position: 'relative',
                                  }}
                                />
                              </Button>
                            </a>
                            <a
                              style={{
                                marginTop: '2rem',
                                width: '100%',
                                color: 'white',
                                textDecoration: 'none !important',
                                marginRight: '2rem',
                              }}
                              id="simple-modal-title"
                            >
                              <Button
                                onClick={() => handleOpen(activeFlyer)}
                                style={{
                                  marginTop: '2rem',
                                  color: 'white',
                                }}
                              >
                                {activeCopy.view}
                                <Pageview
                                  style={{
                                    color: 'white',
                                    position: 'relative',
                                    marginLeft: '.3rem',
                                  }}
                                />
                              </Button>
                            </a>
                            {}
                          </Grid>
                        </Grid>
                      </div>
                    </CardContent>
                  </CardActionArea>
                </Card>
              </Grid>
            )
          })}
          <Grid item xs={11} sm={11}>
            <h1
              className={classes.cardContent}
              style={{ marginBottom: '1rem' }}
            >
              {language === 'english' ? 'More Links' : 'Más Enlaces'}:
            </h1>
            {links.map((link, key) => {
              return (
                <Typography
                  className={classes.aBlock}
                  style={{
                    textAlign: 'center',
                    padding: '.4rem',
                  }}
                  key={key}
                >
                  <Link
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ borderBottom: 'none' }}
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
              style={{ display: 'flex', justifyContent: 'center' }}
            >
              <div className={classes.flyerPaper}>
                <button data-testid="modal" onClick={handleClose}>
                  <HighlightOff className={classes.flyerIcons} />
                </button>
                {activeItem && (
                  <img
                    style={{ marginTop: '2rem', width: '100%' }}
                    src={activeItem.flyerPDF}
                    id="simple-modal-title"
                    alt="know your rights flyer"
                  />
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
