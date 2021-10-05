import { useLanguage } from '../hooks/'
import { CopyHolder } from '../types/language'
import { Paragraph } from '../ui'

import styles from './Newsfeed.module.css'

const copy: CopyHolder = {
  english: {
    news: 'Latest News',
  },
  spanish: {
    news: 'Últimas noticias',
  },
}

// event schema:category, name, description, location, time, display until, recurring?, contact phone, email, website
// to show for newsfeed:category, name, location, time
// probably could tie these to analytics too

const Newsfeed = () => {
  const { language } = useLanguage()
  const { news } = copy[language]

  return (
    <section className={styles.Newsfeed}>
      <Paragraph color="highlight" size="med-text" className={styles.Latest}>
        {news}
      </Paragraph>
      <ul className={styles.List}>
        <li>cool event</li>
        <li>cool event</li>
        <li>cool event</li>
        <li>cool event</li>
        <li>cool event</li>
        <li>cool event</li>
        <li>cool event</li>
        <li>cool event</li>
        <li>cool event</li>
        <li>cool event</li>
        <li>cool event</li>
        <li>cool event</li>
        <li>cool event</li>
        <li>cool event</li>
        <li>cool event</li>
        <li>cool event</li>
        <li>cool event</li>
        <li>cool event</li>
        <li>cool event</li>
        <li>cool event</li>
        <li>cool event</li>
        <li>cool event</li>
        <li>cool event</li>
        <li>cool event</li>
        <li>cool event</li>
        <li>cool event</li>
        <li>cool event</li>
        <li>cool event</li>
        <li>cool event</li>
        <li>cool event</li>
        <li>cool event</li>
        <li>cool event</li>
        <li>cool event</li>
        <li>cool event</li>
        <li>cool event</li>
        <li>cool event</li>
        <li>cool event</li>
        <li>cool event</li>
        <li>cool event</li>
        <li>cool event</li>
        <li>cool event</li>
        <li>cool event</li>
        <li>cool event</li>
        <li>cool event</li>
        <li>cool event</li>
        <li>cool event</li>
        <li>cool event</li>
        <li>cool event</li>
        <li>cool event</li>
        <li>cool event</li>
        <li>cool event</li>
        <li>cool event</li>
        <li>cool event</li>
        <li>cool event</li>
        <li>cool event</li>
        <li>cool event</li>
        <li>cool event</li>
        <li>cool event</li>
        <li>cool event</li>
        <li>cool event</li>
      </ul>
    </section>
  )
}

export default Newsfeed
