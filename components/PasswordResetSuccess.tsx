import { useRouter } from 'next/router'
import { useStyles } from '../constants'
import { Button } from '@mui/material'
import { CopyHolder } from '../types'

import { useLanguage } from '../hooks'
export const copy: CopyHolder = {
  english: {
    success: `Success!`,
    passwordReset:
      'Your password has been reset, now please log in with your new password',
    buttonText: `Log in`,
  },
  spanish: {
    success: `¡Éxito!`,
    passwordReset:
      'Su contraseña ha sido restablecida, ahora inicie sesión con su nueva contraseña',
    buttonText: `Iniciar sesión`,
  },
}
const PasswordResetSuccess = () => {
  const { push } = useRouter()
  const classes = useStyles()
  const { language } = useLanguage()
  const { success, passwordReset, buttonText } = copy[language]

  return (
    <div className={classes.root}>
      <h1>{success}</h1>
      <p className={classes.fontSize} style={{ margin: '2rem' }}>
        {passwordReset}
      </p>
      <Button className={classes.greenButton} onClick={() => push('/login')}>
        <h3 style={{ padding: '1rem' }}> {buttonText}</h3>
      </Button>
    </div>
  )
}
export default PasswordResetSuccess
