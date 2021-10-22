import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { useToken } from '../../../hooks'
import { POST } from '../../../helpers/'
import { EmailSuccess, EmailFail } from '../../../components'

const EmailLandingPage = () => {
  const { asPath } = useRouter()
  const verificationString = asPath.split('/')[2]

  const [isLoading, setIsLoading] = useState(true)

  const [isSuccess, setIsSuccess] = useState(false)
  const [, setToken] = useToken()
  useEffect(() => {
    const loadVerification = async () => {
      try {
        const postUserToPostgres: Response = await fetch(
          '/api/postVerifyEmail',
          {
            method: POST,

            body: verificationString,
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
  }, [setToken, verificationString])

  if (isLoading) return <p>Loading...</p>
  if (!isSuccess) return <EmailFail />

  return <EmailSuccess />
}

export default EmailLandingPage
