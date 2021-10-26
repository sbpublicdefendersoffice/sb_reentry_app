import React, { useEffect, useState, FormEvent } from 'react'
import { useRouter } from 'next/router'
import { useToken } from '../../../hooks'
import { POST } from '../../../helpers/'
import { useStyles } from '../../../constants'
import { PasswordResetSuccess, PasswordResetFail } from '../../../components'
import { Input, Button, TextField } from '@mui/material'
import { Check, Close } from '@mui/icons-material'

const PasswordResetLandingPage = () => {
  const { asPath } = useRouter()
  const [pwd, setPwd] = useState('')
  const classes = useStyles()
  const [confirmPwd, setConfirmPwd] = useState('')
  const passwordResetCode = asPath.split('/')[2]

  const [isFailure, setIsFailure] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const info = {
    passwordResetCode: passwordResetCode,
    pwd: pwd,
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    try {
      console.log('🚨 info from frontend', info)

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

      setIsSuccess(true)
    } catch (err) {
      setIsFailure(true)
    }
  }
  if (isFailure) return <PasswordResetFail />
  if (isSuccess) return <PasswordResetSuccess />
  return (
    <>
      {isFailure && <PasswordResetFail />}
      {isSuccess && <PasswordResetSuccess />}
      {!isSuccess && !isFailure && (
        <div style={{ margin: 'auto', textAlign: 'center' }}>
          {' '}
          <h1 className={classes.h4Style}>Reset Password</h1>
          <p style={{ marginBottom: '4rem' }}>Please enter a new password</p>
          <form role="form" onSubmit={handleSubmit}>
            <div>
              <TextField
                type="password"
                //@ts-ignore
                pattern={'(?=.*d)(?=.*[a-z])(?=.*[A-Z]).{8,}'}
                value={pwd}
                onChange={e => setPwd(e.target.value)}
                placeholder="Password"
              />
              <br />
              <TextField
                type="password"
                style={{ marginTop: '2rem' }}
                value={confirmPwd}
                onChange={e => setConfirmPwd(e.target.value)}
                placeholder=" Confirm Password"
              />
              <br />
              <Button
                className={classes.downloadButtons}
                style={{
                  textAlign: 'center',
                  backgroundColor: '#04A868',
                  color: 'white',
                  marginBottom: '2rem',
                }}
                type="submit"
                disabled={!pwd || !confirmPwd || pwd !== confirmPwd}
              >
                <h4 style={{ padding: '1rem' }}> Reset Password</h4>
              </Button>
              <hr />
              <div style={{ marginTop: '3rem' }}>
                <p style={{ fontWeight: 'bold' }}>
                  All checkmarks must turn green, password must have:
                </p>
                <p>
                  {pwd.length >= 8 ? (
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
              </div>
            </div>
          </form>
        </div>
      )}
    </>
  )
}

export default PasswordResetLandingPage
