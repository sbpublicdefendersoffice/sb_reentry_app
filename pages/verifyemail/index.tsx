import { useEffect } from 'react'
import { useStyles } from '../../constants'
import { useLanguage, useToast } from '../../hooks'
import { CopyHolder } from '../../types'
export const copy: CopyHolder = {
  english: {
    thanks: `Thanks for signing up`,
    verifyAccount: `Please verify your account by clicking on the link that was sent to the email address that you provided. Make sure to look in the spam folder if you do not see the email in your inbox.`,
  },
  spanish: {
    thanks: `Gracias por registrarte`,
    verifyAccount: `Verifique su cuenta haciendo clic en el enlace que se envió a la dirección de correo electrónico que proporcionó. Asegúrese de buscar en la carpeta de correo no deseado si no ve el correo electrónico en su bandeja de entrada. `,
  },
}
const VerifyEmailPage = () => {
  const classes = useStyles()
  const { language } = useLanguage()
  const { thanks, verifyAccount } = copy[language]
  return (
    <div className={classes.root}>
      <h1 style={{ marginBottom: '2rem' }}>{thanks}</h1>
      <p className={classes.fontSize}>{verifyAccount}</p>
    </div>
  )
}
export default VerifyEmailPage
