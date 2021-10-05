import { useEffect, useState } from 'react'

import { LeafLoader } from '../components'
import { useLanguage } from '../hooks/'
import { CopyHolder } from '../types/'
import { Paragraph } from '../ui'

import styles from './Newsfeed.module.css'

const copy: CopyHolder = {
  english: {
    news: 'Latest Events',
    what: 'What',
    where: 'Where',
    when: 'When',
  },
  spanish: {
    news: 'Últimos acontecimientos',
    what: 'Qué',
    where: 'Dónde',
    when: 'Cuando',
  },
}

interface EventNotificationSchema {
  name_english: string
  name_spanish: string
  location_english: string
  location_spanish: string
  time: string
}

const sampleEvents: EventNotificationSchema[] = [
  {
    name_english: 'Meals for seniors',
    name_spanish: 'Comidas para personas mayores',
    location_english: 'Community Center',
    location_spanish: 'Centro Comunitario',
    time: '5pm',
  },
  {
    name_english: 'Breakfast at the Park',
    name_spanish: 'Desayuno en el Parque',
    location_english: 'The Park',
    location_spanish: 'El parque',
    time: '10am',
  },
  {
    name_english: '10 beds available',
    name_spanish: '10 camas disponibles',
    location_english: 'The Shelter',
    location_spanish: 'El refugio',
    time: '7pm',
  },
  {
    name_english: 'Meals for seniors',
    name_spanish: 'Comidas para personas mayores',
    location_english: 'Community Center',
    location_spanish: 'Centro Comunitario',
    time: '5pm',
  },
  {
    name_english: 'Breakfast at the Park',
    name_spanish: 'Desayuno en el Parque',
    location_english: 'The Park',
    location_spanish: 'El parque',
    time: '10am',
  },
  {
    name_english: '10 beds available',
    name_spanish: '10 camas disponibles',
    location_english: 'The Shelter',
    location_spanish: 'El refugio',
    time: '7pm',
  },
]

// event schema: name, description, location, time, display until, recurring?, contact phone, email, website
// to show for newsfeed: name, location, time
// probably could tie these to analytics too

const Newsfeed = () => {
  const { language } = useLanguage()
  const { news, what, where, when } = copy[language]
  const [events, setEvents] = useState<EventNotificationSchema[] | null>(null)

  useEffect(() => {
    setEvents(sampleEvents) // set events after fetching them from the database
  }, [])

  if (!events) return <LeafLoader />
  else
    return (
      <section className={styles.Newsfeed}>
        <Paragraph color="highlight" size="med-text" className={styles.Latest}>
          {news}
        </Paragraph>
        <ul className={styles.List}>
          {events.map((ev: EventNotificationSchema, i: number) => {
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
          })}
        </ul>
      </section>
    )
}

export default Newsfeed
