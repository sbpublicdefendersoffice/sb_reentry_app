import type { CopyHolder } from '../types/'
import type { FreshStartLandingPageProps } from '../pages/freshstart'
import { useRouter } from 'next/router'

import useLanguage from '../hooks/useLanguage'
import { Paragraph, Button } from '../ui'
import { useLoginStatus } from '../hooks'

const copy: CopyHolder = {
  english: {
    notLoggedIn: 'You are not logged in',
    notVerified: 'You have not verified your email address',
    verifiedNotApplied: 'You are able to register for expungment!',
    applied: 'You have applied for expungement',
    apply: 'Apply',
  },
  spanish: {
    notLoggedIn: 'Usted no se ha identificado',
    notVerified: 'No ha verificado su dirección de correo electrónico',
    verifiedNotApplied: '¡Puede registrarse para la eliminación!',
    applied: 'Ha solicitado la eliminación de antecedentes penales',
    apply: 'Solicitar',
  },
}

import styles from './FreshStartApplyTag.module.css'

const FreshStartApplyTag = ({
  isLoggedIn,
  hasAppliedForExpungement,
  isVerified,
}: FreshStartLandingPageProps) => {
  const { push } = useRouter()
  const { language } = useLanguage()

  const { notLoggedIn, notVerified, verifiedNotApplied, applied, apply } =
    copy[language]

  const { setIsLoggedIn } = useLoginStatus()
  const logOut = async (): Promise<void> => {
    const loggingOut: Response = await fetch('/api/logout')
    const logoutMessage = await loggingOut.json()
    if (logoutMessage.error) console.error(logoutMessage.error)
    else {
      setIsLoggedIn(false)
      push('/login')
    }
  }

  return (
    <div className={styles.FreshStartApplyTag}>
      <Paragraph color="light" className={styles.Tagline}>
        {!isLoggedIn
          ? notLoggedIn
          : !isVerified
          ? notVerified
          : isVerified && hasAppliedForExpungement
          ? applied
          : verifiedNotApplied}
      </Paragraph>
      <div className={styles.ButtonHolder}>
        {isLoggedIn && isVerified && !hasAppliedForExpungement && (
          <Button
            className={styles.Buttons}
            onClick={() => push('/freshstart/apply')}
          >
            {apply}
          </Button>
        )}
        {isLoggedIn && (
          <Button className={styles.Buttons} onClick={logOut}>
            Logout
          </Button>
        )}
      </div>
    </div>
  )
}

export default FreshStartApplyTag
