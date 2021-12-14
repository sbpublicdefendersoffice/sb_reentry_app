import NextLink from 'next/link'

import type { ReactNode } from 'react'
import type { CopyHolder } from '../types'

import useLanguage from '../hooks/useLanguage'
import { Paragraph, CallToAction } from '../ui'

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
    apply: 'How do I apply?',
    recognize:
      'We recognize that different options work for different people. With this is mind, we have multiple ways to apply for record expungement',
    can: 'We encourage you to:',
    login: 'Login',
    freshStart: ' and apply for Fresh Start through the web portal',
    call: "Call the Public Defender's Office at ",
    download: 'Download the ',
    intake: 'Intake',
    and: ' and ',
    finance: 'Financial Declaration',
    forms: ' forms, fill them out and email them to Amanda Paison at ',
    fax: ' fax them to (805) 568-3564, ',
    drop: 'or drop them off at:',
  },
  spanish: {
    apply: '¿Cómo me inscribo?',
    recognize:
      'Reconocemos que diferentes opciones funcionan para diferentes personas. Teniendo esto en cuenta, tenemos varias formas de solicitar la eliminación de antecedentes penales.',
    can: 'Lo alentamos a:',
    login: 'Acceso',
    freshStart: ' sesión y solicite Fresh Start a través del portal web',
    call: 'Llame a la Oficina del Defensor Público al ',
    download: 'Descargue los formularios de ',
    intake: 'Admisión',
    and: ' y ',
    finance: 'Declaración Financiera',
    forms: ', complételos y envíelos por correo electrónico a Amanda Paison a ',
    fax: ' envíelos por fax al (805) 568-3564 ',
    drop: 'o déjelos en:',
  },
}

import styles from './FreshStartHowToApply.module.css'

const FreshStartHowToApply = () => {
  const { language } = useLanguage()

  const {
    apply,
    recognize,
    can,
    login,
    freshStart,
    call,
    download,
    intake,
    and,
    finance,
    forms,
    fax,
    drop,
  } = copy[language]

  const waysToApply: ReactNode[] = [
    <>
      <NextLink href="/login">{login}</NextLink>
      {freshStart}
    </>,
    <>
      {call}
      <a href="tel:8055683470">(805) 568-3470</a>
    </>,
    <>
      {download}
      <NextLink href="/documents/expungementintakeform">{intake}</NextLink>
      {and}
      <NextLink href="/documents/expungementfinanceform">{finance}</NextLink>
      {forms}
      <a href="mailto:apaison@countyofsb.org" target="_blank">
        apaison@countyofsb.org
      </a>
      ,
      <br />
      {fax}
      {drop}
      <ul>
        {locations.map(loc => {
          const { href } = loc

          return (
            <li className={styles.ListItem}>
              <a href={href} target="_blank">
                {loc[`name_${language}`]}
              </a>
            </li>
          )
        })}
      </ul>
    </>,
  ]

  return (
    <CallToAction blueBg>
      <div className={styles.FreshStartCantLogin}>
        <div>
          <Paragraph size="heading-text" className={styles.Heading}>
            {apply}
          </Paragraph>
          <Paragraph size="med-text" className={styles.Paragraph}>
            {recognize}
          </Paragraph>
        </div>
        <div className={styles.ToApply}>
          <Paragraph size="heading-text" style={{ fontWeight: 'bold' }}>
            {can}
          </Paragraph>
          {waysToApply.map(node => (
            <Paragraph size="med-text" className={styles.ListItem}>
              {node}
            </Paragraph>
          ))}
        </div>
      </div>
    </CallToAction>
  )
}

export default FreshStartHowToApply
