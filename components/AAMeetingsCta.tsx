import { ReactNode } from 'react'

import { Title, Paragraph, CallToAction } from '../ui'
import useLanguage from '../hooks/useLanguage'
import { CopyHolder } from '../types/language'

import styles from './AAMeetingsCta.module.css'

export const copy: CopyHolder = {
  english: {
    title: 'Santa Barbara County AA Meetings',
    southCounty: 'South County Meeting Resources',
    northCounty: 'North County Meeting Resources',
    southSite: 'Santa Barbara AA Home',
    southMeetings: 'Santa Barbara AA Meetings',
    northSite: 'AA District 52 Home',
    northMeetings: 'North SB County AA Meetings',
  },
  spanish: {
    title: 'Reuniones de AA del condado de Santa Bárbara',
    southCounty: 'Recursos para reuniones del sur del condado',
    northCounty: 'Recursos para reuniones del norte del condado',
    southSite: 'Santa Barbara AA Home',
    southMeetings: 'Reuniones de AA de Santa Bárbara',
    northSite: 'AA District 52 Home',
    northMeetings: 'Reuniones de AA del norte del condado de SB',
  },
}

export const hrefs = {
  southHome: 'https://santabarbaraaa.com/',
  southMeeting: 'https://zoom.santabarbaraaa.com/',
  northHome: 'http://www.aa52centraloffice.org/wp/',
  northMeeting: 'http://www.aa52centraloffice.org/wp/meetings/',
}
export const linkProps = { target: '_blank', rel: 'noopener noreferrer' }

const link = (href: string, text: string): ReactNode => (
  <a role="link" className={styles.Links} href={href} {...linkProps}>
    {text}
  </a>
)

const AAMeetingsCta = () => {
  const { language } = useLanguage()
  const {
    title,
    southCounty,
    northCounty,
    southSite,
    southMeetings,
    northSite,
    northMeetings,
  } = copy[language]

  return (
    <CallToAction role="region" blueBg>
      <Title role="heading" className={styles.Title}>
        {title}
      </Title>
      <div role="list" className={styles.MeetingsInfo}>
        <div role="listitem" className={styles.Info}>
          <Paragraph role="article" className={styles.Heading} size="med-text">
            {southCounty}
          </Paragraph>
          {link(hrefs.southHome, southSite)}
          {link(hrefs.southMeeting, southMeetings)}
        </div>
        <div role="listitem" className={styles.Info}>
          <Paragraph role="article" className={styles.Heading} size="med-text">
            {northCounty}
          </Paragraph>
          {link(hrefs.northHome, northSite)}
          {link(hrefs.northMeeting, northMeetings)}
        </div>
      </div>
    </CallToAction>
  )
}

export default AAMeetingsCta
