import {
  ReactNode,
  // useEffect,
  // useState
} from 'react'

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

//#region

// interface EventNotificationSchema {
//   name_english: string
//   name_spanish: string
//   location_english: string
//   location_spanish: string
//   time: string
// }

// const sampleEvents: EventNotificationSchema[] = [
//   {
//     name_english: 'Meals for seniors',
//     name_spanish: 'Comidas para personas mayores',
//     location_english: 'Community Center',
//     location_spanish: 'Centro Comunitario',
//     time: '5pm',
//   },
//   {
//     name_english: 'Breakfast at the Park',
//     name_spanish: 'Desayuno en el Parque',
//     location_english: 'The Park',
//     location_spanish: 'El parque',
//     time: '10am',
//   },
//   {
//     name_english: '10 beds available',
//     name_spanish: '10 camas disponibles',
//     location_english: 'The Shelter',
//     location_spanish: 'El refugio',
//     time: '7pm',
//   },
//   {
//     name_english: 'Meals for seniors',
//     name_spanish: 'Comidas para personas mayores',
//     location_english: 'Community Center',
//     location_spanish: 'Centro Comunitario',
//     time: '5pm',
//   },
//   {
//     name_english: 'Breakfast at the Park',
//     name_spanish: 'Desayuno en el Parque',
//     location_english: 'The Park',
//     location_spanish: 'El parque',
//     time: '10am',
//   },
//   {
//     name_english: '10 beds available',
//     name_spanish: '10 camas disponibles',
//     location_english: 'The Shelter',
//     location_spanish: 'El refugio',
//     time: '7pm',
//   },
// ]

// event schema: name, description, location, time, display until, recurring?, contact phone, email, website
// to show for newsfeed: name, location, time
// probably could tie these to analytics too

//#endregion

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

const formerlyIncarceratedResourceFair2021: EventSchema = {
  title_english: 'Formerly Incarcerated Student Day & Resource Fair',
  title_spanish:
    'Feria de recursos y día para estudiantes anteriormente encarcelados',
  date_english: 'Friday, November 12th, 2021',
  date_spanish: 'Viernes 12 de noviembre de 2021',
  icon: '/images/uscb-underground-scholars.png',
  time: '10 am - 2 pm',
  where: 'UCSB Student Resource Building',
  address: 'Ocean Rd, Santa Barbara, CA 93106',
  info_url:
    'https://www.eventbrite.com/e/formerly-incarcerated-student-day-resource-fair-tickets-178275696407',
  register:
    'https://www.eventbrite.com/e/formerly-incarcerated-student-day-resource-fair-tickets-178275696407',
}

const october17thInEpochTime: number = 1665557999000
const november13thInEpochTime: number = 1636790400000

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
  const {
    news,
    // what,
    // where,
    // when
  } = copy[language]
  // const [events, setEvents] = useState<EventNotificationSchema[] | null>(null)

  // useEffect(() => {
  //   setEvents(sampleEvents) // set events after fetching them from the database
  // }, [])

  // if (!events) return <LeafLoader />

  return (
    <section className={styles.Newsfeed}>
      <Paragraph color="highlight" size="med-text" className={styles.Latest}>
        {news}
      </Paragraph>
      <ul className={styles.List}>
        {Date.now() < october17thInEpochTime &&
          listEvent(veteransStandDown2021Info, language)}
        {Date.now() < november13thInEpochTime &&
          listEvent(formerlyIncarceratedResourceFair2021, language)}
        {/* {events.map((ev: EventNotificationSchema, i: number) => {
            const [name, location, time] = [
              ev[`name_${language}`],
              ev[`location_${language}`],
              ev.time,
            ]

            return (
              <li key={i} className={styles.Item}>
                <div className={styles.Cell}>
                  <Paragraph color="highlight" size="med-text">
                    {what}
                  </Paragraph>
                  <Paragraph color="dark" size="med-text">
                    {name}
                  </Paragraph>
                </div>
                <div className={styles.Cell}>
                  <Paragraph color="highlight" size="med-text">
                    {where}
                  </Paragraph>
                  <Paragraph color="dark" size="med-text">
                    {location}
                  </Paragraph>
                </div>
                <div className={styles.Cell}>
                  <Paragraph color="highlight" size="med-text">
                    {when}
                  </Paragraph>
                  <Paragraph color="dark" size="med-text">
                    {time}
                  </Paragraph>
                </div>
              </li>
            )
          })} */}
      </ul>
    </section>
  )
}

export default Newsfeed
