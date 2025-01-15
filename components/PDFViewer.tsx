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
    <object
      data={pdfReady}
      type="application/pdf"
      width={windowSize.width}
      height={windowSize.height}
    >
      <p>
        We are unable to display this file on your browser. Instead you can{' '}
        <a href={pdfReady} download>
          click here to download the file.
        </a>
      </p>
      <br></br>
      <p>
        {' '}
        No podemos mostrar este archivo en su navegador. En su lugar, puede{' '}
        <a href={pdfReady} download>
          hacer clic aquí para descargar el archivo.
        </a>
      </p>
    </object>
  )
}

export default PDFViewer
