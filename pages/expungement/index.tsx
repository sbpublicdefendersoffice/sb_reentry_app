import { GetServerSideProps } from 'next'
import { useState } from 'react'

import { HeadTags, ExpungementForm } from '../../components'
import { siteTitle, isDev } from '../../constants'

const ExpungementPage = () => {
  const [hasClientApplied, setHasClientApplied] = useState<boolean>(false)

  return (
    <>
      <HeadTags
        title={`${siteTitle} | Record Expungement`}
        href={`/expungement`}
        description={`Thrive SBC Record Expungement`}
      />
      {hasClientApplied ? (
        <span>You have applied</span>
      ) : (
        <ExpungementForm setHasClientApplied={setHasClientApplied} />
      )}
    </>
  )
}

export default ExpungementPage

export const getServerSideProps: GetServerSideProps = async () => {
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
