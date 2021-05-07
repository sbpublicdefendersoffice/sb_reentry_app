import { useState, useEffect } from 'react'

import useResizeEvent from '../hooks/useResizeEvent'
import { WindowSize } from '../types/ui'

interface PDFViewerProps {
  src: string
}

import styles from './PDFViewer.module.css'

const PDFViewer = ({ src }: PDFViewerProps) => {
  const [pdfReady, setPdfReady] = useState<string | null>(null)
  const [windowSize, setWindowSize] = useState<WindowSize>({
    width: innerWidth,
    height: innerHeight,
  })

  useResizeEvent(() =>
    setWindowSize({
      width: innerWidth,
      height: innerHeight,
    }),
  )

  useEffect((): void => {
    import(`../documents/${src}`).then(pdf => setPdfReady(pdf.default))
  }, [])

  return (
    <embed
      className={styles.PDFViewer}
      type="application/pdf"
      src={pdfReady}
      width={windowSize.width}
      height={windowSize.height}
    />
  )
}

export default PDFViewer
