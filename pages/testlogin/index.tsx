import { GetServerSideProps, GetServerSidePropsContext } from 'next'
import { verify } from 'jsonwebtoken'

import { HeadTags } from '../../components'
import { siteTitle } from '../../constants'

const secret: string = 'Super Secret, Secret Squirrel!'

interface TestLoginPageProps {
  userLoggedIn: boolean
}

const TestLoginPage = ({ userLoggedIn }: TestLoginPageProps) => {
  return (
    <>
      <HeadTags
        title={`${siteTitle} | Login Test`}
        href={`/testlogin`}
        description={`Login Test`}
      />
      <span>
        {userLoggedIn
          ? "you're logged in, good on ya"
          : "you're not even logged in my friend"}
      </span>
    </>
  )
}

export default TestLoginPage

export const getServerSideProps: GetServerSideProps = async (
  ctx: GetServerSidePropsContext,
) => {
  let token: any

  if (ctx.req.headers.cookie) {
    const headers: { [name: string]: string } = ctx.req.headers.cookie
      .split(';')
      .reduce((obj, str) => {
        const split: string[] = str.split('=')
        obj[split[0].trim()] = split[1].trim()

        return obj
      }, {})

    token = verify(headers['Auth-Token'], secret)
  }

  return {
    props: token === undefined ? {} : { userLoggedIn: token?.userLoggedIn },
  }
}
