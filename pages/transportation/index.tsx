import Head from 'next/head'

import { RecordPane } from '../../components'

const transportation: string = 'Transportation'

const Transportation = () => (
  <>
    <Head>
      <title>{`Santa Barbara Reentry | ${transportation}`}</title>
    </Head>
    <RecordPane category={transportation} landingPage />
  </>
)

export default Transportation
