import { ReactElement, Fragment } from 'react'

import routes, { RouteInfo } from '../constants/routes'
import useLanguage from '../hooks/useLanguage'

import { IconTile } from '../ui'

import styles from './ResourceHub.module.css'

const ResourceHub = () => {
  const { language } = useLanguage()

  const PageTiles: ReactElement[] = routes.map((link: RouteInfo, i: number) => {
    const { route, imgPath } = link
    const title: string = link[`title_${language}`]

    return (
      <Fragment key={i}>
        <IconTile href={route} label={title} path={imgPath}>
          {title}
        </IconTile>
      </Fragment>
    )
  })

  return (
    <section className={styles.ResourceHub}>
      <div className={styles.tiles}>{PageTiles}</div>
    </section>
  )
}

export default ResourceHub
