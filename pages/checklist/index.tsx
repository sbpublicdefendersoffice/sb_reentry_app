import Head from 'next/head'
import { Accordian } from '../../types/accordian'
import Typography from '@material-ui/core/Typography'
import useLanguage from '../../hooks/useLanguage'
import MainAccordian from '../../components/MainAccordian'
import ProbationAccordian from '../../components/ProbationAccordian'
import {
  checklistData,
  jobAccordian,
  mentalHealthAccordian,
  sobrietyAccordian,
  medicalAccordian,
  foodAccordian,
  importantAccordian,
} from '../../constants/checklist-data'
import { useStyles } from '../../constants/materialStyles'
import TipsAccordianMain from '../../components/TipsAccordianMain'
const Checklist = () => {
  const classes = useStyles()
  const { language } = useLanguage()

  const accordians: Accordian[] = [
    jobAccordian,
    mentalHealthAccordian,
    sobrietyAccordian,

    medicalAccordian,
    foodAccordian,
    importantAccordian,
  ]

  const activeCopy = checklistData[language]

  return (
    <div>
      <Head>
        <title>{`Santa Barbara Reentry | ${activeCopy.title}`}</title>
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
        className={classes.pageDescription}
        align="center"
        variant="h5"
        component="h5"
      >
        {activeCopy.description}
      </Typography>
      <div>
        <ProbationAccordian />
        {accordians.map((accordian, key) => {
          const accord = accordian[language]
          return <MainAccordian accord={accord} key={key} />
        })}
        <TipsAccordianMain />
      </div>
    </div>
  )
}
Checklist.propTypes = {
  activeCopy: {},
  key: {},
}
export default Checklist
