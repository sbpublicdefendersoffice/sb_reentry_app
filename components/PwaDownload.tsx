import { useState, useEffect } from 'react'

import { Button, Title, Paragraph, CallToAction } from '../ui'
import useLanguage from '../hooks/useLanguage'
import { siteTitle } from '../constants/copy'
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

export const copy: CopyHolder = {
  english: {
    title: `Take ${siteTitle} with you!`,
    instructions: 'Download the app to access our resources, wherever you are',
    download: `Download ${siteTitle}`,
  },
  spanish: {
    title: `¡Lleve ${siteTitle} con usted!`,
    instructions:
      'Descarga la aplicación para acceder a nuestros recursos, estés donde estés',
    download: `Descargar ${siteTitle}`,
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
        <CallToAction className={styles.PwaDownload}>
          <Title role="heading">{activeCopy.title}</Title>
          <Paragraph role="note" className={styles.Text}>
            {activeCopy.instructions}
          </Paragraph>
          <Button
            role="button"
            onClick={(): Promise<void> => downloadEvent.prompt()}
          >
            {activeCopy.download}
          </Button>
        </CallToAction>
      )}
    </>
  )
}

export default PwaDownload
