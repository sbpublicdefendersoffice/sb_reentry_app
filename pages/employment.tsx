/* eslint-disable react/display-name */
import { useRouter } from 'next/router'
import Head from 'next/head'

import Button from '../ui/Button'

export default () => {
  const { pathname, back } = useRouter()
  const topic: string = pathname.slice(1)

  return (
    <>
      <Head>
        <title>{topic}</title>
      </Head>
      <span>Important information about {topic}</span>
      <Button block onClick={() => back()}>
        Button
      </Button>
    </>
  )
}
