import { Email } from '@material-ui/icons'
import { useRouter } from 'next/router'

const PasswordResetFail = () => {
  const { push } = useRouter()

  return (
    <div className="content-container">
      <h1>Uh oh...</h1>
      <p>Something went wrong while trying to reset your passor.</p>
      <button onClick={() => push('/login')}>Back to Log in</button>
    </div>
  )
}
export default PasswordResetFail
