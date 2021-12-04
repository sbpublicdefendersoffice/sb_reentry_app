import { GetServerSideProps, GetServerSidePropsContext } from 'next'
import { ReactNode, CSSProperties } from 'react'
import { useRouter } from 'next/router'
import { JwtPayload, verify } from 'jsonwebtoken'

import { HeadTags } from '../../components'
import { CallToAction, Title, Button } from '../../ui'
import { siteTitle } from '../../constants'
import { CopyHolder } from '../../types'
import { useLanguage } from '../../hooks'

interface FreshStartLandingPageProps {
  isLoggedIn: boolean
  hasAppliedForExpungement: boolean
  isVerified: boolean
}

const copy: CopyHolder = {
  english: {
    notLoggedIn: 'You are not logged in',
    notVerified: 'You have not verified your email address with ThriveSBC',
    verifiedNotApplied:
      'You have been verified but have not applied for expungement',
    applied: 'You have applied for expungement',
  },
  spanish: {
    notLoggedIn: 'Usted no se ha identificado',
    notVerified:
      'No ha verificado su dirección de correo electrónico con ThriveSBC',
    verifiedNotApplied:
      'Ha sido verificado, pero no ha solicitado la eliminación.',
    applied: 'Ha solicitado la eliminación de antecedentes penales',
  },
}

const buttonStyle: CSSProperties = {
  height: 'min-content',
  marginTop: 'var(--pad-std)',
}

const FreshStartLandingPage = ({
  isLoggedIn,
  hasAppliedForExpungement,
  isVerified,
}: FreshStartLandingPageProps) => {
  const { push } = useRouter()
  const { language } = useLanguage()

  const { notLoggedIn, notVerified, verifiedNotApplied, applied } =
    copy[language]

  const logOut = async (): Promise<void> => {
    const loggingOut: Response = await fetch('/api/logout')
    const logoutMessage = await loggingOut.json()
    if (logoutMessage.error) console.log('oh no!')
    else {
      console.log('oh yeah')
      push('/login')
    }
  }

  const logOutButton: ReactNode = (
    <Button style={buttonStyle} onClick={logOut}>
      Logout
    </Button>
  )

  return (
    <>
      <HeadTags
        title={`${siteTitle} | Fresh Start Information`}
        href={`/freshstart`}
        description={`Thrive SBC | Fresh Start Information`}
      />
      <CallToAction>
        {!isLoggedIn ? (
          <Title>{notLoggedIn}</Title>
        ) : !isVerified ? (
          <>
            <Title>{notVerified}</Title>
            {logOutButton}
          </>
        ) : isVerified && hasAppliedForExpungement ? (
          <>
            <Title>{applied}</Title>
            {logOutButton}
          </>
        ) : (
          <>
            <Title>{verifiedNotApplied}</Title>
            <Button
              style={buttonStyle}
              onClick={() => push('/freshstart/apply')}
            >
              Apply for Expungement
            </Button>
            {logOutButton}
          </>
        )}
      </CallToAction>
    </>
  )
}

export default FreshStartLandingPage

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

    if (headers['Auth-Token']) {
      const temp = verify(headers['Auth-Token'], process.env.JWT_SIGNATURE)
      const { exp } = temp as JwtPayload
      const expiresAt = exp * 1000
      if (expiresAt > Date.now()) token = temp
    }
  }

  return {
    props: {
      isLoggedIn: !!token,
      hasAppliedForExpungement: !!token?.hasAppliedForExpungement,
      isVerified: !!token?.isVerified,
    },
  }
}
