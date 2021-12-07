import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'

import { POST } from '../../../helpers/'
import {
  EmailSuccess,
  EmailFail,
  LeafLoader,
  HeadTags,
} from '../../../components/'
import { useStyles, siteTitle } from '../../../constants/'

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
      <>
        <HeadTags
          title={`${siteTitle} | Loading...`}
          href="/verifyemail"
          description={`${siteTitle} is loading`}
        />
        <div className={classes.root}>
          <LeafLoader />
        </div>
      </>
    )
  else if (loadStatus === 'failed')
    return (
      <>
        <HeadTags
          title={`${siteTitle} | Verification Failed`}
          href="/verifyemail"
          description={`${siteTitle} failed to verify your email`}
        />
        <EmailFail />
      </>
    )
  else
    return (
      <>
        <HeadTags
          title={`${siteTitle} | Verification Successful`}
          href="/verifyemail"
          description={`${siteTitle} verified your email`}
        />
        <EmailSuccess isClient={verificationString.startsWith('cli')} />
      </>
    )
}
export default EmailLandingPage
