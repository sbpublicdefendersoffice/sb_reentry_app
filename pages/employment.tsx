/* eslint-disable react/display-name */
import { ReactElement } from 'react'
import { useRouter } from 'next/router'
import Head from 'next/head'

export default (): ReactElement => {
  const { pathname } = useRouter()
  const topic: string = pathname.slice(1)

  return (
    <>
      <Head>
        <title>{topic}</title>
      </Head>
      <span>Important information about {topic}</span>
    </>
  )
}
