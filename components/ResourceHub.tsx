import NextLink from 'next/link'

import routes, { RouteInfo } from '../constants/routes'
import useLanguage from '../hooks/useLanguage'
import { CopyHolder } from '../types/language'

import { Title, Paragraph } from '../ui'
import styles from './ResourceHub.module.css'

const copy: CopyHolder = {
  english: {
    hub: 'Resource Hub',
    direction: 'Click on an image to seek support',
  },
  spanish: {
    hub: 'Centro de Recursos',
    direction: 'Haga clic en una imagen para buscar apoyo',
  },
}

const ResourceHub = () => {
  const { language } = useLanguage()
  const activeCopy = copy[language]

  const PageTiles = routes.map((link: RouteInfo, i: number) => {
    const { route, imgPath } = link
    const title: string = link[`title_${language}`]

    return (
      <div key={i} className={styles.singleTileHolder}>
        <NextLink href={route}>
          <a className={`${styles.link} not-text-link`}>
            <img
              width="15rem"
              height="15rem"
              className={styles.image}
              src={imgPath}
              alt={`${title}_icon`}
            />
            <Paragraph size="med-text">{title}</Paragraph>
          </a>
        </NextLink>
      </div>
    )
  })

  return (
    <section className={styles.ResourceHub}>
      <Title>{activeCopy.hub}</Title>
      <Paragraph color="deselected" className={styles.text}>
        {activeCopy.direction}
      </Paragraph>
      <div className={styles.tileContainer}>{PageTiles}</div>
    </section>
  )
}

export default ResourceHub
