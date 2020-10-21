import { useState, useEffect, ReactElement } from 'react'
import Head from 'next/head'
import NextLink from 'next/link'

import routes, { RouteInfo } from '../constants/routes'
import { PwaTags, Header } from '../components'
import { Button, IconTile, PublicPage, WrapContainer } from '../ui'

export interface BeforeInstallPromptEvent extends Event {
  readonly platforms: string[]
  readonly userChoice: Promise<{
    outcome: 'accepted' | 'dismissed'
    platform: string
  }>
  prompt(): Promise<void>
}

const PageLinks: ReactElement[] = routes.map((link: RouteInfo, i: number) => {
  const { route, title, imgPath } = link
  return (
    <NextLink href={route} key={i}>
      <IconTile href={route} label={title} path={imgPath}>
        {title}
      </IconTile>
    </NextLink>
  )
})

const Home = () => {
  const [
    downloadEvent,
    setDownloadEvent,
  ] = useState<BeforeInstallPromptEvent | null>(null)

  useEffect(() => {
    const handleDownloadEvent = e => {
      e.preventDefault()
      setDownloadEvent(e)
    }
    addEventListener('beforeinstallprompt', handleDownloadEvent)

    return () => removeEventListener('beforeinstallprompt', handleDownloadEvent)
  }, [])

  return (
    <>
      <PwaTags />
      <Head>
        <title>Santa Barbara Reentry</title>
      </Head>
      <PublicPage>
        <Header />
        <WrapContainer width="90%">{PageLinks}</WrapContainer>
        {downloadEvent && (
          <Button onClickFunc={(): Promise<void> => downloadEvent.prompt()}>
            Download Santa Barbara Reentry
          </Button>
        )}
      </PublicPage>
    </>
  )
}

export default Home
