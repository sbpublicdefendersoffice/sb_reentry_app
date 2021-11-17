import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'

import { POST } from '../../../helpers/'
import { EmailSuccess, EmailFail, LeafLoader } from '../../../components/'
import { useStyles } from '../../../constants/materialStyles'

const EmailLandingPage = () => {
  const { asPath } = useRouter()
  const verificationString = asPath.split('/')[2]

  const [loadStatus, setLoadStatus] = useState<
    'loading' | 'failed' | 'success'
  >('loading')
  const classes = useStyles()

  useEffect(() => {
    const loadVerification = async () => {
      try {
        const postCBOToPostgres: Response = await fetch(
          '/api/postVerifyEmail',
          {
            method: POST,
            body: JSON.stringify(verificationString),
          },
        )
        const res = await postCBOToPostgres.json()

        console.log(res)

        if (res.error) throw new Error(res.error)
        else setLoadStatus('success')
      } catch (err) {
        const { message } = err
        console.error(message)
        setLoadStatus('failed')
      }
    }

    loadVerification()
  }, [verificationString])

  if (loadStatus === 'loading')
    return (
      <div className={classes.root}>
        <LeafLoader />
      </div>
    )
  else if (loadStatus === 'failed') return <EmailFail />
  else return <EmailSuccess isClient={verificationString.startsWith('cli')} />
}
export default EmailLandingPage
