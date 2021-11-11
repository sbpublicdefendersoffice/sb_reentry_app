import { Email } from '@mui/icons-material'
import { useRouter } from 'next/router'
import { Button } from '@mui/material'
import { useStyles } from '../constants'
import { CopyHolder } from '../types'
import { useLanguage } from '../hooks'
export const copy: CopyHolder = {
  english: {
    wentWrong: `Something went wrong while trying to reset your password.`,
    backButtonText: 'Back to Log in',
  },
  spanish: {
    wentWrong: `Se produjo un error al intentar restablecer su contraseña.`,
    backButtonText: 'Atrás para iniciar sesión',
  },
}
const PasswordResetFail = () => {
  const { push } = useRouter()
  const classes = useStyles()
  const { language } = useLanguage()
  const { wentWrong, backButtonText } = copy[language]

  return (
    <div className={classes.root}>
      <h1>Uh oh...</h1>
      <p className={classes.fontSize} style={{ margin: '1rem' }}>
        {wentWrong}
      </p>
      <Button className={classes.greenButton} onClick={() => push('/login')}>
        <h3 style={{ padding: '1rem' }}>{backButtonText}</h3>
      </Button>
    </div>
  )
}
export default PasswordResetFail
