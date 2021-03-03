import { ReactNode } from 'react'

import Popup from './Popup'
import { Paragraph } from '../ui'
import { usePopup } from '../hooks'

import styles from './Tooltip.module.css'

interface TooltipProps {
  children: ReactNode
}

const Tooltip = ({ children }: TooltipProps) => {
  const { popupLocation, setPopupLocation, clearPopupLocation } = usePopup()

  return (
    <>
      {popupLocation && children && (
        <Popup clientX={popupLocation.clientX} clientY={popupLocation.clientY}>
          {children}
        </Popup>
      )}
      <Paragraph
        size="heading-text"
        className={styles.Tooltip}
        // @ts-ignore
        onFocus={setPopupLocation}
        onMouseEnter={setPopupLocation}
        onMouseMove={setPopupLocation}
        onMouseLeave={clearPopupLocation}
        onBlur={clearPopupLocation}
      >
        ?
      </Paragraph>
    </>
  )
}

export default Tooltip
