import React, { useState, FormEvent } from 'react'
import { useRouter } from 'next/router'
import { useLanguage } from '../../../hooks'
import { POST } from '../../../helpers/'
import { useStyles } from '../../../constants'
import { PasswordResetSuccess, PasswordResetFail } from '../../../components'
import { Button, TextField } from '@mui/material'
import { Check, Close } from '@mui/icons-material'
import { CopyHolder } from '../../../types'

export const copy: CopyHolder = {
  english: {
    resetPwd: `Reset Password`,
    enterNew: 'Please enter a new password',
    pwdText: `Password'`,

    checkMarks: 'All check marks must turn green, the password must have:',
    characters: 'At least 8 characters',
    upperCase: 'At least 1 uppercase letter',
    lowerCase: 'At least 1 lowercase letter',
    number: 'At least 1 number or special character',
    match: 'Password is equal to confirm password',
    confirm: 'Confirm Password',
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
  },
}
const PasswordResetLandingPage = () => {
  const { asPath } = useRouter()
  const [pwd, setPwd] = useState('')
  const classes = useStyles()
  const [confirmPwd, setConfirmPwd] = useState('')
  const passwordResetCode = asPath.split('/')[2]
  const { language } = useLanguage()
  const [isFailure, setIsFailure] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
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
  } = copy[language]
  const info = {
    passwordResetCode: passwordResetCode,
    pwd: pwd,
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    try {
      e.preventDefault()
      const postUserToPostgres: Response = await fetch(
        `/api/postResetPassword`,
        {
          method: POST,
          body: JSON.stringify({
            passwordResetCode: passwordResetCode,
            pwd: pwd,
          }),
        },
      )

      await setIsSuccess(true)
    } catch (err) {
      await setIsFailure(true)
    }
  }
  if (isFailure) return <PasswordResetFail />
  if (isSuccess) return <PasswordResetSuccess />
  return (
    <>
      {isFailure && <PasswordResetFail />}
      {isSuccess && <PasswordResetSuccess />}
      {!isSuccess && !isFailure && (
        <div className={classes.root}>
          <h1>{resetPwd}</h1>
          <p className={classes.fontSize} style={{ margin: '2rem' }}>
            {enterNew}
          </p>
          <form role="form" onSubmit={handleSubmit}>
            <div className={classes.root}>
              <TextField
                type="password"
                inputProps={{
                  style: { fontSize: '1.6rem' },
                  pattern: '(?=.*d)(?=.*[a-z])(?=.*[A-Z]).{8,}',
                }}
                value={pwd}
                onChange={e => setPwd(e.target.value)}
                placeholder={pwdText}
              />
              <br />
              <TextField
                type="password"
                style={{ margin: '1rem 0 2rem 0' }}
                value={confirmPwd}
                onChange={e => setConfirmPwd(e.target.value)}
                placeholder={confirm}
              />
              <br />
              <Button
                className={classes.greenButton}
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
