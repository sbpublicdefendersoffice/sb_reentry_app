import { useState } from 'react'
import { useRouter } from 'next/router'
import { Button, TextField } from '@mui/material'

import { useLanguage, useToast, useFormFields } from '../../hooks'
import { POST, validator } from '../../helpers/'
import { useStyles, siteTitle } from '../../constants'
import { CopyHolder } from '../../types'
import { HeadTags } from '../../components'
import { Input, Paragraph } from '../../ui'
import styles from './index.module.css'

export const copy: CopyHolder = {
  english: {
    successText: `Success`,
    checkEmail: 'Check your email for a reset link',
    forgotPwd: `Forgot Password`,
    enterEmail: `Enter your email and we'll send you a reset link`,
    someone: 'someone',
    sendReset: 'Send Reset Link',
    validEmail: 'Please enter a valid email address',
    unexpectedError:
      'We were unable to process your request. Please try again.',
    emailSent: 'If an account exists, you will receive an email shortly.',
    iAm: 'I am a',
    cbo: 'Community Based Orgaization',
    client: 'Client',
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
    unexpectedError:
      'No pudimos procesar su solicitud. Por favor inténtalo de nuevo.',
    emailSent: 'Si existe una cuenta, recibirá un correo electrónico en breve.',
    iAm: 'Soy un',
    cbo: 'Organización basada en la comunidad',
    client: 'Cliente',
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
    unexpectedError,
    emailSent,
    iAm,
    cbo,
    client,
  } = copy[language]
  const submit = () => {}
  const { handleChange, handleBlur, stateValue, errors, handleSubmit } =
    useFormFields({
      initState,
      callback: submit,
      validator,
    })
  const { email, signupType } = stateValue

  const isValidForm: boolean =
    signupType &&
    Object.values(errors).filter(error => typeof error !== 'undefined')
      .length === 0

  const onSubmitClicked = async e => {
    e.preventDefault()
    const postCBOToPostgres: Response = await fetch(
      `/api/postForgotPassword/`,
      {
        method: POST,
        body: JSON.stringify({ email, signupType }),
      },
    )
    const apiResponse = await postCBOToPostgres.json()

    if (apiResponse.error) {
      setToast(unexpectedError)
    } else {
      setSuccess(true)
      setTimeout(() => {
        push('/login')
      }, 3000)
      setToast(emailSent)

      stateValue.email = ''
    }
  }
  return (
    <>
      <HeadTags
        title={`${siteTitle} | Forgot Password`}
        href="/forgotpassword"
        description="Reset your forgotten password for ThriveSBC"
      />
      {success ? (
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
              <div className={styles.SignupType}>
                <Paragraph size="med-text" style={{ marginTop: '.5rem' }}>
                  {iAm}
                </Paragraph>
                <Input
                  type="radio"
                  name="signupType"
                  value="client"
                  id="client"
                  onChange={handleChange}
                />
                <label htmlFor="client">{client}</label>
                <Input
                  type="radio"
                  name="signupType"
                  value="cbo"
                  id="cbo"
                  onChange={handleChange}
                />
                <label htmlFor="cbo">{cbo}</label>
              </div>
              <Button
                className={
                  isValidForm ? classes.greenButton : classes.disabledButton
                }
                disabled={!isValidForm}
                type="submit"
              >
                <h4 style={{ padding: '1rem' }}> {sendReset}</h4>
              </Button>
            </div>
          </form>
        </div>
      )}
    </>
  )
}
export default ForgotPasswordPage
