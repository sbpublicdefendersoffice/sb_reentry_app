import { Button, Paper, Typography } from '@mui/material'
import NextLink from 'next/link'
import useLanguage from '../../../hooks/useLanguage'
import type { CopyHolder } from '../../../types/'
import { Paragraph } from '../../../ui'
import styles from './FreshStartHowToApply.module.css'

interface Location {
  href: string
  name_english: string
  name_spanish: string
}

const locations: Location[] = [
  {
    href: 'https://www.google.com/maps/place/1100+Anacapa+St,+Santa+Barbara,+CA+93101/@34.4242013,-119.7045169,17z/',
    name_english: 'Our Santa Barbara Location',
    name_spanish: 'Nuestra ubicación en Santa Bárbara',
  },
  {
    href: 'https://www.google.com/maps/place/312+E+Cook+St,+Santa+Maria,+CA+93454/@34.9492102,-120.434486,17z/',
    name_english: 'Our Santa Maria Location',
    name_spanish: 'Nuestra ubicación en Santa María',
  },
  {
    href: 'https://www.google.com/maps/place/115+Civic+Center+Plaza,+Lompoc,+CA+93436/@34.637649,-120.4553627,17z/',
    name_english: 'Our Lompoc Location',
    name_spanish: 'Nuestra ubicación en Lompoc',
  },
]

const copy: CopyHolder = {
  english: {
    pageTitle: 'Fresh Start',
    fill: "Fill out one easy form and you'll be connected to the Santa Barbara Public Defender's Office to help with your petitions for record clearance",
    login: 'Login',
    freshStart: ' and apply for Fresh Start through the web portal',
    howApply: 'How do I apply?',
    call: "Call the Public Defender's Office at ",
    download: 'Download ',
    intake: 'Intake',
    and: ' and ',
    finance: 'Financial Declaration',
    forms: ' Fill them out and email them to ',
    fax: ', fax them to (805) 568-3564, ',
    drop: 'or drop them off at:',
    recognize:
      'We recognize that different options work for different people. With this is mind, we have multiple ways to apply for record expungement',
    financialForm: '/documents/expungementintakeform',
    instruction: 'Instructions on how to apply',
    instructionref: '/documents/expungementquickstartguide',
  },
  spanish: {
    pageTitle: 'Nuevo Comienzo',
    fill: 'Complete un formulario fácil y se conectara con la Oficina del Defensor Publico de Santa Barbara para ayudarlo con sus peticiones de autorización de registros.',
    login: 'Inicie sesión',
    freshStart: ' y solicite Nuevo Comienzo a través del portal web',
    howApply: '¿Cómo me inscribo?',
    call: 'Llame a la Oficina del Defensor Publico al ',
    download: 'Descarga los formularios de ',
    intake: 'admisión',
    and: ' y ',
    finance: 'declaración financiera',
    forms: 'Complétalos y envíalos por correo electrónico a ',
    fax: ', enviar por fax (805) 614-6735 ',
    drop: 'o dejarlos en:',
    recognize:
      'Reconocemos que diferentes opciones funcionan para diferentes personas. Teniendo esto en cuenta, tenemos varias formas de solicitar la eliminación de antecedentes penales.',
    financialForm: '/documents/expungementintakeformSpanish',
    instruction: 'Instrucciones sobre cómo aplicar',
    instructionref: '/documents/expungementquickstartguideSpanish',
  },
}

const FreshStartHowToApply = () => {
  const { language } = useLanguage()
  const {
    pageTitle,
    login,
    call,
    freshStart,
    download,
    recognize,
    howApply,
    intake,
    and,
    finance,
    forms,
    fax,
    drop,
    financialForm,
    instruction,
    instructionref,
  } = copy[language]
  return (
    <div className={styles.HowToApply}>
      <Paragraph size="large-text">{howApply}</Paragraph>
      <br />
      <Paragraph size="med-text">{recognize}</Paragraph>
      <div className={styles.Cards}>
        <Paper className={styles.Card} elevation={3}>
          <Typography variant="h5">{login + freshStart}</Typography>
          <NextLink href="/login">
            <Button
              className={styles.ApplyButton}
              variant="contained"
              size="large"
            >
              {pageTitle + ' ' + login}
            </Button>
          </NextLink>
          <NextLink href={instructionref}>
            <Button
              className={styles.ApplyButton}
              variant="contained"
              size="large"
            >
              {instruction}
            </Button>
          </NextLink>
        </Paper>
        <Paper className={styles.Card} elevation={3}>
          <Typography variant="h5">{download + intake}</Typography>
          <NextLink href={financialForm}>
            <Button
              className={styles.ApplyButton}
              variant="contained"
              size="large"
            >
              {intake}
            </Button>
          </NextLink>
        </Paper>
        <Paper className={styles.Card} elevation={3}>
          <Typography variant="h5">
            {call}
            <br />
            <br />
            Santa Barbara
            <br />
            <a href="tel:8055683470">(805) 568-3470</a>
            <br />
            <br />
            Santa Maria & Lompoc
            <br />
            <a href="tel:8053467500">(805) 346-7500</a>
          </Typography>
        </Paper>
      </div>
      <Paragraph size="med-text">
        {forms}
        <a href="mailto:pubdefpcu@countyofsb.org" target="_blank">
          pubdefpcu@countyofsb.org
        </a>
        {fax + drop}
      </Paragraph>
      <br />
      <Paragraph size="med-text" className={styles.ListItem}>
        <ul>
          {locations.map(loc => {
            const { href } = loc

            return (
              <li key={href} className={styles.ListItem}>
                <a href={href} target="_blank">
                  {loc[`name_${language}`]}
                </a>
              </li>
            )
          })}
        </ul>
      </Paragraph>
    </div>
  )
}

export default FreshStartHowToApply
