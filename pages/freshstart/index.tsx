import type { GetServerSideProps, GetServerSidePropsContext } from 'next'
import { JwtPayload, verify } from 'jsonwebtoken'

import { HeadTags, FreshStartApplyTag } from '../../components'
import { AdaptiveFlexContainer } from '../../ui'
import { siteTitle } from '../../constants'
import { useLanguage } from '../../hooks'

export interface FreshStartLandingPageProps {
  isLoggedIn: boolean
  hasAppliedForExpungement: boolean
  isVerified: boolean
}

const FreshStartLandingPage = ({
  isLoggedIn,
  hasAppliedForExpungement,
  isVerified,
}: FreshStartLandingPageProps) => {
  const { language } = useLanguage()

  return (
    <>
      <HeadTags
        title={`${siteTitle} | Fresh Start Information`}
        href={`/freshstart`}
        description={`Thrive SBC | Fresh Start Information`}
      />
      <AdaptiveFlexContainer>
        <FreshStartApplyTag
          isLoggedIn={isLoggedIn}
          hasAppliedForExpungement={hasAppliedForExpungement}
          isVerified={isVerified}
        />
      </AdaptiveFlexContainer>
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
