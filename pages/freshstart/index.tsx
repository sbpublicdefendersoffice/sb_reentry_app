import { GetServerSideProps, GetServerSidePropsContext } from 'next'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { JwtPayload, verify } from 'jsonwebtoken'

import { HeadTags, ExpungementForm } from '../../components'
import { CallToAction, Title, Button } from '../../ui'
import { siteTitle } from '../../constants'
import { CopyHolder } from '../../types'
import { useLanguage } from '../../hooks'

interface ExpungementPageProps {
  id: number
  hasAppliedForExpungement: boolean
  isVerified: boolean
}

const copy: CopyHolder = {
  english: {
    applied: 'You have successfully applied for record expungement',
    notVerified: 'You have not yet been verified',
  },
  spanish: {
    applied: 'Ha solicitado con éxito la eliminación de antecedentes penales',
    notVerified: 'Aún no has sido verificado',
  },
}

const ExpungementPage = ({
  id,
  hasAppliedForExpungement,
  isVerified,
}: ExpungementPageProps) => {
  const { push } = useRouter()
  const [hasClientApplied, setHasClientApplied] = useState<boolean>(
    hasAppliedForExpungement,
  )
  const { language } = useLanguage()

  const { applied, notVerified } = copy[language]

  const logOut = async (): Promise<void> => {
    const loggingOut: Response = await fetch('/api/logout')
    const logoutMessage = await loggingOut.json()
    if (logoutMessage.error) console.log('oh no!')
    else {
      console.log('oh yeah')
      push('/')
    }
  }

  return (
    <>
      <HeadTags
        title={`${siteTitle} | Fresh Start Record Expungement`}
        href={`/freshstart`}
        description={`Thrive SBC | Fresh Start Record Expungement`}
      />
      {!isVerified ? (
        <CallToAction>
          <Title>{notVerified}</Title>
        </CallToAction>
      ) : hasClientApplied ? (
        <CallToAction>
          <Title>{applied}</Title>
        </CallToAction>
      ) : (
        <ExpungementForm
          clientId={id}
          setHasClientApplied={setHasClientApplied}
        />
      )}
      <Button style={{ height: 'min-content' }} onClick={logOut}>
        Logout
      </Button>
    </>
  )
}

export default ExpungementPage

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

  if (!token || token?.type !== 'client')
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    }
  else {
    const { id, hasAppliedForExpungement, isVerified } = token
    return {
      props: { id, hasAppliedForExpungement, isVerified },
    }
  }
}
