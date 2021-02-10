import Head from 'next/head'

import { RecordPane } from '../../components'

const socialServices: string = 'Social Services'

const SocialServices = () => (
  <>
    <Head>
      <title>{`Santa Barbara Reentry | ${socialServices}`}</title>
    </Head>
    <RecordPane category={socialServices} />
  </>
)

export default SocialServices
