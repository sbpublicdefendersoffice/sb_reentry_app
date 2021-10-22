import { GetServerSideProps } from 'next'
import { useRouter } from 'next/router'
import { FormEvent } from 'react'
import { HeadTags } from '../../components'
import { siteTitle, isDev } from '../../constants'
import { useFormFields } from '../../hooks'
import { CopyHolder } from '../../types'
import { Button } from '../../ui'
import { useLanguage, useToast } from '../../hooks'
import { POST } from '../../helpers/'
import { useToken } from '../../hooks/'
import CheckIcon from '@material-ui/icons/Check'
import CloseIcon from '@material-ui/icons/Close'
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
    <>
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
          {error && <div className={'fail'}>{error}</div>}
          <input
            value={org}
            name="org"
            onChange={handleFieldChange}
            placeholder="Thrive SBC"
          />
          <input
            value={email}
            pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"
            name="email"
            title="Please enter a valid email address"
            onChange={handleFieldChange}
            placeholder="someone@gmail.com"
            required
          />
          <input
            type="password"
            name="pwd"
            pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
            value={pwd}
            onChange={handleFieldChange}
            placeholder={passwordMessage}
            spellCheck
            title="Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters"
            required
          />
          <input
            type="password"
            value={confirmPwd}
            name="confirmPwd"
            onChange={handleFieldChange}
            placeholder={confirmPasswordMessage}
          />
          <Button type="submit" disabled={!email || !pwd || pwd !== confirmPwd}>
            Sign Up
          </Button>
          {/* <Button onClick={getCookie}>Log In To Thrive</Button> */}
          <Button onClick={() => push('/login')}>
            Already have an account? Log in
          </Button>
        </div>
        <>
          <p style={{ fontWeight: 'bold' }}>
            All checkmarks must turn green, password must have:
          </p>
          <p>
            {pwd.length >= '8' ? (
              <CheckIcon style={{ color: 'green' }} />
            ) : (
              <CloseIcon style={{ color: 'red' }} />
            )}
            At least 8 characters
          </p>
          <p>
            {pwd.match(/[A-Z]/g) ? (
              <CheckIcon style={{ color: 'green' }} />
            ) : (
              <CloseIcon style={{ color: 'red' }} />
            )}
            At least 1 uppercase letter
          </p>
          <p>
            {pwd.match(/[a-z]/g) ? (
              <CheckIcon style={{ color: 'green' }} />
            ) : (
              <CloseIcon style={{ color: 'red' }} />
            )}
            At least 1 lowercase letter
          </p>
          <p>
            {pwd.match(/[\d`~!@#$%\^&*()+=|;:'",.<>\/?\\\-]/) ? (
              <CheckIcon style={{ color: 'green' }} />
            ) : (
              <CloseIcon style={{ color: 'red' }} />
            )}
            At least 1 number or special character
          </p>
          <p>
            {pwd === confirmPwd && pwd !== '' ? (
              <CheckIcon style={{ color: 'green' }} />
            ) : (
              <CloseIcon style={{ color: 'red' }} />
            )}
            Password === Confirm Password
          </p>
        </>
      </form>
    </>
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
