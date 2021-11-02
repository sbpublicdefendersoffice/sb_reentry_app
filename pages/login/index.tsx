import { GetServerSideProps } from 'next'
import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'
import { HeadTags } from '../../components'
import { siteTitle, isDev, useStyles } from '../../constants'
import { CopyHolder } from '../../types'
import { validator } from '../../helpers/formValidator'
import { useLanguage, useToast, useFormFields } from '../../hooks'
import { POST } from '../../helpers/'
import { Button, TextField } from '@mui/material'
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
  },
}
const initState = {
  email: '',
  pwd: '',
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
  } = copy[language]
  const submit = () => {
    console.log(' Submited')
  }
  const { handleChange, handleBlur, state, errors } = useFormFields({
    initState,
    callback: submit,
    validator,
  })
  let isValidForm =
    Object.values(errors).filter(error => typeof error !== 'undefined')
      .length === 0

  const { email, pwd } = state
  useEffect(() => {
    if (successful) setSuccessful(successful)
  }, [successful])

  const handleSubmit = async e => {
    e.preventDefault()

    const postUserToPostgres: Response = await fetch('/api/postLogin', {
      method: POST,
      body: JSON.stringify(state),
    })
    const apiResponse = await postUserToPostgres.json()
    if (apiResponse.error) {
      setToast(tryAgain)
    } else {
      push('/dashboard')
      setToast(successfulLogin)

      //@ts-ignore

      state.email = ''
      state.pwd = ''
    }
  }
  return (
    <div style={{ margin: 'auto', textAlign: 'center' }}>
      <HeadTags
        title={`${siteTitle} | ${login}`}
        href={`/login`}
        description={`Login`}
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
            name="pwd"
            onChange={handleChange}
            placeholder={password}
            //@ts-ignore
            error={errors.pwd ? true : false}
            //@ts-ignore
            helperText={errors.pwd}
            onBlur={handleBlur}
          />
          <hr style={{ margin: '2rem' }} />
          <Button
            className={
              !isValidForm ? classes.disabledButton : classes.greenButton
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
          {/* <Button onClick={getCookie}>Log In To Thrive</Button> */}
        </div>
      </form>
    </div>
  )
}
export default LoginPage
export const getServerSideProps: GetServerSideProps = async () => {
  // login is still under development, so we don't want people accessing it in production
  if (!isDev)
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    }
  return {
    props: {},
  }
}
