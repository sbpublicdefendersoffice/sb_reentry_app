import { useState, FormEvent } from 'react'
import { useRouter } from 'next/router'
import { Button, TextField } from '@mui/material'
import { POST } from '../../helpers/'
import { useStyles } from '../../constants'
import { CopyHolder } from '../../types'
import { useLanguage } from '../../hooks'
export const copy: CopyHolder = {
  english: {
    successText: `Success`,
    checkEmail: 'Check your email for a reset link',
    forgotPwd: `Forgot Password`,
    enterEmail: `Enter your email and we'll send you a reset link`,
    someone: 'someone',
    sendReset: 'Send Reset Link',
    validEmail: 'Please enter a valid email address',
  },
  spanish: {
    successText: `Éxito`,
    checkEmail:
      'Verifique su correo electrónico para ver si hay un enlace de restablecimiento',
    forgotPwd: `Has olvidado tu contraseña`,
    enterEmail:
      'Ingrese su correo electrónico y le enviaremos un enlace de restablecimiento',
    someone: 'alguien',
    sendReset: 'Enviar enlace de reinicio',
    validEmail:
      'Por favor, introduce una dirección de correo electrónico válida',
  },
}
const ForgotPasswordPage = () => {
  const { push } = useRouter()
  const classes = useStyles()
  const { language } = useLanguage()
  const [email, setEmail] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const [success, setSuccess] = useState(false)
  const {
    successText,
    checkEmail,
    validEmail,
    forgotPwd,
    enterEmail,
    someone,
    sendReset,
  } = copy[language]
  const onSubmitClicked = async (
    e: FormEvent<HTMLFormElement>,
  ): Promise<void> => {
    e.preventDefault()
    try {
      const postUserToPostgres: Response = await fetch(
        `/api/postForgotPassword/`,
        {
          method: POST,
          body: email,
        },
      )
      await setSuccess(true)
      setTimeout(() => {
        push('/login')
      }, 3000)
    } catch (error) {
      setErrorMessage(error.errorMessage)
    }
  }
  return success ? (
    <div className={classes.root}>
      <h1>{successText}</h1>
      <p className={classes.fontSize} style={{ marginTop: '2rem' }}>
        {checkEmail}
      </p>
    </div>
  ) : (
    <div style={{ margin: 'auto', textAlign: 'center' }}>
      <form role="form" onSubmit={onSubmitClicked}>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
          }}
        >
          <h1>{forgotPwd}</h1>
          <p style={{ margin: '1rem' }}>{enterEmail} </p>
          {errorMessage && <div className="fail">{errorMessage}</div>}
          <TextField
            value={email}
            inputProps={{
              style: { fontSize: '1.6rem', marginBottom: '2rem' },
              pattern: '[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$',
            }}
            title={validEmail}
            onChange={e => setEmail(e.target.value)}
            placeholder={`${someone}@gmail.com`}
          />
          <Button
            // style={{
            //   textAlign: 'center',
            //   backgroundColor: '#04A868',
            //   color: 'white',

            //   marginBottom: '1rem',
            // }}
            className={classes.greenButton}
            disabled={!email}
            type="submit"
          >
            <h4 style={{ padding: '1rem' }}> {sendReset}</h4>
          </Button>
        </div>
      </form>
    </div>
  )
}
export default ForgotPasswordPage
