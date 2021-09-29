import { GetServerSideProps } from 'next'
import { useRouter } from 'next/router'

import { HeadTags } from '../../components'
import { siteTitle, isDev } from '../../constants'
import { Button } from '../../ui'

const LoginPage = () => {
  const { push } = useRouter()

  const getCookie = async (): Promise<void> => {
    await fetch('/api/jwt', { credentials: 'include' })
    push('/login/verify')
  }

  return (
    <>
      <HeadTags
        title={`${siteTitle} | Login`}
        href={`/login`}
        description={`Login`}
      />
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
        }}
      >
        <Button onClick={getCookie}>Log In To Thrive</Button>
      </div>
    </>
  )
}

export default LoginPage

export const getServerSideProps: GetServerSideProps = async () => {
  // login is still under development, so we don't want people accessing it in production
  if (!isDev)
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    }

  return {
    props: {},
  }
}
