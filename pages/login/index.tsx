import { useRouter } from 'next/router'

import { HeadTags } from '../../components'
import { siteTitle } from '../../constants'
import { Button } from '../../ui'

const LoginPage = () => {
  const { push } = useRouter()

  const getCookie = async (): Promise<void> => {
    await fetch('/api/jwt')
    push('/testlogin')
  }

  return (
    <>
      <HeadTags
        title={`${siteTitle} | Login`}
        href={`/login`}
        description={`Login`}
      />
      <div>
        <Button onClick={getCookie}>Log In To Thrive</Button>
      </div>
    </>
  )
}

export default LoginPage
