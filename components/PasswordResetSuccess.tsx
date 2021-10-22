import { useRouter } from 'next/router'

const PasswordResetSuccess = () => {
  const { push } = useRouter()

  return (
    <div className="content-container">
      <h1>Success!</h1>
      <p>
        Your password has been reset, now please login with your new password
      </p>
      <button onClick={() => push('/login')}>Log in</button>
    </div>
  )
}
export default PasswordResetSuccess
