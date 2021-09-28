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
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
        }}
      >
        <span>
          {userLoggedIn
            ? "you're logged in, here's your private information"
            : "you're not logged in, so you don't get to see privleged information"}
        </span>
      </div>
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
