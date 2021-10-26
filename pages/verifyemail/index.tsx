import { useEffect } from 'react'
import { useStyles } from '../../constants'
const VerifyEmailPage = () => {
  const classes = useStyles()
  return (
    <div className={classes.root}>
      <h1>Thanks for signing up</h1>
      <p className={classes.h4Style}>
        Please verify your account by clicking on the link that was sent to the
        email address that you provided. Make sure to look in the spam folder if
        you do not see the email in your inbox.{' '}
      </p>
    </div>
  )
}
export default VerifyEmailPage
