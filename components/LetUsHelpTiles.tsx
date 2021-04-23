import { ReactElement } from 'react'
import NextLink from 'next/link'

import { letUsHelpRoutes } from '../constants/routes'
import { CopyHolder, RouteInfo } from '../types/'
import useLanguage from '../hooks/useLanguage'
import { Paragraph } from '../ui'

import styles from './LetUsHelpTiles.module.css'

const copy: CopyHolder = {
  english: {
    publicDefender: 'Public Defender Resources',
    court: 'Prepare for Court',
    reentry: 'Re-entry Assistance',
  },
  spanish: {
    publicDefender: 'Recursos para defensores públicos',
    court: 'Prepárate para la corte',
    reentry: 'Asistencia de reingreso',
  },
}

const LetUsHelpTiles = () => {
  const { language } = useLanguage()
  const activeCopy = copy[language]

  const tiles: ReactElement[] = letUsHelpRoutes.map(
    (link: RouteInfo, i: number) => {
      const title = link[`title_${language}`]
      const { imgPath, route } = link

      return (
        <NextLink href={route} key={i}>
          <div className={styles.Tile}>
            <img className={styles.Image} src={imgPath} />
            <Paragraph size="med-text">{title}</Paragraph>
          </div>
        </NextLink>
      )
    },
  )

  return (
    <div className={styles.LetUsHelpTiles}>
      <Paragraph size="heading-text">{activeCopy.publicDefender}</Paragraph>
      <div className={styles.TileRow}>{tiles.slice(0, 3)}</div>
      <Paragraph size="heading-text">{activeCopy.court}</Paragraph>
      <div className={styles.TileRow}>{tiles.slice(3, 6)}</div>
      <Paragraph size="heading-text">{activeCopy.reentry}</Paragraph>
      <div className={styles.TileRow}>{tiles.slice(6)}</div>
    </div>
  )
}

export default LetUsHelpTiles
