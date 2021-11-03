import React, { useState, FormEvent } from 'react'
import { useRouter } from 'next/router'
import { useLanguage, useFormFields } from '../../../hooks'
import { POST } from '../../../helpers/'
import { useStyles } from '../../../constants'
import { PasswordResetSuccess, PasswordResetFail } from '../../../components'
import { Button, TextField } from '@mui/material'
import { Check, Close } from '@mui/icons-material'
import { CopyHolder } from '../../../types'
import { validator } from '../../../helpers/formValidator'
export const copy: CopyHolder = {
  english: {
    resetPwd: `Reset Password`,
    enterNew: 'Please enter a new password',
    pwdText: `Password`,
    checkMarks: 'All check marks must turn green, the password must have:',
    characters: 'At least 8 characters',
    upperCase: 'At least 1 uppercase letter',
    lowerCase: 'At least 1 lowercase letter',
    number: 'At least 1 number or special character',
    match: 'Password is equal to confirm password',
    confirm: 'Confirm Password',
    validPassword: 'Enter a valid password',
    validConfirmPassword: 'Make sure that both passwords listed above match',
  },
  spanish: {
    resetPwd: `Restablecer la contraseña`,
    enterNew: 'Ingrese una nueva contraseña',
    pwdText: `Contraseña`,
    checkMarks:
      'Todas las marcas de verificación deben ponerse verdes, la contraseña debe tener:',
    characters: 'Al menos 8 carácteres',
    upperCase: 'Al menos 1 letra mayúscula',
    lowerCase: 'Al menos 1 letra minúscula',
    number: 'Al menos 1 número o carácter especial',
    match: 'La contraseña es igual a Confirmar contraseña',
    confirm: 'confirmar Contraseña',
    validPassword: 'Ingrese una contraseña válida',
    validConfirmPassword:
      'Asegúrese de que las dos contraseñas enumeradas anteriormente coincidan',
  },
}
const initState = {
  pwd: '',
  confirmPwd: '',
}
const PasswordResetLandingPage = () => {
  const { asPath } = useRouter()
  const classes = useStyles()
  const passwordResetCode = asPath.split('/')[2]
  const { language } = useLanguage()
  const [isFailure, setIsFailure] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const submit = () => {
    console.log(' Submited')
  }
  const { handleChange, handleBlur, state, errors } = useFormFields({
    initState,
    callback: submit,
    validator,
  })

  const {
    resetPwd,
    enterNew,
    pwdText,
    checkMarks,
    characters,
    upperCase,
    lowerCase,
    number,
    match,
    confirm,
    validPassword,
    validConfirmPassword,
  } = copy[language]
  const { pwd, confirmPwd } = state
  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault()
    const postCBOToPostgres: Response = await fetch(`/api/postResetPassword`, {
      method: POST,
      body: JSON.stringify({
        passwordResetCode: passwordResetCode,
        pwd: pwd,
      }),
    })
    const apiResponse = await postCBOToPostgres.json()
    if (apiResponse.message == 'error') {
      await setIsFailure(true)
    } else {
      await setIsSuccess(true)
    }
  }
  if (isFailure) return <PasswordResetFail />
  if (isSuccess) return <PasswordResetSuccess />
  return (
    <>
      {isFailure && <PasswordResetFail />}
      {isSuccess && <PasswordResetSuccess />}
      {!isSuccess && !isFailure && (
        <div className={classes.root} style={{ margin: '4rem 0 4rem 1rem' }}>
          <h1>{resetPwd}</h1>
          <p className={classes.fontSize} style={{ margin: '2rem' }}>
            {enterNew}
          </p>
          <form role="form" onSubmit={handleSubmit}>
            <div className={classes.root} style={{ width: '20rem !important' }}>
              <TextField
                type="password"
                name="pwd"
                value={pwd}
                style={{ width: '20rem' }}
                onChange={handleChange}
                //@ts-ignore
                error={errors.pwd ? true : false}
                //@ts-ignore
                helperText={errors.pwd ? validPassword : false}
                onBlur={handleBlur}
                placeholder={pwdText}
              />
              <br />
              <TextField
                type="password"
                name="confirmPwd"
                style={{ margin: '1rem 0 2rem 0', width: '20rem' }}
                value={confirmPwd}
                onChange={handleChange}
                //@ts-ignore
                error={errors.pwd ? true : false}
                //@ts-ignore
                helperText={errors.pwd ? validConfirmPassword : false}
                onBlur={handleBlur}
                placeholder={confirm}
              />
              <br />
              <Button
                className={
                  confirmPwd !== pwd
                    ? classes.disabledButton
                    : pwd.length == 0
                    ? classes.disabledButton
                    : classes.greenButton
                }
                type="submit"
                disabled={!pwd || !confirmPwd || pwd !== confirmPwd}
              >
                <h4 style={{ padding: '1rem' }}>{resetPwd}</h4>
              </Button>
              <hr style={{ width: '20%', margin: 'auto' }} />
              <div style={{ marginTop: '3rem !important' }}>
                <p
                  className={classes.checkMarks}
                  style={{ fontWeight: 'bold', margin: '2rem' }}
                >
                  {checkMarks}
                </p>
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
              </div>
            </div>
          </form>
        </div>
      )}
    </>
  )
}
export default PasswordResetLandingPage
