import { ReactElement, Fragment } from 'react'
import Head from 'next/head'

import routes, { RouteInfo } from '../constants/routes'
import { PwaTags, PwaDownload } from '../components'
import { IconTile, WrapContainer } from '../ui'

const PageLinks: ReactElement[] = routes.map((link: RouteInfo, i: number) => {
  const { route, title, imgPath } = link
  return (
    <Fragment key={i}>
      <IconTile href={route} label={title} path={imgPath}>
        {title}
      </IconTile>
    </Fragment>
  )
})

const Home = () => (
  <>
    <PwaTags />
    <Head>
      <title>Santa Barbara Reentry</title>
    </Head>
    <WrapContainer width="90%">{PageLinks}</WrapContainer>
    <PwaDownload />
  </>
)

export default Home
