import Head from 'next/head'
import { useState, useRef } from 'react'
import Link from '@material-ui/core/Link'
import Card from '@material-ui/core/Card'
import CardActionArea from '@material-ui/core/CardActionArea'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import Modal from '@material-ui/core/Modal'
import HighlightOffIcon from '@material-ui/icons/HighlightOff'
import { useOnClickOutside } from '../../hooks/useOnClickOutside'
import useLanguage from '../../hooks/useLanguage'
import Button from '@material-ui/core/Button'
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
import { FlyerPDF, Item, RightsLinks } from '../../types/flyerPDF'
import { useStyles } from '../../constants/materialStyles'
import GetAppIcon from '@material-ui/icons/GetApp'
import PageviewIcon from '@material-ui/icons/Pageview'
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
        <title>{`Santa Barbara Reentry | ${activeCopy.title}`}</title>
      </Head>
      <div>
        <Typography
          style={{ marginTop: '3rem' }}
          align="center"
          gutterBottom
          variant="h2"
          component="h3"
        >
          {activeCopy.title}
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
              <Grid item xs={12} sm={4} key={key}>
                <Card className={classes.root}>
                  <CardActionArea>
                    <CardContent className={classes.flyerCardContent}>
                      <div
                        style={{ width: '100% !important', display: 'flex' }}
                      >
                        <button
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
                              <GetAppIcon
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
                              <PageviewIcon
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
          <Grid item xs={12} sm={12}>
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
                    className="MuiLink-underlineNone"
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
                <button onClick={handleClose}>
                  <HighlightOffIcon className={classes.flyerIcons} />
                </button>
                {activeItem && (
                  <img
                    style={{ marginTop: '2rem', width: '100%' }}
                    src={activeItem.flyerPDF}
                    id="simple-modal-title"
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
