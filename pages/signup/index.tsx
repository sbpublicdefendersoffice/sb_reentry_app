import { GetServerSideProps } from 'next'
import { useRouter } from 'next/router'
import { FormEvent } from 'react'
import { HeadTags } from '../../components'
import { siteTitle, isDev } from '../../constants'
import { useFormFields } from '../../hooks'
import { CopyHolder } from '../../types'

import { useLanguage, useToast } from '../../hooks'
import { POST } from '../../helpers/'
import { useToken } from '../../hooks/'
import { useStyles } from '../../constants'
import { Button, TextField } from '@mui/material'
import { Check, Close } from '@mui/icons-material'
export const copy: CopyHolder = {
  english: {
    signup: `Sign Up`,
    success:
      'Your account was created. Please look out for an email in your inbox',
    passwordMessage: 'password',
    confirmPasswordMessage: 'Confirm password',
    error: 'There was an error creating your account',
  },
  spanish: {
    signup: 'Inscribirse',
    success:
      'Tu cuenta fue creada. Busque un correo electrónico en su bandeja de entrada',
    passwordMessage: 'Contraseña',
    confirmPasswordMessage: 'confirmar Contraseña',
    error: 'Hubo un error al crear tu cuenta',
  },
}
const initialForm = {
  org: '',
  email: '',
  pwd: '123456qQ',
  confirmPwd: '123456qQ',
}
const SignupPage = () => {
  const [token, setToken] = useToken()
  const { push } = useRouter()
  const classes = useStyles()
  const { setToast } = useToast()
  const { language } = useLanguage()
  const [fields, handleFieldChange] = useFormFields(initialForm)
  const { confirmPasswordMessage, passwordMessage, error, signup, success } =
    copy[language]
  const { email, org, pwd, confirmPwd } = fields
  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault()
    if (fields) {
      const postUserToPostgres: Response = await fetch('/api/postUser', {
        method: POST,
        body: JSON.stringify(fields),
      })
      const apiResponse = await postUserToPostgres.json()

      if (apiResponse.error) {
        setToast(`${error}${apiResponse.error}`)
        return
      } else {
        setToast(success)
        fields.org = ''
        fields.email = ''
        fields.pwd = ''
        fields.confirmPwd = ''
      }
      const { token } = await apiResponse
      //@ts-ignore
      setToken(token)
      push('/verifyemail')
      //not sure why it is getting
    }
  }
  return (
    <div style={{ margin: 'auto', textAlign: 'center' }}>
      <HeadTags
        title={`${siteTitle} | Sign Up`}
        href={`/signup`}
        description={`Signup`}
      />
      <form role="form" onSubmit={handleSubmit}>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
          }}
        >
          <h1>{signup}</h1>

          <TextField
            value={org}
            name="org"
            onChange={handleFieldChange}
            style={{ marginTop: '1rem' }}
            placeholder="Thrive SBC"
          />
          <TextField
            value={email}
            //@ts-ignore
            pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"
            name="email"
            title="Please enter a valid email address"
            onChange={handleFieldChange}
            style={{ marginTop: '1rem' }}
            placeholder="someone@gmail.com"
            required
          />
          <TextField
            type="password"
            name="pwd"
            //@ts-ignore
            pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
            value={pwd}
            style={{ marginTop: '1rem' }}
            onChange={handleFieldChange}
            placeholder={passwordMessage}
            spellCheck
            title="Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters"
            required
          />
          <TextField
            type="password"
            value={confirmPwd}
            name="confirmPwd"
            style={{ marginTop: '1rem' }}
            onChange={handleFieldChange}
            placeholder={confirmPasswordMessage}
          />
          <Button
            className={classes.downloadButtons}
            style={{
              textAlign: 'center',
              backgroundColor: '#04A868',
              color: 'white',
              marginBottom: '1rem',
            }}
            type="submit"
            disabled={!email || !pwd || pwd !== confirmPwd}
          >
            <h4 style={{ padding: '1rem' }}>Sign Up</h4>
          </Button>
          {/* <Button onClick={getCookie}>Log In To Thrive</Button> */}
          <Button
            style={{
              marginTop: '1rem',
            }}
            className={classes.greenButton}
            onClick={() => push('/login')}
          >
            <h4 style={{ padding: '1rem' }}>Already have an account? Log in</h4>
          </Button>
        </div>
        <>
          <p style={{ fontWeight: 'bold' }}>
            All checkmarks must turn green, password must have:
          </p>
          <p>
            {pwd.length >= '8' ? (
              <Check style={{ color: 'green' }} />
            ) : (
              <Close style={{ color: 'red' }} />
            )}
            At least 8 characters
          </p>
          <p>
            {pwd.match(/[A-Z]/g) ? (
              <Check style={{ color: 'green' }} />
            ) : (
              <Close style={{ color: 'red' }} />
            )}
            At least 1 uppercase letter
          </p>
          <p>
            {pwd.match(/[a-z]/g) ? (
              <Check style={{ color: 'green' }} />
            ) : (
              <Close style={{ color: 'red' }} />
            )}
            At least 1 lowercase letter
          </p>
          <p>
            {pwd.match(/[\d`~!@#$%\^&*()+=|;:'",.<>\/?\\\-]/) ? (
              <Check style={{ color: 'green' }} />
            ) : (
              <Close style={{ color: 'red' }} />
            )}
            At least 1 number or special character
          </p>
          <p>
            {pwd === confirmPwd && pwd !== '' ? (
              <Check style={{ color: 'green' }} />
            ) : (
              <Close style={{ color: 'red' }} />
            )}
            Password === Confirm Password
          </p>
        </>
      </form>
    </div>
  )
}
export default SignupPage
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
