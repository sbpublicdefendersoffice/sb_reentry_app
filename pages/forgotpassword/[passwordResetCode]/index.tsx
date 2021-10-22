import React, { useEffect, useState, FormEvent } from 'react'
import { useRouter } from 'next/router'
import { useToken } from '../../../hooks'
import { POST } from '../../../helpers/'
import { PasswordResetSuccess, PasswordResetFail } from '../../../components'
import { Input, Button } from '../../../ui'
// export const urlSlug: string = '/verifyemail/[id]'
const PasswordResetLandingPage = () => {
  const { asPath } = useRouter()
  const [pwd, setPwd] = useState('')
  const [confirmPwd, setConfirmPwd] = useState('')
  const passwordResetCode = asPath.split('/')[2]
  const [isFailure, setIsFailure] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    try {
      const postUserToPostgres: Response = await fetch(
        `/forgotpassword/${passwordResetCode}`,
        {
          method: POST,
          body: pwd,
        },
      )
      setIsSuccess(true)

      setIsSuccess(true)
    } catch (err) {
      setIsFailure(true)
    }
  }
  if (isFailure) return <PasswordResetFail />
  if (isSuccess) return <PasswordResetSuccess />
  return (
    <div>
      <h1>Reset Password</h1>
      <p>Please enter a new password</p>
      <form>
        <div>
          <input
            type="password"
            value={pwd}
            onChange={e => setPwd(e.target.value)}
            placeholder="Password"
          />
          <input
            type="password"
            value={confirmPwd}
            onChange={e => setConfirmPwd(e.target.value)}
            placeholder=" Confirm Password"
          />
          <button
            type="submit"
            disabled={!pwd || !confirmPwd || pwd !== confirmPwd}
          >
            Reset Password
          </button>
        </div>
      </form>
    </div>
  )
}

export default PasswordResetLandingPage
