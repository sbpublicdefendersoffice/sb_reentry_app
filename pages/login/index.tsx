import { GetServerSideProps } from 'next'
import { useRouter } from 'next/router'
import { useState, FormEvent } from 'react'
import { HeadTags } from '../../components'
import { useFormFields } from '../../hooks'
import { siteTitle, isDev } from '../../constants'
import { CopyHolder } from '../../types'
import { Button } from '../../ui'
import { useLanguage, useToast } from '../../hooks'
import { POST } from '../../helpers/'

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
  const { setToast } = useToast()
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

  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault()
    if (adminCredentials) {
      const postUserToPostgres: Response = await fetch('/api/postLogin', {
        method: POST,
        body: JSON.stringify(adminCredentials),
      })

      const apiResponse = await postUserToPostgres.json()
      if (apiResponse.error) setToast(`${error}${apiResponse.error}`)
      else {
        setToast(success)
        // const { token } = apiResponse
        //@ts-ignore
        // setToken(token)
        push('/dashboard')
        adminCredentials.email = ''
        adminCredentials.pwd = ''
      }
    }
  }
  return (
    <>
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
          <h1>{login}</h1>
          {errorMessage && <div className={'fail'}>{errorMessage}</div>}
          <input
            value={email}
            name="email"
            onChange={setAdminCredentials}
            placeholder="someone@gmail.com"
          />
          <input
            type="password"
            value={pwd}
            name="pwd"
            onChange={setAdminCredentials}
            placeholder={password}
          />
          <Button type="submit" disabled={!email || !pwd}>
            {login}
          </Button>
          <Button onClick={() => push('/forgotpassword')}>{forgot}</Button>
          <Button onClick={() => push('/signup')}>{signup}</Button>
          {/* <Button onClick={getCookie}>Log In To Thrive</Button> */}
        </div>
      </form>
    </>
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
