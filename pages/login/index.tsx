import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'
import { Button, TextField } from '@mui/material'

import { HeadTags } from '../../components'
import { siteTitle, useStyles } from '../../constants'
import { CopyHolder } from '../../types'
import { useLanguage, useToast, useFormFields } from '../../hooks'
import { POST, validator } from '../../helpers/'
import { Input, Paragraph } from '../../ui'

export const copy: CopyHolder = {
  english: {
    login: `Login`,
    forgot: 'Forgot your password?',
    signup: `Don't have an account? Sign Up`,
    password: 'Password',
    error: 'There was an error logging in.',
    success: 'You have logged in successfully',
    someone: 'someone',
    validEmail: 'Please enter a valid email address',
    mustContain:
      'Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters',
    tryAgain: 'Email or password is incorrect, try again',
    successfulLogin: 'You have successfully logged in',
    iAm: 'I am an',
    cbo: 'Community Based Orgaization',
    client: 'Client',
  },
  spanish: {
    login: `Acceso`,
    forgot: '¿Olvidaste tu contraseña?',
    signup: '¿No tienes una cuenta? Inscribirse',
    password: 'Contraseña',
    error: 'Hubo un error al iniciar sesión.',
    success: 'Has iniciado sesión con éxito',
    someone: 'alguien',
    validEmail:
      'Por favor, introduce una dirección de correo electrónico válida',
    mustContain:
      'Debe contener al menos un número y una letra mayúscula y minúscula, y al menos 8 caracteres o más',
    tryAgain:
      'El correo electrónico o la contraseña son incorrectos, inténtalo de nuevo.',
    successfulLogin: 'Has iniciado sesión correctamente',
    iAm: 'Soy un',
    cbo: 'Organización basada en la comunidad',
    client: 'Cliente',
  },
}
const initState = {
  email: '',
  pwd: '',
  signupType: '',
}
const LoginPage = () => {
  const { push } = useRouter()
  const classes = useStyles()
  const { setToast } = useToast()
  const [successful, setSuccessful] = useState(false)
  const { language } = useLanguage()
  const [errorMessage, setErrorMessage] = useState('')
  const {
    login,
    forgot,
    signup,
    validEmail,
    someone,
    password,
    mustContain,
    tryAgain,
    successfulLogin,
    iAm,
    cbo,
    client,
  } = copy[language]
  const submit = () => {
    console.log(' Submited')
  }
  const { handleChange, handleBlur, stateValue, errors } = useFormFields({
    initState,
    callback: submit,
    validator,
  })
  const { email, pwd, signupType } = stateValue

  const isValidForm: boolean =
    signupType &&
    Object.values(errors).filter(error => typeof error !== 'undefined')
      .length === 0

  useEffect(() => {
    if (successful) setSuccessful(successful)
  }, [successful])

  const handleSubmit = async e => {
    e.preventDefault()

    const postCBOsToPostgres: Response = await fetch('/api/postLogin', {
      method: POST,
      body: JSON.stringify(stateValue),
    })
    const apiResponse = await postCBOsToPostgres.json()
    if (apiResponse.error) {
      setToast(tryAgain)
    } else {
      if (apiResponse.type === 'cbo') push('/dashboard')
      else push('/freshstart')
      setToast(successfulLogin)

      stateValue.email = ''
      stateValue.pwd = ''
      stateValue.signupType = ''
    }
  }
  return (
    <div style={{ margin: 'auto', textAlign: 'center' }}>
      <h1>Fresh Start/CBO Dashboard Login Under Maintenance</h1>
      {/* <HeadTags
        title={`${siteTitle} | ${login}`}
        href={`/login`}
        description={`${siteTitle} Login`}
      />
      <form role="form" onSubmit={handleSubmit}>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
          }}
        >
          <h1 style={{ marginBottom: '2rem' }}>{login}</h1>
          {errorMessage && <div className={'fail'}>{errorMessage}</div>}
          <TextField
            value={email}
            variant="outlined"
            title={validEmail}
            //@ts-ignore
            error={errors.email ? true : false}
            //@ts-ignore
            helperText={errors.email}
            onBlur={handleBlur}
            required
            name="email"
            onChange={handleChange}
            placeholder={`${someone}@gmail.com`}
          />
          <TextField
            type="password"
            variant="outlined"
            title={mustContain}
            value={pwd}
            style={{ margin: '1rem 0' }}
            name="pwd"
            onChange={handleChange}
            placeholder={password}
            //@ts-ignore
            error={errors.pwd ? true : false}
            //@ts-ignore
            helperText={errors.pwd}
            onBlur={handleBlur}
          />

          <div>
            <Paragraph size="med-text" style={{ marginTop: '.5rem' }}>
              {iAm}
            </Paragraph>
            <label htmlFor="cbo">{cbo}</label>
            <Input
              type="radio"
              name="signupType"
              value="cbo"
              id="cbo"
              onChange={handleChange}
            />
            <label htmlFor="client">{client}</label>
            <Input
              type="radio"
              name="signupType"
              value="client"
              id="client"
              onChange={handleChange}
            />
          </div>
          <hr style={{ margin: '2rem' }} />
          <Button
            className={
              isValidForm ? classes.greenButton : classes.disabledButton
            }
            style={{ marginTop: '1rem' }}
            type="submit"
            disabled={!isValidForm}
          >
            <h4 style={{ padding: '1rem' }}> {login}</h4>
          </Button>
          <Button
            className={classes.greenButton}
            onClick={() => push('/forgotpassword')}
          >
            <h4 style={{ padding: '1rem' }}> {forgot}</h4>
          </Button>
          <Button
            className={classes.greenButton}
            onClick={() => push('/signup')}
          >
            <h4 style={{ padding: '1rem' }}> {signup}</h4>
          </Button>
        </div>
      </form> */}
    </div>
  )
}
export default LoginPage
