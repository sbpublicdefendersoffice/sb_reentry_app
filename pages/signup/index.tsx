import { GetServerSideProps } from 'next'
import { useRouter } from 'next/router'
import { FormEvent } from 'react'
import { HeadTags } from '../../components'
import { siteTitle, isDev, useStyles } from '../../constants'
import { useFormFields } from '../../hooks'
import { CopyHolder } from '../../types'

import { useLanguage, useToast } from '../../hooks'
import { POST } from '../../helpers/'
import { useToken } from '../../hooks/'

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
    alreadyHave: 'Already have an account? Log in',
    checkMarks: 'All check marks must turn green, the password must have:',
    characters: 'At least 8 characters',
    upperCase: 'At least 1 uppercase letter',
    lowerCase: 'At least 1 lowercase letter',
    number: 'At least 1 number or special character',
    match: 'Password is equal to confirm password',

    validEmail: 'Please enter a valid email address',
    someone: 'someone',
    mustContain:
      'Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters',
  },
  spanish: {
    signup: 'Inscribirse',
    success:
      'Tu cuenta fue creada. Busque un correo electrónico en su bandeja de entrada',
    passwordMessage: 'Contraseña',
    confirmPasswordMessage: 'confirmar Contraseña',
    error: 'Hubo un error al crear tu cuenta',
    alreadyHave: '¿Ya tienes una cuenta? Iniciar sesión',
    checkMarks:
      'Todas las marcas de verificación deben ponerse verdes, la contraseña debe tener:',
    characters: 'Al menos 8 carácteres',
    upperCase: 'Al menos 1 letra mayúscula',
    lowerCase: 'Al menos 1 letra minúscula',
    number: 'Al menos 1 número o carácter especial',
    match: 'La contraseña es igual a Confirmar contraseña',

    validEmail:
      'Por favor, introduce una dirección de correo electrónico válida',
    someone: 'alguien',
    mustContain:
      'Debe contener al menos un número y una letra mayúscula y minúscula, y al menos 8 caracteres o más',
  },
}
const initialForm = {
  org: '',
  email: '',
  pwd: '',
  confirmPwd: '',
}
const SignupPage = () => {
  const [token, setToken] = useToken()
  const { push } = useRouter()
  const classes = useStyles()
  const { setToast } = useToast()
  const { language } = useLanguage()
  const [fields, handleFieldChange] = useFormFields(initialForm)
  const {
    confirmPasswordMessage,
    passwordMessage,
    error,
    signup,
    success,
    alreadyHave,
    checkMarks,
    characters,
    upperCase,
    lowerCase,
    number,

    match,
    validEmail,
    someone,
    mustContain,
  } = copy[language]
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
    }
  }
  return (
    <div style={{ margin: 'auto', textAlign: 'center' }}>
      <HeadTags
        title={`${siteTitle} | ${signup}`}
        href={`/signup`}
        description={signup}
      />
      <form role="form" onSubmit={handleSubmit}>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            marginTop: '4rem',
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
            title={validEmail}
            onChange={handleFieldChange}
            style={{ marginTop: '1rem' }}
            placeholder={`${someone}@gmail.com`}
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
            title={mustContain}
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
          <hr style={{ margin: '2rem' }} />
          <Button
            className={
              !email || !pwd || pwd !== confirmPwd
                ? classes.disabledButton
                : classes.greenButton
            }
            // style={{
            //   textAlign: 'center',
            //   backgroundColor: '#04A868',
            //   color: 'white',
            //   marginBottom: '1rem',
            // }}
            type="submit"
            disabled={!email || !pwd || pwd !== confirmPwd}
          >
            <h4 style={{ padding: '1rem' }}>{signup}</h4>
          </Button>
          {/* <Button onClick={getCookie}>Log In To Thrive</Button> */}
          <Button
            style={{
              margin: '1rem 0 1rem 0',
            }}
            className={classes.greenButton}
            onClick={() => push('/login')}
          >
            <h4 style={{ padding: '1rem' }}>{alreadyHave}</h4>
          </Button>
        </div>
        <>
          <p style={{ fontWeight: 'bold', padding: '1rem' }}>{checkMarks}</p>
          <p className={classes.checkMarks}>
            {pwd.length >= '8' ? (
              <Check style={{ color: 'green' }} />
            ) : (
              <Close style={{ color: 'red' }} />
            )}
            {characters}
          </p>
          <p className={classes.checkMarks}>
            {pwd.match(/[A-Z]/g) ? (
              <Check style={{ color: 'green' }} />
            ) : (
              <Close style={{ color: 'red' }} />
            )}
            {upperCase}
          </p>
          <p className={classes.checkMarks}>
            {pwd.match(/[a-z]/g) ? (
              <Check style={{ color: 'green' }} />
            ) : (
              <Close style={{ color: 'red' }} />
            )}
            {lowerCase}
          </p>
          <p className={classes.checkMarks}>
            {pwd.match(/[\d`~!@#$%\^&*()+=|;:'",.<>\/?\\\-]/) ? (
              <Check style={{ color: 'green' }} />
            ) : (
              <Close style={{ color: 'red' }} />
            )}
            {number}
          </p>
          <p className={classes.checkMarks}>
            {pwd === confirmPwd && pwd !== '' ? (
              <Check style={{ color: 'green' }} />
            ) : (
              <Close style={{ color: 'red' }} />
            )}
            {match}
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
