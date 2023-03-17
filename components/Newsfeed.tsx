import { ReactNode } from 'react'
import { useLanguage } from '../hooks/'
import { CopyHolder, Language } from '../types/'
import { Paragraph } from '../ui'

import styles from './Newsfeed.module.css'

const copy: CopyHolder = {
  english: {
    news: 'Upcoming Events',
    what: 'What',
    where: 'Where',
    when: 'When',
    info: 'More Information',
    reg: 'Register',
  },
  spanish: {
    news: 'Próximos Eventos',
    what: 'Qué',
    where: 'Dónde',
    when: 'Cuando',
    info: 'Más información',
    reg: 'Registrarse',
  },
}

// below dates will mostly likely be in epoch time when real back end data is involved
interface EventSchema {
  title_english: string
  title_spanish: string
  date_english?: string
  date_spanish?: string
  icon?: string
  time?: string
  where?: string
  address?: string
  info_url?: string
  register?: string
}

const veteransStandDown2021Info: EventSchema = {
  title_english: 'Santa Barbara County Veterans Stand Down 2022',
  title_spanish: 'Veteranos del condado de Santa Bárbara se retiran 2022',
  date_english: 'Saturday, October 15, 2022',
  date_spanish: 'Sábado, 16 de octubre de 2021',
  icon: '/images/2016-veterans-stand-down_2.png',
  time: '9 am - 1 pm',
  where: 'Santa Maria Fairpark',
  address: '937 S. Thornburg Street, Santa Maria, CA 93454',
  info_url:
    'http://www.sbcountystanddown.com/uploads/3/4/4/2/34425876/2022_stand_down_flyer__2_.pdf',
  register: 'http://www.sbcountystanddown.com/index.html',
}

const october15thInEpochTime: number = 1665557999000

const listEvent = (event: EventSchema, language: Language): ReactNode => {
  const [title, date] = [event[`title_${language}`], event[`date_${language}`]]
  const { icon, time, where, address, info_url, register } = event

  const { info, reg } = copy[language]

  return (
    <li className={styles.Item}>
      <img src={icon} className={styles.Image} />
      <div className={styles.Text}>
        <Paragraph color="highlight" size="med-text">
          {title}
        </Paragraph>
        <Paragraph>{date}</Paragraph>
        <Paragraph>{time}</Paragraph>
        <Paragraph>{where}</Paragraph>
        <Paragraph>{address}</Paragraph>
        <div className={styles.Links}>
          <a
            className={styles.Link}
            href={info_url}
            target="_blank"
            rel="noreferrer"
          >
            {info}
          </a>
          <a
            className={styles.Link}
            href={register}
            target="_blank"
            rel="noreferrer"
          >
            {reg}
          </a>
        </div>
      </div>
    </li>
  )
}

const Newsfeed = () => {
  const { language } = useLanguage()
  const { news } = copy[language]

  return (
    <section className={styles.Newsfeed}>
      <Paragraph color="highlight" size="med-text" className={styles.Latest}>
        {news}
      </Paragraph>
      <ul className={styles.List}>
        {Date.now() < october15thInEpochTime &&
          listEvent(veteransStandDown2021Info, language)}
      </ul>
    </section>
  )
}

export default Newsfeed
