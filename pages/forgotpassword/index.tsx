import { useState, FormEvent } from 'react'
import { useRouter } from 'next/router'
import { Button } from '@material-ui/core'
import { POST } from '../../helpers/'
const ForgotPasswordPage = () => {
  const { push } = useRouter()
  const [email, setEmail] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const [success, setSuccess] = useState(false)
  const onSubmitClicked = async (
    e: FormEvent<HTMLFormElement>,
  ): Promise<void> => {
    e.preventDefault()
    try {
      const postUserToPostgres: Response = await fetch(
        `/api/postForgotPassword/`,
        {
          method: POST,
          body: email,
        },
      )
      setSuccess(true)
      setTimeout(() => {
        push('/login')
      }, 3000)
    } catch (error) {
      setErrorMessage(error.errorMessage)
    }
  }
  return success ? (
    <div>
      <h1>Success</h1>
      <p>Check your email for a reset link</p>
    </div>
  ) : (
    <form role="form" onSubmit={onSubmitClicked}>
      <div>
        <h1>Forgot Password</h1>
        <p>Enter your email and we'll send you a reset link </p>
        {errorMessage && <div className="fail">{errorMessage}</div>}
        <input
          value={email}
          onChange={e => setEmail(e.target.value)}
          placeholder={'someone@gmail.com'}
        />
        <Button disabled={!email} type="submit">
          Send Reset Link
        </Button>
      </div>
    </form>
  )
}
export default ForgotPasswordPage
