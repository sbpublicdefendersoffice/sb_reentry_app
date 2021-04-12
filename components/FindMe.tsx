import Popup from './Popup'
import Button from '../ui/Button'
import { useLanguage, useLocation, usePopup, useToast } from '../hooks'
import { CopyHolder } from '../types/language'
import { checkAndSetUserLocation } from '../helpers/location'

import styles from './FindMe.module.css'

export const copy: CopyHolder = {
  english: {
    popup: 'Locate me',
  },
  spanish: {
    popup: 'Ubicame',
  },
}

const FindMe = () => {
  const { setCoords } = useLocation()
  const { popupLocation, setPopupLocation, clearPopupLocation } = usePopup()
  const { language } = useLanguage()
  const { setToast } = useToast()

  const activeCopy = copy[language]

  return (
    <>
      {popupLocation && (
        <Popup clientX={popupLocation.clientX} clientY={popupLocation.clientY}>
          {activeCopy.popup}
        </Popup>
      )}
      <Button
        role="button"
        className={styles.FindMe}
        onMouseEnter={setPopupLocation}
        onMouseMove={setPopupLocation}
        onMouseLeave={clearPopupLocation}
        onClick={() => checkAndSetUserLocation(setCoords, setToast, language)}
      >
        <svg
          role="img"
          className={styles.Image}
          width="1.25rem"
          height="1.25rem"
          viewBox="0 0 24 24"
        >
          <path d="M20.94 11c-.46-4.17-3.77-7.48-7.94-7.94V1h-2v2.06C6.83 3.52 3.52 6.83 3.06 11H1v2h2.06c.46 4.17 3.77 7.48 7.94 7.94V23h2v-2.06c4.17-.46 7.48-3.77 7.94-7.94H23v-2h-2.06zM12 19c-3.87 0-7-3.13-7-7s3.13-7 7-7 7 3.13 7 7-3.13 7-7 7z" />
        </svg>
      </Button>
    </>
  )
}

export default FindMe
