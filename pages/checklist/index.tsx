import Head from 'next/head'
import Typography from '@material-ui/core/Typography'
import { siteTitle } from '../../constants/copy'
import useLanguage from '../../hooks/useLanguage'
import { copy } from '../../constants/checklist-data'
import HrefAccordian from '../../components/HrefAccord'
import MainAccordian from '../../components/MainAccordian'
import TipsAccordian from '../../components/TipsAccordian'
import { useStyles } from '../../constants/materialStyles'
const Checklist = () => {
  const { language } = useLanguage()
  const classes = useStyles()
  const activeCopy = copy[language]
  return (
    <div className={classes.root}>
      <Head>
        <title>{`${siteTitle} | ${activeCopy.title}`}</title>
      </Head>
      <Typography
        style={{ marginTop: '3rem' }}
        align="center"
        variant="h2"
        component="h2"
      >
        {activeCopy.title}
      </Typography>
      <Typography
        style={{
          marginTop: '2rem',
          marginBottom: '2rem',
          padding: '2rem',
          textAlign: 'justify',
        }}
        align="center"
        variant="h5"
        component="h5"
      >
        {activeCopy.description}
      </Typography>
      <div>
        <HrefAccordian data-testid="accordion" />
        <MainAccordian data-testid="accordion" />
        <TipsAccordian data-testid="accordion" />
      </div>
    </div>
  )
}
export default Checklist
