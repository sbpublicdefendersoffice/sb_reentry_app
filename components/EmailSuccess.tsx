import { useRouter } from 'next/router'
import { useStyles } from '../constants'
import { Button } from '@mui/material/'
const EmailSuccess = () => {
  const { push } = useRouter()
  const classes = useStyles()
  return (
    <div className={classes.root}>
      <h1 className={classes.h4Style}>
        Your email verification was successful
      </h1>
      <p className={classes.centerFlex}>
        You will be notified from our staff once your account is ready. Please
        allow 2-3 business days for our staff to reach out to you via the email
        address you provided. Once approved as an organization, you will have
        full access to update your organizations information on our dashboard.
      </p>
      <Button
        size="large"
        style={{
          backgroundColor: '#04A868',
          color: 'white',
        }}
        className={classes.downloadButtons}
        onClick={() => push('/')}
      >
        <h3 style={{ padding: '1rem' }}> Back to home page</h3>
      </Button>
    </div>
  )
}
export default EmailSuccess
