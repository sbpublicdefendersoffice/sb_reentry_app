import { useEffect } from 'react'

import { HeadTags } from '../../components'
import { siteTitle } from '../../constants'
import { Button } from '../../ui'

const LoginPage = () => {
  useEffect(() => {
    const getCookie = async (): Promise<Response> => await fetch('/api/jwt')

    getCookie()
  }, [])

  const checkHeader = async (): Promise<Response> => await fetch('/api/testJwt')

  return (
    <>
      <HeadTags
        title={`${siteTitle} | Login`}
        href={`/login`}
        description={`Login`}
      />
      <span>check the application tab</span>
      <div>
        <Button onClick={checkHeader}>Check Header</Button>
      </div>
    </>
  )
}

export default LoginPage
