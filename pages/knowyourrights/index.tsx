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
          variant="h1"
          component="h1"
        >
          {activeCopy.title}
        </Typography>

        <Typography
          style={{ marginTop: '3rem', marginBottom: '2rem' }}
          align="center"
          gutterBottom
          variant="h4"
          component="h4"
        >
          {activeCopy.description}
        </Typography>
        <Grid
          container
          spacing={3}
          direction="row"
          justify="flex-start"
          alignItems="flex-start"
        >
          {flyers.map((flyer, key) => {
            const activeFlyer = flyer[language]
            return (
              <Grid item xs={11} sm={4} key={key}>
                <Card className={classes.root}>
                  <CardActionArea>
                    <CardContent className={classes.flyerCardContent}>
                      <div
                        style={{ width: '100% !important', display: 'flex' }}
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
                        <div
                          style={{
                            width: '60%',
                            display: 'block',
                            margin: 'auto',
                          }}
                        >
                          <Typography
                            style={{
                              pointerEvents: 'none',
                              padding: '1rem',
                              height: '100%',
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
                          <a
                            style={{
                              marginTop: '2rem',
                              width: '100%',
                              color: 'white',
                              textDecoration: 'none !important',
                            }}
                            href={activeFlyer.flyerPDF}
                            download="Flyer"
                            id="simple-modal-title"
                          >
                            <Button
                              onClick={() => handleOpen(activeFlyer)}
                              style={{
                                position: 'absolute',
                                marginTop: '2rem',
                                color: 'white',
                                top: '13.5rem',
                                left: '6.5rem',
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
                                position: 'absolute',
                                marginTop: '2rem',
                                color: 'white',
                                top: '13.5rem',
                                left: '.3rem',
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
                        </div>
                      </div>
                    </CardContent>
                  </CardActionArea>
                </Card>
              </Grid>
            )
          })}
          <Grid item xs={11} sm={11}>
            <h1 className={classes.cardContent}>
              {language === 'english' ? 'More Links' : 'Más Enlaces'}:
            </h1>
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
