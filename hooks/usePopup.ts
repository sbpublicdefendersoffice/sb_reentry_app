import { useState, MouseEvent } from 'react'

import { PopupInfo } from '../types/maps'

const usePopup = () => {
  const [popupLocation, setPopup] = useState<PopupInfo | null>(null)

  const setPopupLocation = ({ clientX, clientY }: MouseEvent): void =>
    setPopup({ clientX, clientY })

  const clearPopupLocation = (): void => setPopup(null)

  return { popupLocation, setPopupLocation, clearPopupLocation }
}

export default usePopup
