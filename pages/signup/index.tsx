import { GetServerSideProps } from 'next'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { HeadTags } from '../../components'
import { siteTitle, isDev, useStyles } from '../../constants'
import { validator } from '../../helpers/formValidator'
import { CopyHolder } from '../../types'
import { useLanguage, useToast } from '../../hooks'
import { POST } from '../../helpers/'
import { useToken, useFormFields } from '../../hooks/'
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
const initState = {
  org: '',
  email: '',
  pwd: '',
  confirmPwd: '',
}
const SignupPage = () => {
  const { push } = useRouter()
  const classes = useStyles()
  const { language } = useLanguage()
  const submit = () => {
    console.log(' Submited')
  }
  const { handleChange, handleBlur, state, errors, handleSubmit } =
    useFormFields({
      initState,
      callback: submit,
      validator,
    })
  let isValidForm =
    Object.values(errors).filter(error => typeof error !== 'undefined')
      .length === 0
  const {
    confirmPasswordMessage,
    passwordMessage,
    signup,
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
  const { email, org, pwd, confirmPwd } = state
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
            onChange={handleChange}
            //@ts-ignore
            helperText={errors.org}
            //@ts-ignore
            error={errors.org ? true : false}
            style={{ marginTop: '1rem' }}
            onBlur={handleBlur}
            placeholder="Thrive SBC"
          />
          <TextField
            value={email}
            name="email"
            title={validEmail}
            onChange={handleChange}
            style={{ marginTop: '1rem' }}
            placeholder={`${someone}@gmail.com`}
            //@ts-ignore
            error={errors.email ? true : false}
            //@ts-ignore
            helperText={errors.email}
            onBlur={handleBlur}
            required
          />
          <TextField
            type="password"
            name="pwd"
            value={pwd}
            onBlur={handleBlur}
            style={{ marginTop: '1rem' }}
            onChange={handleChange}
            placeholder={passwordMessage}
            spellCheck
            //@ts-ignore
            error={errors.pwd ? true : false}
            //@ts-ignore
            helperText={errors.pwd}
            title={mustContain}
            required
          />
          <TextField
            type="password"
            value={confirmPwd}
            name="confirmPwd"
            //@ts-ignore
            error={errors.confirmPwd ? true : false}
            style={{ marginTop: '1rem' }}
            //@ts-ignore
            helperText={errors.confirmPwd}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder={confirmPasswordMessage}
            required
          />
          <hr style={{ margin: '2rem' }} />
          <Button
            className={
              confirmPwd !== pwd
                ? classes.disabledButton
                : pwd.length == 0
                ? classes.disabledButton
                : classes.greenButton
            }
            type="submit"
            disabled={!isValidForm || pwd !== confirmPwd}
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
            {pwd.length >= 8 ? (
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
