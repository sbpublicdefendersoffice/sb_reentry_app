import { useState, useEffect } from 'react'

import { Button } from '../ui'
import useLanguage from '../hooks/useLanguage'

interface BeforeInstallPromptEvent extends Event {
  readonly platforms: string[]
  readonly userChoice: Promise<{
    outcome: 'accepted' | 'dismissed'
    platform: string
  }>
  prompt(): Promise<void>
}

const PwaDownload = () => {
  const { language } = useLanguage()

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
          {language === 'english' ? 'Download' : 'Descarga'} Santa Barbara
          Reentry
        </Button>
      )}
    </>
  )
}

export default PwaDownload
