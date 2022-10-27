import * as React from 'react'

import { Title, Paragraph, CallToAction } from '../../ui'
import useLanguage from '../../hooks/useLanguage'
import { CopyHolder } from '../../types/language'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import Modal from '@mui/material/Modal'
import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import NextLink from 'next/link'

import styles from './Credo47Landing.module.css'
import LocalTaxiIcon from '@mui/icons-material/LocalTaxi'
import LetUsHelpIndexTitle from '../LetUsHelpIndexTitle'
import { Paper } from '@mui/material'

export const car: string = '/icons/specialtycourts.svg'
export const legal: string = '/icons/clearmyrecord.svg'
export const substance: string = '/icons/legalterms.svg'
export const house: string = '/icons/familyresources.svg'
export const src: string = '/icons/diversion.svg'

export const copy: CopyHolder = {
  english: {
    title: 'Credo 47',
    whatIs: 'What is Diversion?',
    explain:
      'CREDO-47 is a diversion program that links individuals with substance use and mental health problems to treatment and provides assistance with housing, jobs, education and other resources. If you are accepted in the program and participate in treatment, you are able to get your criminal case dismissed.',
    coResponse: 'Co-Response',
    stabalization: 'Stablizatoin Center',
    diversion: 'Pre-Filling and Post-Filling Diversion',
    housing: 'Step Down Housing',
    howWill: 'How will I know if I am eligible?',
    caseByCase:
      'Diversion eligibility is determined by the District Attorney’s Office on a case by case basis.',
    qualify: 'Not all cases will qualify.',
    contact: 'Who can I contact?',
    talkTo:
      'If you would like to learn more about diversion, please contact Julia Lara at the Santa Barbara County Public Defender’s Office.',
    holistic: 'Holistic Defense Advocate',
    defender: 'Office of the Public Defender of Santa Barbara',
    credo47lbl: 'Credo-47',
  },
  spanish: {
    title: 'Credo 47',
    whatIs: '¿Qué es el desvío?',
    explain:
      'CREDO-47 es un programa alternativo que vincula a las personas con problemas de salud mental y uso de sustancias con el tratamiento y brinda asistencia con vivienda, trabajo, educación y otros recursos. Si es aceptado en el programa y participa en el tratamiento, puede hacer que se desestime su caso penal.',
    coResponse: 'Co-Response',
    stabalization: 'Stablizatoin Center',
    diversion: 'Pre-Filling and Post-Filling Diversion',
    housing: 'Step Down Housing',
    howWill: '¿Cómo sabré si soy elegible?',
    caseByCase:
      'La elegibilidad para la desviación la determina la Oficina del Fiscal de Distrito caso por caso.',
    qualify: 'No todos los casos calificarán.',
    contact: '¿A quién puedo contactar?',
    talkTo:
      'Si desea obtener más información sobre la desviación, comuníquese con Julia Lara en la Oficina del Defensor Público del Condado de Santa Bárbara.',
    holistic: 'Defensor de la defensa holística',
    defender: 'Oficina del Defensor Público de Santa Bárbara',
    credo47lbl: 'Credo-47',
  },
}

const Credo47Landing = () => {
  const { language } = useLanguage()
  const {
    title,
    whatIs,
    explain,
    coResponse,
    stabalization,
    diversion,
    housing,
  } = copy[language]

  return (
    <div className={styles.Container}>
      <div className={styles.Header}>
        <div className={styles.LeftHeader}></div>
        <div className={styles.RightHeader}>
          <div className={styles.RightHeaderContent}>
            <Typography variant="h3" component="div">
              {title}
            </Typography>

            <Typography variant="h4" component="div">
              {explain}
            </Typography>
          </div>
        </div>
      </div>
      <div className={styles.Branches}>
        <Button href="#CoResponse" className={styles.Tile}>
          <img
            role="img"
            className={styles.Image}
            src={car}
            // alt={`${title} image`}
          />
          <Paragraph role="term" size="med-text">
            {coResponse}
          </Paragraph>
        </Button>
        <Button href="#StabCenter" className={styles.Tile}>
          <img
            role="img"
            className={styles.Image}
            src={substance}
            // alt={`${title} image`}
          />
          <Paragraph role="term" size="med-text">
            {stabalization}
          </Paragraph>
        </Button>
        <Button href="#Diversion" className={styles.Tile}>
          <img
            role="img"
            className={styles.Image}
            src={legal}
            // alt={`${title} image`}
          />
          <Paragraph role="term" size="med-text">
            {diversion}
          </Paragraph>
        </Button>
        <Button href="#StepHousing" className={styles.Tile}>
          <img
            role="img"
            className={styles.Image}
            src={house}
            // alt={`${title} image`}
          />
          <Paragraph role="term" size="med-text">
            {housing}
          </Paragraph>
        </Button>
      </div>
      <div id="CoResponse" className={styles.Blue}>
        <div className={styles.AboutProg}>
          <div className={styles.LeftAboutProg}></div>
          <div className={styles.RigthAboutProg}>
            <Typography variant="h3" component="div">
              Co-Response
            </Typography>
            <br />
            <Typography variant="h5" component="div">
              The Santa Barbara County Co-Response program is an operational
              partnership between the Sheriffs Office and Department of
              Behavioral Wellness. The mission of the partnership is to divert
              persons in mental health crisis from the criminal justice system
              when safe and appropriate. Together, a Crisis Intervention Trained
              (CIT) deputy and a licensed clinician respond to 911 mental health
              calls together as a team, de escalating persons in crisis and
              providing treatment options and resources.
            </Typography>
          </div>
        </div>
        <div className={styles.InfoBox}>
          <Paper className={styles.LeftInfoBox} elevation={3}>
            <div>
              <img
                className={styles.ListIcon}
                src={'/../icons/phonecall.svg'}
                alt="Phone icon"
              />
            </div>
            <div className={styles.LeftInfoBoxText}>
              <Typography variant="h4" component="div">
                Contact
              </Typography>
              <br />
              <Typography variant="h5" component="div">
                Call 911, Sheriff's dispatch will assess and connect to CRT
              </Typography>
            </div>
          </Paper>
          <Paper className={styles.RightInfoBox} elevation={3}>
            <div>
              <a
                className={styles.Link}
                href="https://www.sbsheriff.org/wp-content/uploads/2019/05/911-checklist-SBSO-May2019F1.pdf"
                target="_blank"
                rel="noreferrer"
              >
                <img
                  className={styles.ListIcon}
                  src={'/../icons/checklist.svg'}
                  alt="check list icon"
                />
              </a>
            </div>
            <div className={styles.RightInfoBoxText}>
              <Typography variant="h4" component="div">
                Eligibility
              </Typography>
              <br />
              <Typography variant="h5" component="div">
                Individuals in mental health or substance use related emergency
                <br />
                <a
                  className={styles.Link}
                  href="https://www.sbsheriff.org/wp-content/uploads/2019/05/911-checklist-SBSO-May2019F1.pdf"
                  target="_blank"
                  rel="noreferrer"
                >
                  911 Checklist
                </a>
              </Typography>
            </div>
          </Paper>
        </div>
        <div className={styles.AdditionalInfo}>
          <Paper className={styles.AddPaper} elevation={3}>
            <a
              className={styles.Link}
              href="https://www.sbsheriff.org/behavioral-sciences-unit/"
              target="_blank"
              rel="noreferrer"
            >
              <div>
                <img
                  className={styles.ListIcon}
                  src={'/../icons/website.svg'}
                  alt="Phone icon"
                />
              </div>
              <Typography variant="h4" component="div">
                Sheriff's website
              </Typography>
            </a>
          </Paper>
        </div>
      </div>
      <div id="StabCenter" className={styles.White}>
        <div className={styles.AboutProg}>
          <div className={styles.RigthAboutProg}>
            <Typography variant="h3" component="div">
              Stabalization Center
            </Typography>
            <br />
            <Typography variant="h5" component="div">
              The CREDO47 Stabilization Center is a jail diversion program
              funded through the State of California Proposition 47. The CREDO47
              Stabilization Center will divert individuals from jail and
              potential legal repercussions of minor offenses and will be used
              to connect them to Drug and Alcohol Programs, Case Management,
              Housing, and other services available in the area. Individuals
              over the age of 18 who are cooperative and amenable to services
              will be assessed by medical professionals for eligibility. Once
              evaluated and accepted, individuals have a safe controlled
              environment for 24 hours to “sober up.” We offer food, hydration
              and medical monitoring throughout the stay.
            </Typography>
          </div>
          <div className={styles.StabalizationPic} id="Stabilzation"></div>
        </div>
        <div className={styles.InfoBox}>
          <Paper className={styles.LeftInfoBox} elevation={3}>
            <div>
              <img
                className={styles.ListIcon}
                src={'/../icons/phonecall.svg'}
                alt="Phone icon"
              />
            </div>
            <div className={styles.LeftInfoBoxText}>
              <Typography variant="h4" component="div">
                Contact
              </Typography>
              <br />
              <Typography variant="h5" component="div">
                Check availability please call
                <a href="tel:8052509022"> (805) 250-9022</a>.
                <br />
                427 Camino Del Remedio, Santa Barbara
                <br />
                Open 24 hours a day, 7 days a week
              </Typography>
            </div>
          </Paper>
          <Paper className={styles.RightInfoBox} elevation={3}>
            <div>
              <a
                className={styles.Link}
                href="https://www.sbsheriff.org/wp-content/uploads/2019/05/911-checklist-SBSO-May2019F1.pdf"
                target="_blank"
                rel="noreferrer"
              >
                <img
                  className={styles.ListIcon}
                  src={'/../icons/checklist.svg'}
                  alt="check list icon"
                />
              </a>
            </div>
            <div className={styles.RightInfoBoxText}>
              <Typography variant="h4" component="div">
                Eligibility
              </Typography>
              <br />
              <Typography variant="h5" component="div">
                Individuals over the age of 18 who are cooperative and amenable
                to services will be assessed by medical professionals for
                eligibility.
              </Typography>
            </div>
          </Paper>
        </div>
        <div className={styles.AdditionalInfo}>
          <NextLink href="/documents/stabalizationcenterbrochure">
            <Paper className={styles.AddPaper} elevation={3}>
              <div>
                <img
                  className={styles.ListIcon}
                  src={'/../icons/documents.svg'}
                  alt="Phone icon"
                />
              </div>
              <Typography variant="h4" component="div">
                Stabalization Center Brochure
              </Typography>
            </Paper>
          </NextLink>
        </div>
      </div>
      <div id="Diversion" className={styles.Blue}>
        <div className={styles.AboutProg}>
          <div className={styles.PrePostDiversion}></div>
          <div className={styles.RigthAboutProg}>
            <Typography variant="h3" component="div">
              Pre-Filing and Post-Filing Diversion
            </Typography>
            <br />
            <Typography variant="h5" component="div">
              Pre- and post-filing diversion for individuals who have been
              cite-released or booked into custody. Individuals who have been
              cite-released or booked into custody undergo a thorough,
              three-stage screening process to determine their eligibility for
              the CREDO47 program. Individuals with cases that are approved by
              the Holistic Defense Advocate, Public Defender, and, ultimately,
              the District Attorney, are approved for diversion and formally
              enrolled in the program. Clients have the opportunity to have
              their charges dropped or dismissed pending successful completion.
              Completion requirements are tailored to each individual and
              reflect their unique SUD and mental health needs.
            </Typography>
          </div>
        </div>

        <div className={styles.InfoBox}>
          <Paper className={styles.LeftInfoBox} elevation={3}>
            <div>
              <img
                className={styles.ListIcon}
                src={'/../icons/phonecall.svg'}
                alt="Phone icon"
              />
            </div>
            <div className={styles.LeftInfoBoxText}>
              <Typography variant="h4" component="div">
                Contact
              </Typography>
              <br />
              <Typography variant="h5" component="div">
                Julia Lara Holistic Defense Advocate Office of the Public
                Defender of Santa Barbara CREDO 47 Office:
                <br />
                <a href="tel:8055683498"> (805) 568-3498 </a>
                <br />
                Email:
                <a href="mailto:julara@countyofsb.org" target="_blank">
                  {' '}
                  julara@countyofsb.org
                </a>
              </Typography>
            </div>
          </Paper>
          <Paper className={styles.RightInfoBox} elevation={3}>
            <div>
              <a
                className={styles.Link}
                href="https://www.sbsheriff.org/wp-content/uploads/2019/05/911-checklist-SBSO-May2019F1.pdf"
                target="_blank"
                rel="noreferrer"
              >
                <img
                  className={styles.ListIcon}
                  src={'/../icons/checklist.svg'}
                  alt="check list icon"
                />
              </a>
            </div>
            <div className={styles.RightInfoBoxText}>
              <Typography variant="h4" component="div">
                Eligibility
              </Typography>
              <br />
              <Typography variant="h5" component="div">
                Individuals in mental health or substance use related emergency
              </Typography>
            </div>
          </Paper>
        </div>
        <div className={styles.AdditionalInfo}>
          <NextLink href="/documents/diversionreferralform">
            <Paper className={styles.AddPaper} elevation={3}>
              <div>
                <img
                  className={styles.ListIcon}
                  src={'/../icons/documents.svg'}
                  alt="Phone icon"
                />
              </div>
              <Typography variant="h4" component="div">
                Diversion Referral Form
              </Typography>
            </Paper>
          </NextLink>
          <NextLink href="/documents/diversionreferralinstruction">
            <Paper className={styles.AddPaper} elevation={3}>
              <div>
                <img
                  className={styles.ListIcon}
                  src={'/../icons/documents.svg'}
                  alt="Phone icon"
                />
              </div>
              <Typography variant="h4" component="div">
                Diversion Referral Form Instruction
              </Typography>
            </Paper>
          </NextLink>
        </div>
      </div>
      <div id="StepHousing" className={styles.White}>
        <div className={styles.AboutProg}>
          <div className={styles.RigthAboutProg}>
            <Typography variant="h3" component="div">
              Step Down Housing
            </Typography>
            <br />
            <Typography variant="h5" component="div">
              Step Down Housing (SDH) offers supportive housing for up to 20
              individuals (4 female and 16 male) with mental health and/or
              substance use disorders, who are also justice impacted and
              experiencing homelessness. Following stabilization, individuals
              are “stepped down” from higher level of care settings, such as
              residential treatment, to one of four substance-free homes where
              they can reside for six to twelve months to facilitate reentry in
              the Santa Barbara community. Individuals living at SDH receive
              case management, medical and behavioral health support, weekly
              support groups, life skills education (e.g., financial literacy,
              managing personal property), and housing support (e.g., securing
              housing vouchers, locating long-term housing) as appropriate. Food
              and limited transportation provided. Housing staff include four
              live-in housing assistants (one per house), one life skills case
              manager, one program manager, and one behavioral health case
              manager, all of whom are trained in trauma-informed approaches to
              client engagement. SDH uses a multi-agency and client-centered
              approach to achieve health and wellness, with the goal of
              transitioning clients into permanent independent housing. Program
              partners include Good Samaritan Shelter, Family Service Agency,
              SBC Behavioral Wellness, and SBC Public Defender.
            </Typography>
          </div>
          <div className={styles.Stepdown}></div>
        </div>
        <div className={styles.InfoBox}>
          <Paper className={styles.LeftInfoBox} elevation={3}>
            <div>
              <img
                className={styles.ListIcon}
                src={'/../icons/phonecall.svg'}
                alt="Phone icon"
              />
            </div>
            <div className={styles.LeftInfoBoxText}>
              <Typography variant="h4" component="div">
                Contact
              </Typography>
              <br />
              <Typography variant="h5" component="div">
                Julia Lara Holistic Defense Advocate Office of the Public
                Defender of Santa Barbara CREDO 47 Office:
                <br />
                <a href="tel:8055683498"> (805) 568-3498 </a>
                <br />
                Email:
                <a href="mailto:julara@countyofsb.org" target="_blank">
                  {' '}
                  julara@countyofsb.org
                </a>
              </Typography>
            </div>
          </Paper>
          <Paper className={styles.RightInfoBox} elevation={3}>
            <div>
              <a
                className={styles.Link}
                href="https://www.sbsheriff.org/wp-content/uploads/2019/05/911-checklist-SBSO-May2019F1.pdf"
                target="_blank"
                rel="noreferrer"
              >
                <img
                  className={styles.ListIcon}
                  src={'/../icons/checklist.svg'}
                  alt="check list icon"
                />
              </a>
            </div>
            <div className={styles.RightInfoBoxText}>
              <Typography variant="h4" component="div">
                Eligibility
              </Typography>
              <br />
              <Typography variant="h5" component="div">
                • SB county resident eligible for SB County Medi-Cal/Medi-Care •
                Willing to sign Universal ROI with program partners (i.e. Good
                Sam, FSA, BWell, PD) • Criminal conviction and/or has an open
                case, in a diversion program, on probation/parole • Completed
                Mental Health and/or Substance Use Disorder assessment and is
                participating in services • Homeless (verified & if possible
                documented) • Eligible for Good Samaritan programs • No arson
                conviction, no 290 registration; violent charges/convictions
                will be reviewed on case-by-case basis
              </Typography>
            </div>
          </Paper>
        </div>
        <div className={styles.AdditionalInfo}>
          <NextLink href="/documents/stepdownhousingbrief">
            <Paper className={styles.AddPaper} elevation={3}>
              <div>
                <img
                  className={styles.ListIcon}
                  src={'/../icons/documents.svg'}
                  alt="Phone icon"
                />
              </div>
              <Typography variant="h4" component="div">
                Stepdown Housing Brief
              </Typography>
            </Paper>
          </NextLink>
        </div>
      </div>
    </div>
  )
}

export default Credo47Landing
