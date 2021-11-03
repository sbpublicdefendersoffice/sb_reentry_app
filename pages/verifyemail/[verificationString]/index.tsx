import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { POST } from '../../../helpers/'
import EmailSuccess from '../../../components/EmailSuccess'
import EmailFail from '../../../components/EmailFail'
import LeafLoader from '../../../components/LeafLoader'
import { useStyles } from '../../../constants/materialStyles'
const EmailLandingPage = () => {
  const { asPath } = useRouter()
  const verificationString = asPath.split('/')[2]
  const [isLoading, setIsLoading] = useState(true)
  const classes = useStyles()
  const [isSuccess, setIsSuccess] = useState(false)
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
        setIsSuccess(true)
        setIsLoading(false)
      } catch (err) {
        setIsSuccess(false)
        setIsLoading(false)
      }
    }
    loadVerification()
  }, [verificationString])
  if (isLoading)
    return (
      <div className={classes.root}>
        <LeafLoader />
      </div>
    )
  if (!isSuccess) return <EmailFail />
  return <EmailSuccess />
}
export default EmailLandingPage
