import { useState, useEffect, ReactElement } from 'react'
import Head from 'next/head'

import routes, { RouteInfo } from '../constants/routes'
import { PwaTags } from '../components'
import { Button, IconTile, PublicPage, WrapContainer } from '../ui'

interface BeforeInstallPromptEvent extends Event {
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
    <IconTile key={i} href={route} label={title} path={imgPath}>
      {title}
    </IconTile>
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
      <WrapContainer width="90%">{PageLinks}</WrapContainer>
      {downloadEvent && (
        <Button onClick={(): Promise<void> => downloadEvent.prompt()}>
          Download Santa Barbara Reentry
        </Button>
      )}
    </>
  )
}

export default Home
