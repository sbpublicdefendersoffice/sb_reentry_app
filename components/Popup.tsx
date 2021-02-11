import { ReactNode } from 'react'

import { PopupInfo } from '../types/maps'

import styles from './Popup.module.css'

interface PopupProps extends PopupInfo {
  children: ReactNode
}

const Popup = ({ children, clientX, clientY }: PopupProps) => (
  <aside
    style={{ left: `${clientX + 10}px`, top: `${clientY + 10}px` }}
    className={styles.Popup}
  >
    {children}
  </aside>
)

export default Popup
