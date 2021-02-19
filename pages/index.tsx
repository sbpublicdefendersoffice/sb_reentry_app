import { ReactElement, Fragment } from 'react'

import routes, { RouteInfo } from '../constants/routes'
import { PwaDownload } from '../components'
import useLanguage from '../hooks/useLanguage'

import { IconTile, WrapContainer } from '../ui'

const Home = () => {
  const { language } = useLanguage()

  const PageLinks: ReactElement[] = routes.map((link: RouteInfo, i: number) => {
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
    <>
      <WrapContainer width="90%">{PageLinks}</WrapContainer>
      <PwaDownload />
    </>
  )
}

export default Home
