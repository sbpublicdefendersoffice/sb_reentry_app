import { GetServerSideProps, GetServerSidePropsContext } from 'next'
import { useState } from 'react'
import { JwtPayload, verify } from 'jsonwebtoken'

import { HeadTags, ExpungementForm } from '../../components'
import { CallToAction, Title } from '../../ui'
import { siteTitle } from '../../constants'
import { CopyHolder } from '../../types'
import { useLanguage } from '../../hooks'

interface ExpungementPageProps {
  id: number
  hasAppliedForExpungement: boolean
}

const copy: CopyHolder = {
  english: {
    applied: 'You have successfully applied for record expungement',
  },
  spanish: {
    applied: 'Ha solicitado con éxito la eliminación de antecedentes penales',
  },
}

const ExpungementPage = ({
  id,
  hasAppliedForExpungement,
}: ExpungementPageProps) => {
  const [hasClientApplied, setHasClientApplied] = useState<boolean>(
    hasAppliedForExpungement,
  )
  const { language } = useLanguage()

  const { applied } = copy[language]

  return (
    <>
      <HeadTags
        title={`${siteTitle} | Record Expungement`}
        href={`/expungement`}
        description={`Thrive SBC Record Expungement`}
      />
      {hasClientApplied ? (
        <CallToAction>
          <Title>{applied}</Title>
        </CallToAction>
      ) : (
        <ExpungementForm
          clientId={id}
          setHasClientApplied={setHasClientApplied}
        />
      )}
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
      if (expiresAt > Date.now())
        token = verify(headers['Auth-Token'], process.env.JWT_SIGNATURE)
    }
  }

  if (!token)
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    }
  else {
    const { id, hasAppliedForExpungement } = token
    return {
      props: { id, hasAppliedForExpungement },
    }
  }
}
