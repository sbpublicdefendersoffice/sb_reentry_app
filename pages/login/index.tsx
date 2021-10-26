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
  },
  spanish: {
    login: `Acceso`,
    forgot: '¿Olvidaste tu contraseña?',
    signup: '¿No tienes una cuenta? Inscribirse',
    password: 'Contraseña',
    error: 'Hubo un error al iniciar sesión.',
    success: 'Has iniciado sesión con éxito',
  },
}
const initialForm = {
  email: 'v123@gmail.com',
  pwd: '123456qQ',
}
const LoginPage = () => {
  const { push } = useRouter()
  const classes = useStyles()
  const { setToast } = useToast()
  const [successful, setSuccessful] = useState(false)
  // const [token, setToken] = useToken()
  const { language } = useLanguage()
  const [errorMessage, setErrorMessage] = useState('')
  const { login, forgot, signup, error, success, password } = copy[language]

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
        title={`${siteTitle} | Login`}
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
            name="email"
            onChange={setAdminCredentials}
            placeholder="someone@gmail.com"
            style={{ marginBottom: '2rem' }}
          />

          <TextField
            type="password"
            variant="outlined"
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
