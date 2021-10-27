import { useRouter } from 'next/router'
import { useStyles } from '../constants'
import { Button } from '@mui/material/'
import { CopyHolder } from '../types'
import { useLanguage } from '../hooks'
export const copy: CopyHolder = {
  english: {
    successful: `Your email verification was successful`,
    willNotify: `You will be notified from our staff once your account is ready. Please allow 2-3 business days for our staff to reach out to you via the email address you provided. Once approved as an organization, you will have full access to update your organizations information on our dashboard.`,
    backHome: 'Back to home',
  },
  spanish: {
    successful: `Su verificación de correo electrónico fue exitosa`,
    willNotify: `Nuestro personal le notificará una vez que su cuenta esté lista. Por favor Permita de 2 a 3 días hábiles para que nuestro personal se comunique con usted por correo electrónico. dirección que proporcionó. Una vez aprobada como organización, tendrá acceso completo para actualizar la información de su organización en nuestro panel de control.`,
    backHome: 'De vuelta a casa',
  },
}
const EmailSuccess = () => {
  const { push } = useRouter()
  const classes = useStyles()
  const { language } = useLanguage()
  const { successful, willNotify, backHome } = copy[language]
  return (
    <div className={classes.root}>
      <h1 className={classes.h4Style}>{successful}</h1>
      <p className={classes.fontSize} style={{ marginBottom: '2rem' }}>
        {willNotify}
      </p>
      <Button className={classes.greenButton} onClick={() => push('/')}>
        <h3 style={{ padding: '1rem' }}> {backHome}</h3>
      </Button>
    </div>
  )
}
export default EmailSuccess
