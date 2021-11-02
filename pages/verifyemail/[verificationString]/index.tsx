import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { useLanguage } from '../../../hooks'
import { POST } from '../../../helpers/'
import { EmailSuccess, EmailFail } from '../../../components'
import { LeafLoader } from '../../../components'
import { useStyles, ENGLISH } from '../../../constants'
const EmailLandingPage = () => {
  const { asPath } = useRouter()
  const verificationString = asPath.split('/')[2]
  const { language } = useLanguage()
  const [isLoading, setIsLoading] = useState(true)
  const classes = useStyles()
  const [isSuccess, setIsSuccess] = useState(false)

  useEffect(() => {
    const loadVerification = async () => {
      try {
        const postUserToPostgres: Response = await fetch(
          '/api/postVerifyEmail',
          {
            method: POST,
            body: JSON.stringify(verificationString),
          },
        )

        const apiResponse = await postUserToPostgres.json()

        const { token } = apiResponse

        //@ts-ignore
        // setToken(token)
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
