import { GetServerSideProps } from 'next'
import { useRouter } from 'next/router'
import { useState, FormEvent, useEffect } from 'react'
import { HeadTags } from '../../components'
import { useFormFields } from '../../hooks'
import { siteTitle, isDev, useStyles } from '../../constants'
import { CopyHolder } from '../../types'

import { useLanguage, useToast } from '../../hooks'
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
  },
}
const initialForm = {
  email: '',
  pwd: '',
}
const LoginPage = () => {
  const { push } = useRouter()
  const classes = useStyles()
  const { setToast } = useToast()
  const [successful, setSuccessful] = useState(false)
  // const [token, setToken] = useToken()
  const { language } = useLanguage()
  const [errorMessage, setErrorMessage] = useState('')
  const {
    login,
    forgot,
    signup,
    validEmail,
    someone,
    error,
    success,
    password,
    mustContain,
  } = copy[language]

  const [adminCredentials, setAdminCredentials] = useFormFields(initialForm)
  // const getCookie = async (): Promise<void> => {
  //   await fetch('/api/jwt', { credentials: 'include' })
  //   push('/login/verify')
  // }
  const { email, pwd } = adminCredentials
  useEffect(() => {
    if (successful) setSuccessful(successful)
  }, [successful])
  // useEffect(() => {
  //   if (!success) {
  //     setTimeout(() => {
  //       setSuccessful(!success)
  //       // setAdminInfo({ ...props })
  //     }, 3000)
  //   }
  // }, [successful])
  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault()
    if (adminCredentials) {
      const postUserToPostgres: Response = await fetch('/api/postLogin', {
        method: POST,
        body: JSON.stringify(adminCredentials),
      })

      const apiResponse = await postUserToPostgres.json()
      if (apiResponse.error) {
        // setSuccessful(false)
        setToast(`${error}${apiResponse.error}`)
      } else {
        // setSuccessful(true)
        push('/dashboard')
        setToast(success)

        // const { token } = apiResponse
        //@ts-ignore
        // setToken(token)

        adminCredentials.email = ''
        adminCredentials.pwd = ''
      }
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
            inputProps={{
              style: { marginBottom: '2rem' },
              pattern: '[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$',
            }}
            required
            name="email"
            onChange={setAdminCredentials}
            placeholder={`${someone}@gmail.com`}
          />

          <TextField
            type="password"
            variant="outlined"
            title={mustContain}
            inputProps={{
              pattern: '(?=.*d)(?=.*[a-z])(?=.*[A-Z]).{8,}',
            }}
            value={pwd}
            name="pwd"
            onChange={setAdminCredentials}
            placeholder={password}
          />

          <hr style={{ margin: '2rem' }} />
          <Button
            className={classes.greenButton}
            style={{ marginTop: '1rem' }}
            type="submit"
            disabled={!email || !pwd}
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
