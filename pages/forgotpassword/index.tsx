import { useState } from 'react'
import { useRouter } from 'next/router'
import { Button, TextField } from '@mui/material'

import { useLanguage, useToast, useFormFields } from '../../hooks'
import { POST, validator } from '../../helpers/'
import { useStyles } from '../../constants'
import { CopyHolder } from '../../types'

export const copy: CopyHolder = {
  english: {
    successText: `Success`,
    checkEmail: 'Check your email for a reset link',
    forgotPwd: `Forgot Password`,
    enterEmail: `Enter your email and we'll send you a reset link`,
    someone: 'someone',
    sendReset: 'Send Reset Link',
    validEmail: 'Please enter a valid email address',
    doesNotExist: 'User does not exist in our system',
    emailSent: 'An email was sent to the email provided',
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
    userDoesNotExist: 'La usuario no existe en nuestro sistema',
    emailSent:
      'El correo electrónico se envió al correo electrónico proporcionado',
  },
}
const initState = {
  email: '',
}
const ForgotPasswordPage = () => {
  const { push } = useRouter()
  const classes = useStyles()
  const { setToast } = useToast()
  const { language } = useLanguage()
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
    doesNotExist,
    emailSent,
  } = copy[language]
  const submit = () => {}
  const { handleChange, handleBlur, state, errors, handleSubmit } =
    useFormFields({
      initState,
      callback: submit,
      validator,
    })
  let isValidForm =
    Object.values(errors).filter(error => typeof error !== 'undefined')
      .length === 0
  const { email } = state
  const onSubmitClicked = async e => {
    e.preventDefault()
    const postCBOToPostgres: Response = await fetch(
      `/api/postForgotPassword/`,
      {
        method: POST,
        body: email,
      },
    )
    const apiResponse = await postCBOToPostgres.json()

    if (apiResponse.message == 'error') {
      setToast(doesNotExist)
    } else {
      setSuccess(true)
      setTimeout(() => {
        push('/login')
      }, 3000)
      setToast(emailSent)

      state.email = ''
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
            name="email"
            onChange={handleChange}
            title={validEmail}
            placeholder={`${someone}@gmail.com`}
            //@ts-ignore
            error={errors.email ? true : false}
            //@ts-ignore
            helperText={errors.email ? validEmail : false}
            onBlur={handleBlur}
            style={{ marginBottom: '1.5rem' }}
          />
          <Button
            className={
              //@ts-ignore
              errors.email ? classes.disabledButton : classes.greenButton
            }
            disabled={!isValidForm}
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