import { useState, useEffect } from 'react'

import { WindowSize } from '../types/ui'

interface PDFViewerProps {
  src: string
}

import styles from './PDFViewer.module.css'

const PDFViewer = ({ src }: PDFViewerProps) => {
  const [windowSize, setWindowSize] = useState<WindowSize>({
    width: innerWidth,
    height: innerHeight,
  })

  useEffect((): (() => void) => {
    const resizePDF = (): void =>
      setWindowSize({
        width: innerWidth,
        height: innerHeight,
      })

    addEventListener('resize', resizePDF)

    return () => removeEventListener('resize', resizePDF)
  }, [])

  return (
    <embed
      className={styles.PDFViewer}
      type="application/pdf"
      src={require(`../documents/${src}`)}
      width={windowSize.width}
      height={windowSize.height}
    />
  )
}

export default PDFViewer
