import { ReactElement } from 'react'
import NextLink from 'next/link'

import { Title, Paragraph, CallToAction } from '../ui'
import { CopyHolder, InfoWithDescription } from '../types/'
import { topThreeRoutes } from '../constants/routes'
import useLanguage from '../hooks/useLanguage'

export const copy: CopyHolder = {
  english: {
    title: 'Top Three Helpful Resources',
    explain: 'Click to learn more about each option',
  },
  spanish: {
    title: 'Los tres principales recursos útiles',
    explain: 'Click to learn more about each option',
  },
}

import styles from './TopThreeCta.module.css'

const TopThreeCta = () => {
  const { language } = useLanguage()

  const { title, explain } = copy[language]

  const tiles: ReactElement[] = topThreeRoutes.map(
    (link: InfoWithDescription, i: number) => {
      const title = link[`title_${language}`]
      const text = link[`text_${language}`]
      const { imgPath, route } = link

      return (
        <NextLink href={route} key={i}>
          <div role="listitem" className={styles.Tile}>
            <img role="img" className={styles.Image} src={imgPath} />
            <Paragraph
              className={styles.TileTitle}
              role="article"
              size="med-text"
            >
              {title}
            </Paragraph>
            <Paragraph role="article">{text}</Paragraph>
          </div>
        </NextLink>
      )
    },
  )

  return (
    <CallToAction role="region" blueBg>
      <Title role="heading" className={styles.ComponentTitle}>
        {title}
      </Title>
      <Paragraph role="heading">{explain}</Paragraph>
      <div role="list" className={styles.TileHolder}>
        {tiles}
      </div>
    </CallToAction>
  )
}

export default TopThreeCta
