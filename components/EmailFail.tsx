import { useRouter } from 'next/router'
import { CopyHolder } from '../types'
import { useStyles } from '../constants'
import { useLanguage } from '../hooks'
import { Button } from '@mui/material'
export const copy: CopyHolder = {
  english: {
    wentWrong: `Something went wrong while trying to verify your email.`,
    backToSignup: 'Back to Sign-up',
  },
  spanish: {
    wentWrong: `Se produjo un error al intentar verificar su correo electrónico.`,
    backToSignup: 'Volver a Registrarse',
  },
}
const EmailFail = () => {
  const { push } = useRouter()
  const { language } = useLanguage()
  const classes = useStyles()
  const { wentWrong, backToSignup } = copy[language]

  return (
    <div className={classes.root}>
      <h1>Uh oh...</h1>
      <p className={classes.fontSize}>{wentWrong}</p>
      <Button className={classes.greenButton} onClick={() => push('/signup')}>
        <h3 style={{ padding: '2rem' }}>{backToSignup}</h3>
      </Button>
    </div>
  )
}
export default EmailFail
