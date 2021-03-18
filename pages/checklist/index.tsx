import Head from 'next/head'
import React from 'react'

import { makeStyles, createStyles, Theme } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import Accordion from '@material-ui/core/Accordion'
import AccordionSummary from '@material-ui/core/AccordionSummary'
import AccordionDetails from '@material-ui/core/AccordionDetails'
import Paper from '@material-ui/core/Paper'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import { ENGLISH, CopyHolder } from '../../types/language'
import Grid from '@material-ui/core/Grid'
import useLanguage from '../../hooks/useLanguage'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import { probations } from '../../constants/probations'
import ListItemText from '@material-ui/core/ListItemText'
import TipsAccordian from '../../components/TipsAccordian'
import JobsAccordian from '../../components/JobsAccordian'
import MentalHealthAccordian from '../../components/MentalHealthAccordian'
import SobrietyAccordian from '../../components/SobrietyAccordian'
import MedicalNeedsAccordian from '../../components/MedicalNeedsAccordian'
import FoodAccordian from '../../components/FoodAccordian'
import ImportantDocumentsAccordian from '../../components/ImportantDocumentsAccordian'
import ProbationAccordian from '../../components/ProbationAccordian'
import { copy } from '../../constants/checklist-data'
import { useStyles } from '../../constants/materialStyles'

const Checklist = () => {
  const classes = useStyles()
  const { language } = useLanguage()
  const activeCopy = copy[language]
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
        <ProbationAccordian activeCopy={activeCopy} />
        <ImportantDocumentsAccordian activeCopy={activeCopy} />
        <FoodAccordian activeCopy={activeCopy} />
        <MedicalNeedsAccordian activeCopy={activeCopy} />
        <SobrietyAccordian activeCopy={activeCopy} />
        <MentalHealthAccordian activeCopy={activeCopy} />
        <JobsAccordian activeCopy={activeCopy} />
        <TipsAccordian activeCopy={activeCopy} />
      </div>
    </div>
  )
}
export default Checklist
