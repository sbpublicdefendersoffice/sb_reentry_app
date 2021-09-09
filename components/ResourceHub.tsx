import { ReactElement } from 'react'
import NextLink from 'next/link'

import { resourceRoutes } from '../constants/routes'
import { RouteInfo, CopyHolder } from '../types'
import useLanguage from '../hooks/useLanguage'

import { Title, Paragraph } from '../ui'
import styles from './ResourceHub.module.css'

export const copy: CopyHolder = {
  english: {
    hub: 'Search for Resources',
    direction: 'Click a button to find resources about that topic',
  },
  spanish: {
    hub: 'Búsqueda de recursos',
    direction: 'Haga clic en un botón para buscar recursos sobre ese tema',
  },
}

const ResourceHub = () => {
  const { language } = useLanguage()
  const activeCopy = copy[language]

  const PageTiles: ReactElement[] = resourceRoutes.map(
    (link: RouteInfo, i: number) => {
      const { route, imgPath } = link
      const title: string = link[`title_${language}`]

      return (
        <div key={i} className={styles.singleTileHolder}>
          <NextLink href={route}>
            <a className={`${styles.link} not-text-link`}>
              <div className={styles.imgBg}>
                <img
                  loading="lazy"
                  role="img"
                  width="10rem"
                  height="10rem"
                  className={styles.image}
                  src={imgPath}
                  alt={`${title}_icon`}
                />
              </div>
              <Paragraph className={styles.categoryTitle} role="note">
                {title}
              </Paragraph>
            </a>
          </NextLink>
        </div>
      )
    },
  )

  return (
    <section className={styles.ResourceHub} id="resourcehub">
      <Title role="heading">{activeCopy.hub}</Title>
      <Paragraph
        role="article"
        className={styles.text}
        color="primary"
        size="med-text"
      >
        {activeCopy.direction}
      </Paragraph>
      <div className={styles.tileContainer}>{PageTiles}</div>
    </section>
  )
}

export default ResourceHub
