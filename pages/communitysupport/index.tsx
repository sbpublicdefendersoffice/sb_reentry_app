import Head from 'next/head'

import { RecordPane } from '../../components'

const communitySupport: string = 'Community Support'

const CommunitySupport = () => (
  <>
    <Head>
      <title>{`Santa Barbara Reentry | ${communitySupport}`}</title>
    </Head>
    <RecordPane category={communitySupport} landingPage />
  </>
)

export default CommunitySupport
