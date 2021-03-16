import { ReactNode, useEffect, useRef, useState, MutableRefObject } from 'react'

import { PopupInfo } from '../types/maps'
import styles from './Popup.module.css'

interface PopupProps extends PopupInfo {
  children: ReactNode
}

const Popup = ({ children, clientX, clientY }: PopupProps) => {
  const [calcXvalue, setCalcXvalue] = useState<number | null>(null)
  const ref: MutableRefObject<HTMLElement> | null = useRef(null)

  useEffect(() => {
    if (ref.current && clientX) {
      const { width } = ref.current.getClientRects()[0]
      const widerThenWindow: boolean = clientX + width > innerWidth
      if (widerThenWindow) setCalcXvalue(clientX - width)
      else setCalcXvalue(clientX)
    }
  }, [])

  return (
    <aside
      ref={ref}
      style={{ left: `${calcXvalue + 10}px`, top: `${clientY + 10}px` }}
      className={styles.Popup}
    >
      {children}
    </aside>
  )
}

export default Popup
