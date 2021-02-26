import { useState, useEffect } from 'react'

import { Button, Title } from '../ui'
import useLanguage from '../hooks/useLanguage'
import { CopyHolder } from '../types/language'

interface BeforeInstallPromptEvent extends Event {
  readonly platforms: string[]
  readonly userChoice: Promise<{
    outcome: 'accepted' | 'dismissed'
    platform: string
  }>
  prompt(): Promise<void>
}

import styles from './PwaDownload.module.css'

const copy: CopyHolder = {
  english: {
    title: 'Take Fresh Start with you!',
    instructions: 'Download the app to access our resources, wherever you are',
    download: 'Download Fresh Start',
  },
  spanish: {
    title: '¡Lleve Fresh Start con usted!',
    instructions:
      'Descarga la aplicación para acceder a nuestros recursos, estés donde estés',
    download: 'Descargar Nuevo Comienzo',
  },
}

const PwaDownload = () => {
  const { language } = useLanguage()
  const activeCopy = copy[language]

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
        <div className={styles.PwaDownload}>
          <Title>{activeCopy.title}</Title>
          <p className={styles.text}>{activeCopy.instructions}</p>
          <Button onClick={(): Promise<void> => downloadEvent.prompt()}>
            {activeCopy.download}
          </Button>
        </div>
      )}
    </>
  )
}

export default PwaDownload
