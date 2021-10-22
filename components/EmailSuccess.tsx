import { useRouter } from 'next/router'

const EmailSuccess = () => {
  const { push } = useRouter()

  return (
    <div className="content-container">
      <h1>Success!</h1>
      <p>
        Thanks for verifying your email, now you can use all the app's features.
      </p>
      <button onClick={() => push('/dashboard')}>Go to home page</button>
    </div>
  )
}
export default EmailSuccess
