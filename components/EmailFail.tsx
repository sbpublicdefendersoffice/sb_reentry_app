import { Email } from '@material-ui/icons'
import { useRouter } from 'next/router'

const EmailFail = () => {
  const { push } = useRouter()

  return (
    <div className="content-container">
      <h1>Uh oh...</h1>
      <p>Something went wrong while trying to verify your email.</p>
      <button onClick={() => push('/signup')}>Back to Sign-up</button>
    </div>
  )
}
export default EmailFail
