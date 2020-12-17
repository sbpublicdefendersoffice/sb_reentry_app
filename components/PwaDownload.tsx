import { useState, useEffect } from 'react'

import { Button } from '../ui'

interface BeforeInstallPromptEvent extends Event {
  readonly platforms: string[]
  readonly userChoice: Promise<{
    outcome: 'accepted' | 'dismissed'
    platform: string
  }>
  prompt(): Promise<void>
}

const PwaDownload = () => {
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
      {downloadEvent && (
        <Button onClick={(): Promise<void> => downloadEvent.prompt()}>
          Download Santa Barbara Reentry
        </Button>
      )}
    </>
  )
}

export default PwaDownload
